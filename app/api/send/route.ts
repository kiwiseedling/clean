import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, message } = body;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New submission from ${name}`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "We received your request",
      html: `
        <h2>Thanks ${name}!</h2>
        <p>We received your submission and will get back to you shortly.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}