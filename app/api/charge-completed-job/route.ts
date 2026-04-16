import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, paymentMethodId, amount, orderId } = body;

    if (!customerId || !paymentMethodId || !amount) {
      return Response.json(
        { error: "Missing customerId, paymentMethodId, or amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: {
        orderId: orderId || "",
      },
    });

    return Response.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        error: error?.message || "Charge failed",
      },
      { status: 500 }
    );
  }
}