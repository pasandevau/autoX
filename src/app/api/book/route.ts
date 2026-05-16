import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";
import { customerConfirmationEmail, internalBookingAlert, BookingEmailData } from "@/lib/emailTemplates";

const TIME_SLOT_MAP: Record<string, { startHour: number; endHour: number }> = {
  "7:00 – 8:00 AM":      { startHour: 7,  endHour: 8  },
  "8:00 – 9:00 AM":      { startHour: 8,  endHour: 9  },
  "9:00 – 10:00 AM":     { startHour: 9,  endHour: 10 },
  "10:00 – 11:00 AM":    { startHour: 10, endHour: 11 },
  "11:00 AM – 12:00 PM": { startHour: 11, endHour: 12 },
  "12:00 – 1:00 PM":     { startHour: 12, endHour: 13 },
  "1:00 – 2:00 PM":      { startHour: 13, endHour: 14 },
  "2:00 – 3:00 PM":      { startHour: 14, endHour: 15 },
  "3:00 – 4:00 PM":      { startHour: 15, endHour: 16 },
  "4:00 – 5:00 PM":      { startHour: 16, endHour: 17 },
  "5:00 – 6:00 PM":      { startHour: 17, endHour: 18 },
  "6:00 – 7:00 PM":      { startHour: 18, endHour: 19 },
  "Flexible / ASAP":     { startHour: 8,  endHour: 17 },
};

function formatDateLong(dateStr?: string): string {
  if (!dateStr) return "Flexible / To be confirmed";
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function adelaideOffset(dateStr: string): string {
  const month = parseInt(dateStr.split("-")[1]);
  return month >= 10 || month <= 3 ? "+10:30" : "+09:30";
}

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone,
      service, vehicleMake, vehicleModel, vehicleYear,
      preferredDate, preferredTime, suburb, notes,
    } = body;

    // Validate required fields
    if (!firstName || !phone || !service || !suburb) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, phone, service, suburb" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return NextResponse.json(
        { error: "Calendar not authorised yet. Visit /api/auth/google to complete setup." },
        { status: 500 }
      );
    }

    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const calendar = google.calendar({ version: "v3", auth });

    const name = `${firstName} ${lastName}`.trim();
    const vehicle = [vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(" ");

    // Build start/end datetimes
    let startDt: Date;
    let endDt: Date;
    let isAllDay = false;

    if (preferredDate) {
      const slots  = TIME_SLOT_MAP[preferredTime] ?? { startHour: 8, endHour: 10 };
      const offset = adelaideOffset(preferredDate);
      startDt = new Date(`${preferredDate}T${String(slots.startHour).padStart(2, "0")}:00:00${offset}`);
      endDt   = new Date(`${preferredDate}T${String(slots.endHour).padStart(2, "0")}:00:00${offset}`);

      // All-day for "Flexible / ASAP"
      if (preferredTime === "Flexible / ASAP") isAllDay = true;
    } else {
      // No date selected — create a pending all-day event for today
      const today  = new Date().toISOString().split("T")[0];
      const offset = adelaideOffset(today);
      startDt = new Date(`${today}T08:00:00${offset}`);
      endDt   = new Date(`${today}T10:00:00${offset}`);
      isAllDay = false;
    }

    const description = [
      `📋 Service: ${service}`,
      vehicle ? `🚗 Vehicle: ${vehicle}` : null,
      `📍 Location: ${suburb}, Adelaide SA`,
      `📞 Phone: ${phone}`,
      email ? `📧 Email: ${email}` : null,
      preferredDate ? `📅 Requested: ${preferredDate}${preferredTime ? ` — ${preferredTime}` : ""}` : "📅 Date: Flexible / To be confirmed",
      notes ? `\n📝 Notes:\n${notes}` : null,
      `\n— Booking via AutoXpert website`,
    ].filter(Boolean).join("\n");

    const serviceName = service.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventBody: any = {
      summary: `AutoXpert — ${serviceName} | ${name}`,
      description,
      location: `${suburb}, Adelaide SA`,
      colorId: "5",
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email",  minutes: 24 * 60 },
          { method: "popup",  minutes: 60 },
        ],
      },
    };

    if (isAllDay) {
      const dateStr = preferredDate ?? new Date().toISOString().split("T")[0];
      eventBody.start = { date: dateStr };
      eventBody.end   = { date: dateStr };
    } else {
      eventBody.start = { dateTime: startDt.toISOString(), timeZone: "Australia/Adelaide" };
      eventBody.end   = { dateTime: endDt.toISOString(),   timeZone: "Australia/Adelaide" };
    }

    if (email) {
      eventBody.attendees = [{ email, displayName: name }];
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID ?? "primary",
      requestBody: eventBody,
      sendUpdates: email ? "all" : "none",
    });

    const emailData: BookingEmailData = {
      customerName: name,
      email:        email ?? "",
      phone,
      service:      serviceName,
      date:         formatDateLong(preferredDate),
      timeSlot:     preferredTime ?? "Flexible / ASAP",
      suburb,
      vehicle:      vehicle || undefined,
      notes:        notes || undefined,
      eventLink:    response.data.htmlLink ?? "",
    };

    const emailErrors: string[] = [];

    if (email) {
      try {
        await sendEmail({
          to:      email,
          subject: `Booking Confirmed — ${serviceName} | AutoXpert Group`,
          html:    customerConfirmationEmail(emailData),
          replyTo: "admin@autoxpertgroup.org",
        });
      } catch (e) {
        emailErrors.push(`customer email: ${e instanceof Error ? e.message : String(e)}`);
        console.error("[/api/book] Customer email failed:", e);
      }
    }

    try {
      await sendEmail({
        to:      process.env.GOOGLE_CALENDAR_ID ?? "admin@autoxpertgroup.org",
        subject: `🔔 New Booking — ${name} — ${serviceName} — ${preferredDate ?? "Flexible"}`,
        html:    internalBookingAlert(emailData),
      });
    } catch (e) {
      emailErrors.push(`internal alert: ${e instanceof Error ? e.message : String(e)}`);
      console.error("[/api/book] Internal alert email failed:", e);
    }

    return NextResponse.json({
      success: true,
      eventId:     response.data.id,
      eventLink:   response.data.htmlLink,
      message:     "Booking confirmed and added to calendar.",
      emailErrors: emailErrors.length ? emailErrors : undefined,
    });

  } catch (err) {
    console.error("[/api/book] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
