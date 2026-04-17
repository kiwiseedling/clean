import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
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
    console.error(err);
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "setup" && session.customer) {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["setup_intent", "customer"],
      });

      const setupIntent = fullSession.setup_intent as Stripe.SetupIntent;

      const customerId =
        typeof fullSession.customer === "string"
          ? fullSession.customer
          : fullSession.customer?.id;

      const paymentMethodId =
        typeof setupIntent.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent.payment_method?.id;

      const customerEmail = fullSession.metadata?.customer_email;

      if (customerId && paymentMethodId && customerEmail) {
        await supabase
          .from("orders")
          .update({
            stripe_customer_id: customerId,
            stripe_payment_method_id: paymentMethodId,
            status: "card_saved",
          })
          .eq("email", customerEmail)
          .eq("status", "pending");

        const customer = fullSession.customer as Stripe.Customer;
        const meta = fullSession.metadata ?? {};
        const customerName = customer.name || "";

        await resend.emails.send({
          from: process.env.FROM_EMAIL!,
          to: customerEmail,
          subject: "Booking Confirmed — JunkDrive",
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#0a1f14">
              <h2 style="color:#22764a">Booking Confirmed</h2>
              <p>Hi ${customerName},</p>
              <p>Your booking is confirmed and your card has been securely saved. <strong>You will not be charged until the job is complete.</strong></p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px">
                ${meta.load ? `<tr><td style="padding:6px 0;color:#666">Load size</td><td style="padding:6px 0;font-weight:600">${meta.load}</td></tr>` : ""}
                ${meta.schedule ? `<tr><td style="padding:6px 0;color:#666">Schedule</td><td style="padding:6px 0;font-weight:600">${meta.schedule} · ${meta.time || ""}</td></tr>` : ""}
                ${meta.property ? `<tr><td style="padding:6px 0;color:#666">Property type</td><td style="padding:6px 0;font-weight:600">${meta.property}</td></tr>` : ""}
                ${meta.price ? `<tr><td style="padding:6px 0;color:#666">Quoted price</td><td style="padding:6px 0;font-weight:600">$${meta.price}</td></tr>` : ""}
              </table>
              <p style="font-size:13px;color:#555">We'll be in touch shortly to confirm your arrival window. Questions? Call or text us at <a href="tel:+17132822588" style="color:#22764a">(713) 282-2588</a>.</p>
              <p style="font-size:12px;color:#999;margin-top:32px">JunkDrive · Bay Area Junk Removal</p>
            </div>
          `,
        });
      }
    }
  }

  return new Response("ok");
}