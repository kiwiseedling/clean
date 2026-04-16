import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { formType } = body;

  try {
    if (formType === "booking") {
      const { name, contact, address, load, schedule, time, property, stairs, distance, livePrice } = body;

      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Bulk Pickup Request from ${name}`,
        html: `
          <h2>New Bulk Pickup Booking</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact:</strong> ${contact}</p>
          <p><strong>Address:</strong> ${address}</p>
          <hr />
          <p><strong>Load size:</strong> ${load}</p>
          <p><strong>Property type:</strong> ${property}</p>
          <p><strong>Stairs:</strong> ${stairs ? "Yes" : "No"}</p>
          <p><strong>Carry distance:</strong> ${distance}</p>
          <hr />
          <p><strong>Schedule:</strong> ${schedule}</p>
          <p><strong>Time window:</strong> ${time}</p>
          <p><strong>Estimated price:</strong> $${livePrice}</p>
        `,
      });

      // Send confirmation to user only if contact looks like an email
      if (contact && contact.includes("@")) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL!,
          to: contact,
          subject: "We received your pickup request — BinButler",
          html: `
            <h2>Thanks, ${name}!</h2>
            <p>We received your bulk pickup request and will confirm within a few hours.</p>
            <p><strong>Estimated price:</strong> $${livePrice}</p>
            <p><strong>Schedule:</strong> ${schedule} · ${time} window</p>
            <p><strong>Address:</strong> ${address}</p>
            <br />
            <p>Questions? Call or text us: <strong>(713) 282-2588</strong></p>
          `,
        });
      }
    }

    if (formType === "valet") {
      const { name, phone, email, propertyName, address, city, zip, propertyType, units, frequency, timeline, services, notes, userType } = body;

      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Trash Valet Request from ${name}`,
        html: `
          <h2>New Trash Valet Request</h2>
          <p><strong>Contact type:</strong> ${userType}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Property:</strong> ${propertyName}</p>
          <p><strong>Address:</strong> ${address}${city ? `, ${city}` : ""}${zip ? ` ${zip}` : ""}</p>
          <p><strong>Property type:</strong> ${propertyType || "—"}</p>
          <p><strong>Units:</strong> ${units || "—"}</p>
          <p><strong>Frequency:</strong> ${frequency || "—"}</p>
          <p><strong>Timeline:</strong> ${timeline || "—"}</p>
          <hr />
          <p><strong>Services requested:</strong> ${services?.join(", ") || "—"}</p>
          <p><strong>Notes:</strong> ${notes || "—"}</p>
        `,
      });

      if (email) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL!,
          to: email,
          subject: "We received your trash valet request — BinButler",
          html: `
            <h2>Thanks, ${name}!</h2>
            <p>We received your trash valet inquiry and will follow up within one business day.</p>
            <p><strong>Property:</strong> ${propertyName}</p>
            <p><strong>Services:</strong> ${services?.join(", ") || "—"}</p>
            <br />
            <p>Questions? Call or text us: <strong>(713) 282-2588</strong></p>
          `,
        });
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
