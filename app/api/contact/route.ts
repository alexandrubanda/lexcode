import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@/lib/db";
import { verifyTurnstile } from "@/lib/turnstile";
import { enquiryEmailHtml } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, timing, turnstileToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 403 });
    }

    await sql`
      INSERT INTO enquiries (name, email, message, timing)
      VALUES (${name}, ${email}, ${message}, ${timing ?? null})
    `;

    await resend.emails.send({
      from: "Lexcode <noreply@lexcode.ro>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Enquiry — ${name}${timing ? ` · ${timing}` : ""}`,
      html: enquiryEmailHtml({ name, email, timing: timing ?? null, message }),
      text: `${name} (${email}) sent an enquiry.\n\nTiming: ${timing ?? "not specified"}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
