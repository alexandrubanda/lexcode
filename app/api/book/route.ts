import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@/lib/db";
import {
  getAvailableSlots,
  createBookingEvent,
  formatBucharestDateTime,
} from "@/lib/google-calendar";
import { verifyTurnstile } from "@/lib/turnstile";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, slot, turnstileToken } = await req.json();

    if (!name || !email || !slot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 403 });
    }

    const slotStart = new Date(slot);
    if (isNaN(slotStart.getTime())) {
      return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
    }

    // Verify slot is still available in Google Calendar
    const dateStr = slotStart.toLocaleDateString("en-CA", {
      timeZone: "Europe/Bucharest",
    });
    const available = await getAvailableSlots(dateStr);
    if (!available.some((s) => s.getTime() === slotStart.getTime())) {
      return NextResponse.json({ error: "Slot no longer available" }, { status: 409 });
    }

    const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

    // ── Phase 1: reserve the slot in the DB ───────────────────────────────
    // If the DB is unavailable or the table doesn't exist, we stop here.
    // Nothing is created in Google Calendar yet.
    const rows = await sql`
      INSERT INTO bookings (name, email, message, starts_at, ends_at, status)
      VALUES (${name}, ${email}, ${message ?? null}, ${slotStart.toISOString()}, ${slotEnd.toISOString()}, 'pending')
      RETURNING id
    `;
    const bookingId: number = rows[0].id;

    // ── Phase 2: create the Calendar event ───────────────────────────────
    // If Calendar fails, mark the row 'failed' so it's visible for debugging.
    let eventId: string;
    let meetLink: string;
    try {
      ({ eventId, meetLink } = await createBookingEvent({
        name,
        email,
        message: message ?? null,
        slotStart,
      }));
    } catch (calErr) {
      await sql`UPDATE bookings SET status = 'failed' WHERE id = ${bookingId}`;
      console.error("Calendar event creation failed:", calErr);
      return NextResponse.json(
        { error: "Failed to create calendar event" },
        { status: 500 }
      );
    }

    // ── Phase 3: confirm in DB ────────────────────────────────────────────
    // The Calendar event already exists. If this update fails we log and
    // continue — the user IS booked (Calendar is source of truth) and the
    // 'pending' row can be reconciled manually.
    try {
      await sql`
        UPDATE bookings
        SET status = 'confirmed', calendar_event_id = ${eventId}
        WHERE id = ${bookingId}
      `;
    } catch (dbErr) {
      console.error(
        `DB confirm failed for booking ${bookingId} (Calendar event ${eventId} is live):`,
        dbErr
      );
    }

    // ── Emails: non-critical ──────────────────────────────────────────────
    const formattedTime = formatBucharestDateTime(slotStart);
    try {
      await Promise.all([
        resend.emails.send({
          from: "Lexcode <noreply@lexcode.dev>",
          to: process.env.CONTACT_EMAIL!,
          subject: `New booking: ${name}`,
          text: [
            `${name} (${email}) booked a 30-min call.`,
            ``,
            `When: ${formattedTime}`,
            `Meet: ${meetLink}`,
            ``,
            message ? `Message: ${message}` : "No message.",
          ].join("\n"),
        }),
        resend.emails.send({
          from: "Lexcode <noreply@lexcode.dev>",
          to: email,
          replyTo: process.env.CONTACT_EMAIL!,
          subject: "Your call with Alex is confirmed",
          text: [
            `Hi ${name},`,
            ``,
            `Your 30-min call with Alex (Lexcode) is confirmed.`,
            ``,
            `When: ${formattedTime}`,
            `Google Meet: ${meetLink}`,
            ``,
            `You'll also receive a Google Calendar invite at this address.`,
            ``,
            `See you then,`,
            `Alex`,
          ].join("\n"),
        }),
      ]);
    } catch (emailErr) {
      console.error("Email send failed (booking still confirmed):", emailErr);
    }

    return NextResponse.json({ ok: true, meetLink });
  } catch (err) {
    console.error("book route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
