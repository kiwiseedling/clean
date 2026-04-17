import { stripe } from "@/lib/stripe";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import Stripe from "stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing webhook signature or secret", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "setup" && session.customer) {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["setup_intent", "customer"],
      });

      const customer = fullSession.customer as Stripe.Customer;
      const setupIntent = fullSession.setup_intent as Stripe.SetupIntent;
      const meta = fullSession.metadata ?? {};

      const customerId = customer.id;
      const customerEmail = meta.customer_email || customer.email || "";
      const customerName = customer.name || "";
      const customerPhone = customer.phone || "";
      const customerAddress = customer.metadata?.address || "";

      const paymentMethodId =
        typeof setupIntent.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent.payment_method?.id;

      const bookingId = meta.booking_id;

      if (!customerId || !paymentMethodId || !customerEmail) {
        console.error("[webhook] missing required fields", { customerId, paymentMethodId, customerEmail });
        return new Response("ok");
      }

      // ── 1. Update Supabase bookings row by ID ──────────────────────────────
      const { error: dbError } = await supabase
        .from("bookings")
        .update({
          stripe_customer_id: customerId,
          stripe_payment_method_id: paymentMethodId,
          payment_status: "card_saved",
        })
        .eq("id", bookingId);

      if (dbError) {
        console.error("[webhook] supabase update failed:", dbError);
      } else {
        console.log("[webhook] supabase booking updated, id:", bookingId);
      }

      // ── 2. Build shared booking details table ──────────────────────────────
      const detailRows = [
        meta.load     && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Load size</td><td style="padding:5px 0;font-weight:600">${meta.load}</td></tr>`,
        meta.schedule && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Schedule</td><td style="padding:5px 0;font-weight:600">${meta.schedule}${meta.time ? ` · ${meta.time}` : ""}</td></tr>`,
        meta.property && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Property</td><td style="padding:5px 0;font-weight:600">${meta.property}</td></tr>`,
        meta.stairs   && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Stairs</td><td style="padding:5px 0;font-weight:600">${meta.stairs}</td></tr>`,
        meta.distance && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Carry distance</td><td style="padding:5px 0;font-weight:600">${meta.distance}</td></tr>`,
        meta.price    && `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Quoted price</td><td style="padding:5px 0;font-weight:600;color:#22764a">$${meta.price}</td></tr>`,
      ].filter(Boolean).join("");

      // ── 3. Customer confirmation email ─────────────────────────────────────
      const { error: customerEmailError } = await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: customerEmail,
        subject: "Booking Confirmed — JunkDrive",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#0a1f14;padding:24px">
            <div style="margin-bottom:24px">
              <span style="background:#22764a;color:white;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px">Booking Confirmed</span>
            </div>
            <h1 style="font-size:24px;font-weight:900;margin:0 0 8px;letter-spacing:-0.02em">You're all set${customerName ? `, ${customerName.split(" ")[0]}` : ""}.</h1>
            <p style="color:#555;margin:0 0 24px">Your card is saved and your booking is in. We'll be in touch to confirm your arrival window.</p>

            <div style="background:#f4faf7;border:1px solid #d4e9dc;border-radius:12px;padding:16px 20px;margin-bottom:20px">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#22764a">Important</p>
              <p style="margin:0;font-size:14px;color:#0a1f14"><strong>Your card will not be charged until the job is complete.</strong> The amount confirmed at booking is the amount you'll pay — no surprises.</p>
            </div>

            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
              ${detailRows}
              ${customerAddress ? `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Address</td><td style="padding:5px 0;font-weight:600">${customerAddress}</td></tr>` : ""}
            </table>

            <p style="font-size:13px;color:#555;margin-bottom:32px">Questions? Call or text us at <a href="tel:+17132822588" style="color:#22764a;font-weight:600">(713) 282-2588</a> — we answer fast.</p>
            <p style="font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:16px;margin:0">JunkDrive · Bay Area Junk Removal</p>
          </div>
        `,
      });

      if (customerEmailError) {
        console.error("[webhook] customer email failed:", customerEmailError);
      } else {
        console.log("[webhook] customer email sent to", customerEmail);
      }

      // ── 4. Admin notification email ────────────────────────────────────────
      const adminEmail = process.env.ADMIN_EMAIL!;
      const { error: adminEmailError } = await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: adminEmail,
        subject: `New Booking — ${customerName || customerEmail}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#0a1f14;padding:24px">
            <div style="margin-bottom:16px">
              <span style="background:#0a1f14;color:#6abf8e;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px">New Booking</span>
            </div>
            <h1 style="font-size:22px;font-weight:900;margin:0 0 20px;letter-spacing:-0.02em">Card saved — ready to schedule.</h1>

            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
              <tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Name</td><td style="padding:5px 0;font-weight:600">${customerName || "—"}</td></tr>
              <tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Email</td><td style="padding:5px 0;font-weight:600"><a href="mailto:${customerEmail}" style="color:#22764a">${customerEmail}</a></td></tr>
              ${customerPhone ? `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Phone</td><td style="padding:5px 0;font-weight:600"><a href="tel:${customerPhone}" style="color:#22764a">${customerPhone}</a></td></tr>` : ""}
              ${customerAddress ? `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Address</td><td style="padding:5px 0;font-weight:600">${customerAddress}</td></tr>` : ""}
              <tr><td colspan="2" style="padding:8px 0 4px;border-top:1px solid #eee"></td></tr>
              ${detailRows}
              <tr><td colspan="2" style="padding:8px 0 4px;border-top:1px solid #eee"></td></tr>
              ${bookingId ? `<tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Booking ID</td><td style="padding:5px 0;font-family:monospace;font-size:12px">${bookingId}</td></tr>` : ""}
              <tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Stripe customer</td><td style="padding:5px 0;font-family:monospace;font-size:12px">${customerId}</td></tr>
              <tr><td style="padding:5px 12px 5px 0;color:#666;white-space:nowrap">Payment method</td><td style="padding:5px 0;font-family:monospace;font-size:12px">${paymentMethodId}</td></tr>
            </table>

            <p style="font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:16px;margin:0">JunkDrive admin alert</p>
          </div>
        `,
      });

      if (adminEmailError) {
        console.error("[webhook] admin email failed:", adminEmailError);
      } else {
        console.log("[webhook] admin email sent to", adminEmail);
      }
    }
  }

  return new Response("ok");
}
