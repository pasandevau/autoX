import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const TIME_SLOTS = [
  { label: "7:00 – 8:00 AM",   display: "7 AM",  startHour: 7,  endHour: 8  },
  { label: "8:00 – 9:00 AM",   display: "8 AM",  startHour: 8,  endHour: 9  },
  { label: "9:00 – 10:00 AM",  display: "9 AM",  startHour: 9,  endHour: 10 },
  { label: "10:00 – 11:00 AM", display: "10 AM", startHour: 10, endHour: 11 },
  { label: "11:00 AM – 12:00 PM", display: "11 AM", startHour: 11, endHour: 12 },
  { label: "12:00 – 1:00 PM",  display: "12 PM", startHour: 12, endHour: 13 },
  { label: "1:00 – 2:00 PM",   display: "1 PM",  startHour: 13, endHour: 14 },
  { label: "2:00 – 3:00 PM",   display: "2 PM",  startHour: 14, endHour: 15 },
  { label: "3:00 – 4:00 PM",   display: "3 PM",  startHour: 15, endHour: 16 },
  { label: "4:00 – 5:00 PM",   display: "4 PM",  startHour: 16, endHour: 17 },
  { label: "5:00 – 6:00 PM",   display: "5 PM",  startHour: 17, endHour: 18 },
  { label: "6:00 – 7:00 PM",   display: "6 PM",  startHour: 18, endHour: 19 },
];

function adelaideOffset(dateStr: string): string {
  // DST in SA: last Sun Oct → first Sun Apr ≈ months 10–12 and 1–3
  const month = parseInt(dateStr.split("-")[1]);
  return month >= 10 || month <= 3 ? "+10:30" : "+09:30";
}

function slotToUTC(dateStr: string, hour: number): Date {
  const offset = adelaideOffset(dateStr);
  const h = String(hour).padStart(2, "0");
  return new Date(`${dateStr}T${h}:00:00${offset}`);
}

function overlaps(
  slotStart: Date, slotEnd: Date,
  busyStart: Date, busyEnd: Date,
): boolean {
  return slotStart < busyEnd && slotEnd > busyStart;
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Valid date (YYYY-MM-DD) required" }, { status: 400 });
  }

  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ error: "Calendar not connected" }, { status: 500 });
  }

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const calendar = google.calendar({ version: "v3", auth });

    const offset = adelaideOffset(date);
    const timeMin = new Date(`${date}T07:00:00${offset}`).toISOString();
    const timeMax = new Date(`${date}T19:00:00${offset}`).toISOString();

    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: "Australia/Adelaide",
        items: [{ id: process.env.GOOGLE_CALENDAR_ID ?? "primary" }],
      },
    });

    const rawBusy = fb.data.calendars?.[process.env.GOOGLE_CALENDAR_ID ?? "primary"]?.busy ?? [];
    console.log(`[availability] ${date} — freebusy returned ${rawBusy.length} busy period(s):`, JSON.stringify(rawBusy));

    const busy = rawBusy.map((b) => ({
      start: new Date(b.start!),
      end:   new Date(b.end!),
    }));

    const slots = TIME_SLOTS.map((s) => {
      const start = slotToUTC(date, s.startHour);
      const end   = slotToUTC(date, s.endHour);
      const booked = busy.some((b) => overlaps(start, end, b.start, b.end));
      return {
        label:     s.label,
        display:   s.display,
        startHour: s.startHour,
        endHour:   s.endHour,
        available: !booked,
      };
    });

    return NextResponse.json({ date, slots });
  } catch (err) {
    console.error("[/api/availability]", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
