import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, service, load, schedule, time, property, stairs, distance, price } = body;

    if (!email) {
      return Response.json({ error: "Missing email" }, { status: 400 });
    }

    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      metadata: {
        address: address || "",
        service: service || "",
      },
    });

    await supabase.from("orders").insert([
      {
        name,
        email,
        phone,
        address,
        service: "bulk",
        status: "pending",
        quoted_price: price ? parseFloat(price) : null,
        load,
        schedule,
        time,
        property,
        stairs: stairs === "true",
        distance,
        stripe_customer_id: customer.id,
      },
    ]);

    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customer.id,
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking`,
      metadata: {
        customer_email: email,
        service: service || "",
        load: load || "",
        schedule: schedule || "",
        time: time || "",
        property: property || "",
        stairs: stairs || "",
        distance: distance || "",
        price: price || "",
      },
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create setup session" },
      { status: 500 }
    );
  }
}