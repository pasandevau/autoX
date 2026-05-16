/* ─────────────────────────────────────────────────────────────────────────────
   Shared styles / primitives
───────────────────────────────────────────────────────────────────────────── */
const BRAND   = "#FFB300";
const DARK    = "#1A1A2E";
const ORANGE  = "#FF8C00";

function base(body: string): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AutoXpert Group</title>
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    :root { color-scheme: light only; }
    body { color-scheme: light only; }
  </style>
</head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1A2E;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F4F4F4;">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="max-width:600px;width:100%;">
        ${body}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function header(): string {
  return /* html */ `
  <!-- Header -->
  <tr><td style="background:${DARK};border-radius:16px 16px 0 0;padding:28px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td>
          <img src="https://autoxpertgroup.org/logo.png" alt="AutoXpert Group" width="48" height="48"
            style="border-radius:12px;display:block;" />
        </td>
        <td align="right" valign="middle">
          <span style="background:rgba(255,179,0,0.15);border:1px solid rgba(255,179,0,0.3);color:${BRAND};font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">
            &#x25CF; Live Booking
          </span>
        </td>
      </tr>
    </table>
  </td></tr>
  <!-- Amber accent bar -->
  <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND},${ORANGE});"></td></tr>`;
}

function footer(): string {
  return /* html */ `
  <!-- Footer -->
  <tr><td style="background:${DARK};border-radius:0 0 16px 16px;padding:28px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#FFFFFF;">Adelaide's Most Trusted Mobile Mechanic</p>
          <p style="margin:0 0 16px;font-size:12px;color:rgba(255,255,255,0.45);line-height:1.6;">
            📞 <a href="tel:1300096616" style="color:${BRAND};text-decoration:none;font-weight:700;">1300 09 66 16</a> &nbsp;·&nbsp;
            ✉️ <a href="mailto:admin@autoxpertgroup.org" style="color:${BRAND};text-decoration:none;">admin@autoxpertgroup.org</a><br />
            📍 Servicing all of Greater Adelaide &amp; Surrounds
          </p>
          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;">
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">
              © ${new Date().getFullYear()} AutoXpert Group Pty Ltd. All rights reserved.<br />
              <a href="https://autoxpertgroup.org" style="color:rgba(255,255,255,0.35);text-decoration:none;">autoxpertgroup.org</a>
            </p>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>`;
}

