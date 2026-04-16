import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

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
      }
    }
  }

  return new Response("ok");
}