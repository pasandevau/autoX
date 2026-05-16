import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import { inquiryAlertEmail, callbackAlertEmail } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, phone, email, service, suburb, message } = body;

    if (!phone || !name) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const admin = process.env.GOOGLE_CALENDAR_ID ?? "admin@autoxpertgroup.org";

    if (type === "callback") {
      await sendEmail({
        to: admin,
        subject: `📞 Callback Request — ${name} — ${service ?? "General"}`,
        html: callbackAlertEmail({ name, phone, service, suburb }),
      });
    } else {
      await sendEmail({
        to: admin,
        subject: `📩 New Enquiry — ${name} — ${service ?? "General"}`,
        html: inquiryAlertEmail({ name, phone, email, service, message }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
