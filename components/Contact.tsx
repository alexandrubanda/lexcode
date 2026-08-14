"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import SectionLabel from "./ui/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/data";
import type { Translations } from "@/lib/i18n/types";
import BookingModal from "./BookingModal";

type ContactT = Translations["contact"];
type BookingT = Translations["booking"];

export default function Contact({ t, tBooking }: { t: ContactT; tBooking: BookingT }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const message = messageRef.current?.value.trim() ?? "";

    if (!name || !email || !message) {
      setError(t.form.validationError);
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, timing: selectedTiming, turnstileToken }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <section id="contact" className="bg-[var(--color-text)] text-[var(--color-bg)]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[88px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

        {/* Left: intro */}
        <div>
          <SectionLabel light>{t.label}</SectionLabel>
          <h2 className="text-[40px] md:text-[56px] font-extrabold tracking-[-0.035em] leading-[1] m-0 mb-[22px] text-[var(--color-bg)]">
            {t.heading}
          </h2>
          <p className="text-[17px] leading-[1.6] text-[var(--color-neutral-400)] max-w-[460px] m-0">
            {t.body}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="text-[11px] font-mono text-[var(--color-neutral-600)] mb-1">{t.directLabel}</div>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center justify-between gap-4 border-2 border-[var(--color-neutral-700)] px-5 py-[18px] no-underline text-[var(--color-bg)] hover:border-[var(--color-neutral-500)] transition-colors group"
            >
              <span className="text-[17px] md:text-[18px] font-extrabold tracking-[-0.02em] break-all">{CONTACT_EMAIL}</span>
              <span className="text-[var(--color-neutral-600)] group-hover:text-[var(--color-neutral-400)] transition-colors flex-shrink-0 text-[18px]">→</span>
            </a>

            {/* Book a call */}
            <button
              onClick={() => setBookingOpen(true)}
              className="flex items-center justify-between gap-4 bg-[var(--color-accent)] px-5 py-[18px] text-[var(--color-bg)] hover:bg-[var(--color-accent-600)] transition-colors w-full border-0 cursor-pointer"
              style={{ fontFamily: "inherit" }}
            >
              <span className="text-[15px] font-extrabold">{t.bookLink}</span>
            </button>
          </div>
        </div>

        {/* Right: form or success */}
        <div>
          {sent ? (
            <div className="border-2 border-[var(--color-accent-500)] p-8">
              <div className="text-[28px] font-extrabold tracking-[-0.02em] mb-[10px]">{t.success.heading}</div>
              <div className="text-[15px] leading-[1.6] text-[var(--color-neutral-400)]">{t.success.body}</div>
            </div>
          ) : (
            <div className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                {[
                  { label: t.form.nameLabel, type: "text", ref: nameRef },
                  { label: t.form.emailLabel, type: "email", ref: emailRef },
                ].map((field) => (
                  <label key={field.label} className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-[var(--color-neutral-500)]">{field.label}</span>
                    <input
                      ref={field.ref as React.Ref<HTMLInputElement>}
                      type={field.type}
                      className="bg-transparent border-0 border-b-2 border-[var(--color-neutral-700)] text-[var(--color-bg)] text-[16px] py-[10px] outline-none focus:border-[var(--color-accent-500)] transition-colors"
                    />
                  </label>
                ))}
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-mono text-[var(--color-neutral-500)]">{t.form.messageLabel}</span>
                <textarea
                  ref={messageRef}
                  rows={5}
                  placeholder={t.form.messagePlaceholder}
                  className="bg-transparent border-2 border-[var(--color-neutral-700)] text-[var(--color-bg)] text-[16px] p-3 resize-y outline-none focus:border-[var(--color-accent-500)] transition-colors placeholder:text-[var(--color-neutral-600)]"
                />
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono text-[var(--color-neutral-500)]">{t.form.timingLabel}</span>
                <div className="flex gap-[2px] flex-wrap">
                  {t.form.timings.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedTiming(label)}
                      className="text-[13px] font-extrabold px-4 py-[10px] border-2 cursor-pointer transition-colors hover:border-[var(--color-accent-500)]"
                      style={{
                        fontFamily: "inherit",
                        borderColor: selectedTiming === label ? "var(--color-accent-500)" : "var(--color-neutral-700)",
                        background: selectedTiming === label ? "var(--color-accent)" : "transparent",
                        color: "var(--color-bg)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
              />

              {error && (
                <div className="text-[13px] text-[var(--color-accent-400)]">{error}</div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="text-[15px] font-extrabold bg-[var(--color-accent)] text-[var(--color-bg)] border-0 py-[18px] px-[22px] cursor-pointer flex items-center justify-start gap-[10px] w-full hover:bg-[var(--color-accent-500)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "inherit" }}
              >
                {submitting ? t.form.submitting : t.form.submit}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>

    {bookingOpen && (
      <BookingModal t={tBooking} onClose={() => setBookingOpen(false)} />
    )}
  </>
  );
}
