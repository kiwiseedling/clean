import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey) {
      return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

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
      const {
        name,
        contact,
        email,
        address,
        load,
        schedule,
        time,
        property,
        stairs,
        livePrice,
      } = body;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Bulk Waste Booking from ${name}`,
        html: `
          <h2>New Bulk Waste Booking</h2>
          <p><strong>Name:</strong> ${name || "—"}</p>
          <p><strong>Phone:</strong> ${contact || "—"}</p>
          <p><strong>Email:</strong> ${email || "—"}</p>
          <hr />
          <p><strong>Address:</strong> ${address || "—"}</p>
          <p><strong>Load Size:</strong> ${load || "—"}</p>
          <p><strong>Date:</strong> ${schedule || "—"}</p>
          <p><strong>Time:</strong> ${time || "—"}</p>
          <p><strong>Property Type:</strong> ${property || "—"}</p>
          <p><strong>Stairs:</strong> ${stairs || "—"}</p>
          <p><strong>Quoted Price:</strong> ${livePrice || "—"}</p>
        `,
      });

      if (email) {
        const customerTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fa;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;">

        <tr>
          <td style="background-color:#0f172a;padding:16px 20px;color:#ffffff;font-size:18px;font-weight:bold;">
            BinButler
          </td>
        </tr>

        <tr>
          <td style="padding:24px 30px 10px 30px;">
            <h2 style="margin:0;color:#0f172a;font-size:20px;">Booking Confirmed</h2>
            <p style="margin:8px 0 0 0;color:#64748b;font-size:14px;">
              Thanks ${name || "there"}, we’ve received your request and will follow up shortly.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:15px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:8px;padding:16px;font-size:14px;color:#0f172a;">
              <tr>
                <td style="padding:6px 0;"><strong>Service:</strong> Bulk Waste Removal</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Date:</strong> ${schedule || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Time:</strong> ${time || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Address:</strong> ${address || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Load Size:</strong> ${load || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Property Type:</strong> ${property || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Stairs:</strong> ${stairs || "—"}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Estimated Price:</strong> ${livePrice || "—"}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:10px 30px 20px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:#e5e7eb;border-radius:20px;height:8px;">
                  <table width="33%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color:#22c55e;height:8px;border-radius:20px;"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 30px 25px 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;">
              <tr>
                <td align="left" style="color:#22c55e;font-weight:bold;">● Request received</td>
                <td align="center" style="color:#9ca3af;">● Scheduling</td>
                <td align="right" style="color:#9ca3af;">● Completed</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:10px 30px 30px 30px;">
            <a href="mailto:${fromEmail}"
               style="display:inline-block;background-color:#3b82f6;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px;font-weight:bold;">
              Contact Support
            </a>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f1f5f9;text-align:center;padding:14px;font-size:12px;color:#64748b;">
            © 2026 BinButler • Reliable Waste & Valet Services
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
        `;

        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "Booking Confirmed — BinButler",
          html: customerTemplate,
        });
      }

      return Response.json({ success: true });
    }

    // ── Trash valet request ───────────────────────────────────────────────────
    if (formType === "valet") {
      const {
        name,
        phone,
        email,
        propertyName,
        address,
        city,
        zip,
        propertyType,
        units,
        frequency,
        timeline,
        services,
        notes,
        userType,
      } = body;

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Trash Valet Request from ${name}`,
        html: `
          <h2>New Trash Valet Request</h2>
          <p><strong>Type:</strong> ${userType === "property" ? "Property Manager" : "Resident"}</p>
          <p><strong>Name:</strong> ${name || "—"}</p>
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
            <h2>Thanks, ${name || "there"}!</h2>
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

    // ── Newsletter signup ─────────────────────────────────────────────────────
    if (formType === "newsletter") {
      const { email } = body;
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New newsletter signup: ${email}`,
        html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
      });
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