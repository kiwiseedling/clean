import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);

  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!adminEmail || !fromEmail) {
      return Response.json(
        { error: "Missing ADMIN_EMAIL or FROM_EMAIL" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { formType } = body;

    // ── Bulk waste booking ────────────────────────────────────────────────────
    if (formType === "booking") {
      const { name, contact, email, address, load, schedule, time, property, stairs, livePrice } = body;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Bulk Pickup Request from ${name || email}`,
        html: `
          <h2>New Bulk Pickup Booking</h2>
          <p><strong>Name:</strong> ${name || "—"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact || "—"}</p>
          <p><strong>Address:</strong> ${address}</p>
          <hr />
          <p><strong>Load size:</strong> ${load}</p>
          <p><strong>Property type:</strong> ${property}</p>
          <p><strong>Stairs:</strong> ${stairs ? "Yes (+$25)" : "No"}</p>
          <hr />
          <p><strong>Schedule:</strong> ${schedule} · ${time} window</p>
          <p><strong>Estimated price:</strong> $${livePrice}</p>
        `,
      });

      if (email) {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "We received your pickup request — BinButler",
          html: `
            <h2>Thanks${name ? `, ${name}` : ""}!</h2>
            <p>We received your bulk pickup request and will confirm within a few hours.</p>
            <p><strong>Estimated price:</strong> $${livePrice}</p>
            <p><strong>Schedule:</strong> ${schedule} · ${time} window</p>
            <p><strong>Address:</strong> ${address}</p>
            <br />
            <p>Questions? Call or text us: <strong>(713) 282-2588</strong></p>
          `,
        });
      }

      return Response.json({ success: true });
    }

    // ── Trash valet request ───────────────────────────────────────────────────
    if (formType === "valet") {
      const { name, phone, email, propertyName, address, city, zip, propertyType, units, frequency, timeline, services, notes, userType } = body;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Trash Valet Request from ${name}`,
        html: `
          <h2>New Trash Valet Request</h2>
          <p><strong>Type:</strong> ${userType === "property" ? "Property Manager" : "Resident"}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone || "—"}</p>
          <p><strong>Email:</strong> ${email || "—"}</p>
          <hr />
          <p><strong>Property:</strong> ${propertyName || "—"}</p>
          <p><strong>Address:</strong> ${[address, city, zip].filter(Boolean).join(", ") || "—"}</p>
          <p><strong>Property type:</strong> ${propertyType || "—"}</p>
          <p><strong>Units:</strong> ${units || "—"}</p>
          <p><strong>Frequency:</strong> ${frequency || "—"}</p>
          <p><strong>Timeline:</strong> ${timeline || "—"}</p>
          <hr />
          <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(", ") : "—"}</p>
          <p><strong>Notes:</strong> ${notes || "—"}</p>
        `,
      });

      if (email) {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "We received your trash valet request — BinButler",
          html: `
            <h2>Thanks, ${name}!</h2>
            <p>We received your trash valet inquiry and will follow up within one business day.</p>
            <p><strong>Property:</strong> ${propertyName || "—"}</p>
            <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(", ") : "—"}</p>
            <br />
            <p>Questions? Call or text us: <strong>(713) 282-2588</strong></p>
          `,
        });
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: "Unknown formType" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
