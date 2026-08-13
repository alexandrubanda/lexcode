const API_BASE = "https://www.googleapis.com/calendar/v3";

const SLOT_MIN = 30;
const BUFFER_MIN = 15;
const STEP_MIN = SLOT_MIN + BUFFER_MIN; // 45 — gap between slot starts
const DAY_START_H = 10;
const DAY_END_H = 18;
const TIMEZONE = "Europe/Bucharest";
const MAX_DAYS = 30;
const NOTICE_HOURS = 24;

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token exchange failed");
  return data.access_token as string;
}

// Minutes that Europe/Bucharest is ahead of UTC for a given UTC date
function bucharestOffsetMin(utcDate: Date): number {
  const utc = new Date(utcDate.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(utcDate.toLocaleString("en-US", { timeZone: TIMEZONE }));
  return Math.round((local.getTime() - utc.getTime()) / 60000);
}

// All potential slots for a YYYY-MM-DD string, returned as UTC Date objects
export function generateSlots(dateStr: string): Date[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  const ref = new Date(Date.UTC(y, m - 1, d, 12)); // noon UTC — safe DST reference
  const offsetMin = bucharestOffsetMin(ref);

  const slots: Date[] = [];
  let localMin = DAY_START_H * 60;

  while (localMin + SLOT_MIN <= DAY_END_H * 60) {
    slots.push(new Date(Date.UTC(y, m - 1, d, 0, localMin - offsetMin)));
    localMin += STEP_MIN;
  }

  return slots;
}

export function isWeekday(dateStr: string): boolean {
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return day >= 1 && day <= 5;
}

async function getBusy(dateStr: string): Promise<{ start: Date; end: Date }[]> {
  const [y, m, d] = dateStr.split("-").map(Number);
  const ref = new Date(Date.UTC(y, m - 1, d, 12));
  const offsetMin = bucharestOffsetMin(ref);

  const timeMin = new Date(Date.UTC(y, m - 1, d, 0, DAY_START_H * 60 - offsetMin));
  const timeMax = new Date(Date.UTC(y, m - 1, d, 0, DAY_END_H * 60 - offsetMin));

  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/freeBusy`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: "primary" }],
    }),
  });

  if (!res.ok) throw new Error(`freebusy failed: ${res.status}`);

  const data = await res.json();
  const busy: { start: string; end: string }[] = data.calendars?.primary?.busy ?? [];
  return busy.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

// A slot is free when its [start, end] range — with BUFFER_MIN on each side — doesn't
// overlap any busy block. This keeps 15 min clear before and after each meeting.
function slotIsFree(slotStart: Date, busy: { start: Date; end: Date }[]): boolean {
  const slotEnd = new Date(slotStart.getTime() + SLOT_MIN * 60000);
  const bufMs = BUFFER_MIN * 60000;
  return !busy.some(
    (b) =>
      b.start.getTime() < slotEnd.getTime() + bufMs &&
      b.end.getTime() > slotStart.getTime() - bufMs
  );
}

export async function getAvailableSlots(dateStr: string): Promise<Date[]> {
  const now = new Date();
  const minStart = new Date(now.getTime() + NOTICE_HOURS * 3600000);
  const maxStart = new Date(now.getTime() + MAX_DAYS * 24 * 3600000);

  const [slots, busy] = await Promise.all([
    Promise.resolve(generateSlots(dateStr)),
    getBusy(dateStr),
  ]);

  return slots.filter(
    (s) => s >= minStart && s <= maxStart && slotIsFree(s, busy)
  );
}

// Creates a Calendar event with a Google Meet link and returns the event id + Meet URL
export async function createBookingEvent(params: {
  name: string;
  email: string;
  message: string | null;
  slotStart: Date;
}): Promise<{ eventId: string; meetLink: string }> {
  const { name, email, message, slotStart } = params;
  const slotEnd = new Date(slotStart.getTime() + SLOT_MIN * 60000);
  const token = await getAccessToken();

  const res = await fetch(
    `${API_BASE}/calendars/primary/events?conferenceDataVersion=1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: `Call with ${name} — Lexcode`,
        description: message ?? "",
        start: { dateTime: slotStart.toISOString(), timeZone: TIMEZONE },
        end: { dateTime: slotEnd.toISOString(), timeZone: TIMEZONE },
        attendees: [{ email }],
        conferenceData: {
          createRequest: {
            requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`Event creation failed: ${res.status}`);
  const event = await res.json();

  return {
    eventId: event.id as string,
    meetLink: (event.hangoutLink ??
      event.conferenceData?.entryPoints?.[0]?.uri ??
      "") as string,
  };
}

export function formatBucharestDateTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
