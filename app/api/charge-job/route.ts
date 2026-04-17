import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { bookingId, finalAmountCents } = await req.json();

    if (!bookingId || !finalAmountCents) {
      return Response.json({ error: "bookingId and finalAmountCents are required" }, { status: 400 });
    }

    // ── 1. Load booking from Supabase ───────────────────────────────────────
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (error || !booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    if (!booking.stripe_customer_id || !booking.stripe_payment_method_id) {
      return Response.json({ error: "No saved card on this booking" }, { status: 400 });
    }

    if (booking.payment_status === "paid") {
      return Response.json({ error: "Booking already charged" }, { status: 400 });
    }

    // ── 2. Charge the saved card ────────────────────────────────────────────
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmountCents,
      currency: "usd",
      customer: booking.stripe_customer_id,
      payment_method: booking.stripe_payment_method_id,
      off_session: true,
      confirm: true,
      metadata: { booking_id: String(bookingId) },
    });

    // ── 3. Mark booking as paid ─────────────────────────────────────────────
    await supabaseAdmin
      .from("bookings")
      .update({
        status: "completed",
        payment_status: "paid",
        final_amount_cents: finalAmountCents,
        stripe_payment_intent_id: paymentIntent.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    return Response.json({ success: true, paymentIntentId: paymentIntent.id, status: paymentIntent.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Charge failed";
    console.error("[charge-job] error:", error);
    return Response.json({ error: message }, { status: 500 });
  }
}
