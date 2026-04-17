import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, service, load, schedule, time, property, stairs, distance, price } = body;

    if (!email) {
      return Response.json({ error: "Missing email" }, { status: 400 });
    }

    // ── 1. Create Stripe customer ───────────────────────────────────────────
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      metadata: { address: address || "" },
    });

    // ── 2. Insert booking row and get back the ID ───────────────────────────
    const { data: booking, error: dbError } = await supabaseAdmin
      .from("bookings")
      .insert([{
        name,
        email,
        phone,
        address,
        service: service || "bulk_waste",
        status: "pending",
        payment_status: "unpaid",
        quoted_price: price ? parseFloat(price) : null,
        load,
        schedule,
        time,
        property,
        stairs: stairs === "true",
        distance,
        stripe_customer_id: customer.id,
      }])
      .select()
      .single();

    if (dbError || !booking) {
      console.error("[create-session] supabase insert failed:", dbError);
      return Response.json({ error: "Failed to save booking", detail: dbError?.message ?? "no data returned" }, { status: 500 });
    }

    // ── 3. Create Stripe Checkout setup session with booking ID ────────────
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customer.id,
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking`,
      metadata: {
        booking_id: String(booking.id),
        customer_email: email,
        load: load || "",
        schedule: schedule || "",
        time: time || "",
        property: property || "",
        stairs: stairs || "",
        distance: distance || "",
        price: price || "",
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[create-session] error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
