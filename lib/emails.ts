const TZ = "Europe/Bucharest";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtDay(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtNow(): string {
  return new Date().toLocaleString("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const LOGO = `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:26px;height:26px;border:2px solid #f3f2f2">
  <tr><td style="padding:5px 5px 0 5px"><div style="height:3px;background:#f3f2f2;font-size:0;line-height:0">&nbsp;</div></td></tr>
  <tr><td style="padding:5px"><div style="width:7px;height:7px;background:#ec3013;font-size:0;line-height:0">&nbsp;</div></td></tr>
</table>`.trim();

// ── Template 02: enquiry notification to Alex ─────────────────────────────────
export function enquiryEmailHtml({
  name,
  email,
  timing,
  message,
}: {
  name: string;
  email: string;
  timing: string | null;
  message: string;
}): string {
  const n = esc(name);
  const e = esc(email);
  const m = esc(message).replace(/\n/g, "<br>");
  const t = timing ? esc(timing) : "—";
  const replySubject = encodeURIComponent("Re: your enquiry");

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;max-width:100%;background:#ffffff;font-family:Archivo,Helvetica,Arial,sans-serif;color:#201e1d">
  <tr><td style="padding:0">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
      <tr>
        <td style="padding:24px 28px;background:#201e1d">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
            <tr>
              <td style="padding:0 12px 0 0;vertical-align:middle">${LOGO}</td>
              <td width="100%" style="padding:0 24px 0 0;vertical-align:middle;font-size:19px;font-weight:700;letter-spacing:-0.03em;color:#f3f2f2">Lexcode</td>
              <td align="right" nowrap="nowrap" style="padding:0;vertical-align:middle;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ec3013;white-space:nowrap">New enquiry</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="padding:32px 28px 8px 28px">
        <div style="font-size:26px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;margin:0 0 6px">${n} wants to talk</div>
        <div style="font-size:13px;line-height:1.5;color:#5c5856">Sent from the contact form on lexcode.ro &middot; ${fmtNow()}</div>
      </td></tr>
      <tr><td style="padding:24px 28px 0 28px">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border-top:2px solid #201e1d">
          <tr>
            <td width="34%" style="padding:14px 12px 14px 0;border-bottom:1px solid #dcdad9;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;vertical-align:top">Name</td>
            <td style="padding:14px 0;border-bottom:1px solid #dcdad9;font-size:15px;font-weight:700;color:#201e1d">${n}</td>
          </tr>
          <tr>
            <td width="34%" style="padding:14px 12px 14px 0;border-bottom:1px solid #dcdad9;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;vertical-align:top">Email</td>
            <td style="padding:14px 0;border-bottom:1px solid #dcdad9;font-size:15px"><a href="mailto:${e}" style="color:#ec3013;text-decoration:none;font-weight:700">${e}</a></td>
          </tr>
          <tr>
            <td width="34%" style="padding:14px 12px 14px 0;border-bottom:2px solid #201e1d;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;vertical-align:top">Timing</td>
            <td style="padding:14px 0;border-bottom:2px solid #201e1d;font-size:15px;font-weight:700">${t}</td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="padding:28px 28px 0 28px">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:10px">Message</div>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#f3f2f2">
          <tr><td style="padding:18px 20px;font-size:15px;line-height:1.6;color:#201e1d">${m}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:28px">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
          <tr><td style="background:#ec3013"><a href="mailto:${e}?subject=${replySubject}" style="display:block;padding:14px 22px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none">Reply to ${n} &rarr;</a></td></tr>
        </table>
      </td></tr>
      <tr>
        <td style="padding:20px 28px;background:#201e1d;font-size:12px;line-height:1.5;color:#8f8a87">
          Lexcode &middot; <a href="https://lexcode.ro" style="color:#f3f2f2;text-decoration:none">lexcode.ro</a> &middot; automated notification, do not reply to this address
        </td>
      </tr>
    </table>
  </td></tr>
</table>`;
}

// ── Template 03: booking notification to Alex ─────────────────────────────────
export function bookingNotificationHtml({
  name,
  email,
  message,
  slotStart,
  slotEnd,
  meetLink,
}: {
  name: string;
  email: string;
  message: string | null;
  slotStart: Date;
  slotEnd: Date;
  meetLink: string;
}): string {
  const n = esc(name);
  const e = esc(email);
  const m = message ? esc(message).replace(/\n/g, "<br>") : "—";
  const ml = esc(meetLink);
  const day = fmtDay(slotStart);
  const timeRange = `${fmtTime(slotStart)} &ndash; ${fmtTime(slotEnd)}`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;max-width:100%;background:#ffffff;font-family:Archivo,Helvetica,Arial,sans-serif;color:#201e1d">
  <tr>
    <td style="padding:24px 28px;background:#201e1d">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
        <tr>
          <td style="padding:0 12px 0 0;vertical-align:middle;width:26px">${LOGO}</td>
          <td width="100%" style="padding:0 24px 0 0;vertical-align:middle;font-size:19px;font-weight:700;letter-spacing:-0.03em;color:#f3f2f2">Lexcode</td>
          <td align="right" nowrap="nowrap" style="padding:0;vertical-align:middle;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ec3013;white-space:nowrap">Call booked</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td style="padding:32px 28px 0 28px">
    <div style="font-size:26px;font-weight:700;letter-spacing:-0.02em;line-height:1.15">${n} booked a 30-min call</div>
    <div style="font-size:14px;line-height:1.5;margin-top:8px"><a href="mailto:${e}" style="color:#ec3013;text-decoration:none;font-weight:700">${e}</a></div>
  </td></tr>
  <tr><td style="padding:26px 28px 0 28px">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border-top:2px solid #201e1d;border-bottom:2px solid #201e1d">
      <tr>
        <td width="50%" style="padding:18px 16px 18px 0;vertical-align:top">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:8px">When</div>
          <div style="font-size:17px;font-weight:700;line-height:1.3">${day}</div>
          <div style="font-size:17px;font-weight:700;line-height:1.3">${timeRange}</div>
        </td>
        <td width="50%" style="padding:18px 0 18px 16px;vertical-align:top;border-left:1px solid #dcdad9">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:8px">Where</div>
          <div style="font-size:14px;line-height:1.5"><a href="${ml}" style="color:#201e1d;text-decoration:underline">${ml}</a></div>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:26px 28px 0 28px">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:10px">What they wrote</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#f3f2f2">
      <tr><td style="padding:18px 20px;font-size:15px;line-height:1.6">${m}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:28px">
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
      <tr>
        <td style="background:#ec3013"><a href="${ml}" style="display:block;padding:14px 22px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none">Join the call &rarr;</a></td>
        <td style="width:12px">&nbsp;</td>
        <td style="border:2px solid #201e1d"><a href="mailto:${e}" style="display:block;padding:12px 20px;font-size:14px;font-weight:700;color:#201e1d;text-decoration:none">Email them</a></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 28px;background:#201e1d;font-size:12px;line-height:1.5;color:#8f8a87">
    Lexcode &middot; <a href="https://lexcode.ro" style="color:#f3f2f2;text-decoration:none">lexcode.ro</a> &middot; automated notification
  </td></tr>
</table>`;
}

// ── Template 04: booking confirmation to customer ─────────────────────────────
// "Need to move it? Just reply to this email" removed — emails are sent from noreply.
export function bookingConfirmationHtml({
  name,
  slotStart,
  slotEnd,
  meetLink,
}: {
  name: string;
  slotStart: Date;
  slotEnd: Date;
  meetLink: string;
}): string {
  const firstName = esc(name.split(" ")[0]);
  const ml = esc(meetLink);
  const day = fmtDay(slotStart);
  const timeRange = `${fmtTime(slotStart)} &ndash; ${fmtTime(slotEnd)}`;

  return `<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;max-width:100%;background:#ffffff;font-family:Archivo,Helvetica,Arial,sans-serif;color:#201e1d">
  <tr>
    <td style="padding:24px 28px;background:#201e1d">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
        <tr>
          <td style="padding:0 12px 0 0;vertical-align:middle;width:26px">${LOGO}</td>
          <td width="100%" style="padding:0 24px 0 0;vertical-align:middle;font-size:19px;font-weight:700;letter-spacing:-0.03em;color:#f3f2f2">Lexcode</td>
          <td align="right" nowrap="nowrap" style="padding:0;vertical-align:middle;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ec3013;white-space:nowrap">Confirmed</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td style="padding:34px 28px 0 28px">
    <div style="font-size:14px;line-height:1.5;color:#5c5856">Hi ${firstName},</div>
    <div style="font-size:28px;font-weight:700;letter-spacing:-0.025em;line-height:1.12;margin-top:10px">Your 30-minute call with Alex is confirmed.</div>
  </td></tr>
  <tr><td style="padding:26px 28px 0 28px">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border-top:2px solid #201e1d;border-bottom:2px solid #201e1d">
      <tr>
        <td style="padding:20px 16px 20px 0;vertical-align:top">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:8px">When</div>
          <div style="font-size:19px;font-weight:700;line-height:1.25">${day}</div>
          <div style="font-size:19px;font-weight:700;line-height:1.25">${timeRange}</div>
          <div style="font-size:12px;color:#5c5856;margin-top:6px">Romania time</div>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:28px 28px 0 28px">
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
      <tr><td style="background:#ec3013"><a href="${ml}" style="display:block;padding:16px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none">Join on Google Meet &rarr;</a></td></tr>
    </table>
    <div style="font-size:12px;line-height:1.5;color:#5c5856;margin-top:10px">${ml} &mdash; no install needed, it opens in the browser.</div>
  </td></tr>
  <tr><td style="padding:30px 28px 0 28px">
    <div style="border-top:1px solid #dcdad9;padding-top:22px">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5c5856;margin-bottom:12px">What happens on the call</div>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
        <tr>
          <td width="24" style="padding:0 10px 10px 0;font-size:14px;font-weight:700;color:#ec3013;vertical-align:top">01</td>
          <td style="padding:0 0 10px 0;font-size:14px;line-height:1.55">You describe the problem in your own words. No prep needed.</td>
        </tr>
        <tr>
          <td width="24" style="padding:0 10px 10px 0;font-size:14px;font-weight:700;color:#ec3013;vertical-align:top">02</td>
          <td style="padding:0 0 10px 0;font-size:14px;line-height:1.55">I ask questions until the scope is clear enough to price.</td>
        </tr>
        <tr>
          <td width="24" style="padding:0 10px 0 0;font-size:14px;font-weight:700;color:#ec3013;vertical-align:top">03</td>
          <td style="padding:0;font-size:14px;line-height:1.55">You get a written summary with scope, timeline and cost &mdash; no obligation.</td>
        </tr>
      </table>
    </div>
  </td></tr>
  <tr><td style="padding:22px 28px;background:#201e1d">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
      <tr>
        <td width="100%" style="padding:0;font-size:13px;font-weight:700;color:#f3f2f2;line-height:1.5">Alex<br><span style="font-weight:400;color:#8f8a87">Words in. Software out.</span></td>
        <td align="right" nowrap="nowrap" style="padding:0 0 0 16px;font-size:12px;line-height:1.6;color:#8f8a87;white-space:nowrap">
          <a href="mailto:alex@lexcode.ro" style="color:#f3f2f2;text-decoration:none">alex@lexcode.ro</a><br>
          <a href="https://lexcode.ro" style="color:#f3f2f2;text-decoration:none">lexcode.ro</a>
        </td>
      </tr>
    </table>
  </td></tr>
</table>`;
}