function detailRow(icon: string, label: string, value: string): string {
  return /* html */ `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(26,26,46,0.06);">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="36" style="font-size:18px;vertical-align:middle;">${icon}</td>
          <td style="vertical-align:middle;">
            <span style="font-size:11px;font-weight:700;color:#6B6B8A;text-transform:uppercase;letter-spacing:0.8px;">${label}</span><br />
            <span style="font-size:14px;font-weight:700;color:#1A1A2E;">${value}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Customer confirmation email
───────────────────────────────────────────────────────────────────────────── */
export interface BookingEmailData {
  customerName:  string;
  email:         string;
  phone:         string;
  service:       string;
  date:          string;   // formatted long, e.g. "Monday, 19 May 2026"
  timeSlot:      string;   // e.g. "9:00 – 10:00 AM"
  suburb:        string;
  vehicle?:      string;
  notes?:        string;
  eventLink?:    string;
}

export function customerConfirmationEmail(d: BookingEmailData): string {
  return base(/* html */ `
    ${header()}

    <!-- Hero -->
    <tr><td style="background:#FFFFFF;padding:36px 36px 24px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:48px;margin-bottom:12px;">✅</div>
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:${DARK};letter-spacing:-0.5px;">
          You're Booked In!
        </h1>
        <p style="margin:0;font-size:15px;color:rgba(26,26,46,0.55);font-weight:500;line-height:1.5;">
          Hi ${d.customerName}, your AutoXpert appointment is confirmed.<br />
          We'll call you beforehand to confirm the exact arrival time.
        </p>
      </div>

      <!-- Booking Summary Card -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:linear-gradient(135deg,#FFF9E6,#FFFDF5);border:2px solid rgba(255,179,0,0.25);border-radius:14px;padding:20px 24px;margin-bottom:24px;">
        <tr><td>
          <p style="margin:0 0 14px;font-size:11px;font-weight:800;color:${ORANGE};text-transform:uppercase;letter-spacing:1.5px;">
            📋 Booking Summary
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${detailRow("📅", "Date",    d.date)}
            ${detailRow("⏰", "Time",    d.timeSlot)}
            ${detailRow("🔧", "Service", d.service)}
            ${d.vehicle ? detailRow("🚗", "Vehicle", d.vehicle) : ""}
            ${detailRow("📍", "Location", `${d.suburb}, Adelaide SA`)}
            ${detailRow("📞", "Contact",  d.phone)}
          </table>
          ${d.notes ? `<p style="margin:14px 0 0;padding:12px;background:rgba(255,179,0,0.1);border-radius:8px;font-size:13px;color:rgba(26,26,46,0.6);font-style:italic;">"${d.notes}"</p>` : ""}
        </td></tr>
      </table>

      <!-- What to expect -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#F8F8F8;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <tr><td>
          <p style="margin:0 0 14px;font-size:13px;font-weight:800;color:${DARK};">What happens next?</p>
          ${["We'll call you the day before to confirm your exact arrival window.",
             "Our mechanic arrives at your location — no need to go anywhere.",
             "We carry out the service and walk you through everything we did.",
             "Fixed price — you'll only pay what was quoted. No surprises."]
            .map((s, i) => /* html */ `
            <table cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:10px;">
              <tr>
                <td width="28" valign="top">
                  <div style="width:22px;height:22px;background:${BRAND};border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:800;color:${DARK};">${i + 1}</div>
                </td>
                <td style="padding-left:10px;font-size:13px;color:rgba(26,26,46,0.65);font-weight:500;line-height:1.5;">${s}</td>
              </tr>
            </table>`).join("")}
        </td></tr>
      </table>

      <!-- CTA buttons -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px;">
        <tr>
          <td align="center">
            <a href="tel:1300096616"
              style="display:inline-block;background:linear-gradient(135deg,${BRAND},${ORANGE});color:${DARK};font-size:15px;font-weight:800;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.2px;">
              📞 &nbsp; Call Us: 1300 09 66 16
            </a>
          </td>
        </tr>
        ${d.eventLink ? /* html */ `
        <tr><td align="center" style="padding-top:12px;">
          <a href="${d.eventLink}" style="font-size:13px;color:${ORANGE};font-weight:700;text-decoration:none;">
            📆 Add to Your Calendar →
          </a>
        </td></tr>` : ""}
      </table>

      <p style="text-align:center;font-size:12px;color:rgba(26,26,46,0.35);margin:20px 0 0;">
        Need to reschedule? Call us on <a href="tel:1300096616" style="color:${ORANGE};font-weight:700;text-decoration:none;">1300 09 66 16</a> or reply to this email.
      </p>
    </td></tr>

    ${footer()}
  `);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Internal staff notification email
───────────────────────────────────────────────────────────────────────────── */
export function internalBookingAlert(d: BookingEmailData): string {
  return base(/* html */ `
    ${header()}

    <tr><td style="background:#FFFFFF;padding:28px 36px;">
      <h2 style="margin:0 0 4px;font-size:20px;font-weight:800;color:${DARK};">🔔 New Booking Received</h2>
      <p style="margin:0 0 24px;font-size:13px;color:rgba(26,26,46,0.5);">
        A customer has completed a booking via the website.
      </p>

      <!-- Alert card -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:${DARK};border-radius:12px;padding:20px 24px;margin-bottom:20px;">
        <tr><td>
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;">APPOINTMENT</p>
          <p style="margin:0;font-size:22px;font-weight:800;color:${BRAND};">${d.date}</p>
          <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#FFFFFF;">${d.timeSlot}</p>
        </td></tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#F8F8F8;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
        <tr><td>
          <p style="margin:0 0 14px;font-size:12px;font-weight:800;color:rgba(26,26,46,0.45);text-transform:uppercase;letter-spacing:1px;">Customer Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${detailRow("👤", "Name",    d.customerName)}
            ${detailRow("📞", "Phone",   `<a href="tel:${d.phone.replace(/\s/g,"")}" style="color:${ORANGE};text-decoration:none;">${d.phone}</a>`)}
            ${d.email ? detailRow("📧", "Email", `<a href="mailto:${d.email}" style="color:${ORANGE};text-decoration:none;">${d.email}</a>`) : ""}
            ${detailRow("🔧", "Service", d.service)}
            ${d.vehicle ? detailRow("🚗", "Vehicle", d.vehicle) : ""}
            ${detailRow("📍", "Suburb",  `${d.suburb}, Adelaide SA`)}
            ${d.notes ? detailRow("📝", "Notes", d.notes) : ""}
          </table>
        </td></tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="48%" style="padding-right:6px;">
            <a href="tel:${d.phone.replace(/\s/g,"")}"
              style="display:block;text-align:center;background:linear-gradient(135deg,${BRAND},${ORANGE});color:${DARK};font-size:14px;font-weight:800;padding:13px 20px;border-radius:10px;text-decoration:none;">
              📞 Call Customer
            </a>
          </td>
          ${d.eventLink ? /* html */ `
          <td width="48%" style="padding-left:6px;">
            <a href="${d.eventLink}"
              style="display:block;text-align:center;background:${DARK};color:#FFFFFF;font-size:14px;font-weight:800;padding:13px 20px;border-radius:10px;text-decoration:none;">
              📆 View in Calendar
            </a>
          </td>` : ""}
        </tr>
      </table>
    </td></tr>

    ${footer()}
  `);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Callback request alert (from hero form)
───────────────────────────────────────────────────────────────────────────── */
export function callbackAlertEmail(d: {
  name: string; phone: string; service?: string; suburb?: string;
}): string {
  return base(/* html */ `
    ${header()}
    <tr><td style="background:#FFFFFF;padding:28px 36px;">
      <h2 style="margin:0 0 4px;font-size:20px;font-weight:800;color:#1A1A2E;">&#128222; Callback Requested</h2>
      <p style="margin:0 0 24px;font-size:13px;color:rgba(26,26,46,0.5);">
        A visitor on the website has requested a callback.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#1A1A2E;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
        <tr><td>
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;">CALL BACK ASAP</p>
          <p style="margin:0;font-size:26px;font-weight:800;color:#FFB300;">${d.phone}</p>
          <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#FFFFFF;">${d.name}</p>
        </td></tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#F8F8F8;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
        <tr><td>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${detailRow("&#128295;", "Service", d.service ?? "Not specified")}
            ${d.suburb ? detailRow("&#128205;", "Suburb", `${d.suburb}, Adelaide SA`) : ""}
          </table>
        </td></tr>
      </table>
      <a href="tel:${d.phone.replace(/\s/g, "")}"
        style="display:block;text-align:center;background:linear-gradient(135deg,#FFB300,#FF8C00);color:#1A1A2E;font-size:15px;font-weight:800;padding:14px 20px;border-radius:10px;text-decoration:none;">
        &#128222; Call ${d.name} Now
      </a>
    </td></tr>
    ${footer()}
  `);
}

/* ─────────────────────────────────────────────────────────────────────────────
   General enquiry alert (from contact section form)
───────────────────────────────────────────────────────────────────────────── */
export function inquiryAlertEmail(d: {
  name: string; phone: string; email?: string; service?: string; message?: string;
}): string {
  return base(/* html */ `
    ${header()}
    <tr><td style="background:#FFFFFF;padding:28px 36px;">
      <h2 style="margin:0 0 4px;font-size:20px;font-weight:800;color:#1A1A2E;">&#128235; New Website Enquiry</h2>
      <p style="margin:0 0 24px;font-size:13px;color:rgba(26,26,46,0.5);">
        A customer has submitted an enquiry via the contact form.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#F8F8F8;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
        <tr><td>
          <p style="margin:0 0 14px;font-size:12px;font-weight:800;color:rgba(26,26,46,0.45);text-transform:uppercase;letter-spacing:1px;">Customer Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${detailRow("&#128100;", "Name",    d.name)}
            ${detailRow("&#128222;", "Phone",   `<a href="tel:${d.phone.replace(/\s/g,"")}" style="color:#FF8C00;text-decoration:none;">${d.phone}</a>`)}
            ${d.email ? detailRow("&#128231;", "Email", `<a href="mailto:${d.email}" style="color:#FF8C00;text-decoration:none;">${d.email}</a>`) : ""}
            ${d.service ? detailRow("&#128295;", "Service", d.service) : ""}
            ${d.message ? detailRow("&#128221;", "Message", d.message) : ""}
          </table>
        </td></tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="48%" style="padding-right:6px;">
            <a href="tel:${d.phone.replace(/\s/g,"")}"
              style="display:block;text-align:center;background:linear-gradient(135deg,#FFB300,#FF8C00);color:#1A1A2E;font-size:14px;font-weight:800;padding:13px 20px;border-radius:10px;text-decoration:none;">
              &#128222; Call Customer
            </a>
          </td>
          ${d.email ? /* html */ `
          <td width="48%" style="padding-left:6px;">
            <a href="mailto:${d.email}"
              style="display:block;text-align:center;background:#1A1A2E;color:#FFFFFF;font-size:14px;font-weight:800;padding:13px 20px;border-radius:10px;text-decoration:none;">
              &#128231; Reply by Email
            </a>
          </td>` : ""}
        </tr>
      </table>
    </td></tr>
    ${footer()}
  `);
}
