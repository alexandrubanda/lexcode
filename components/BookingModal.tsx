"use client";

import { useState, useEffect } from "react";
import type { Translations } from "@/lib/i18n/types";

type BookingT = Translations["booking"];
type Step = "date" | "time" | "details" | "confirmed";

export default function BookingModal({
  t,
  onClose,
}: {
  t: BookingT;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("date");
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  async function fetchSlots(dateStr: string) {
    setLoadingSlots(true);
    setSlots([]);
    try {
      const res = await fetch(`/api/availability?date=${dateStr}`);
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  function selectDate(dateStr: string) {
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setStep("time");
    fetchSlots(dateStr);
  }

  function formatTime(iso: string): string {
    const d = new Date(iso);
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  function formatDisplayDate(): string {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    return `${d} ${t.months[m - 1]} ${y}`;
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim() || null,
          slot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(res.status === 409 ? t.slotTaken : t.genericError);
        return;
      }
      setMeetLink(data.meetLink);
      setStep("confirmed");
    } catch {
      setError(t.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Calendar helpers ──────────────────────────────────────────────────────

  const now = new Date();
  const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  function isSelectable(y: number, m: number, d: number): boolean {
    const date = new Date(y, m, d);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return false;
    return date >= minDate && date <= maxDate;
  }

  function toDateStr(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function buildGrid(): (number | null)[] {
    const firstDow = new Date(calYear, calMonth, 1).getDay();
    const offset = (firstDow + 6) % 7; // Monday-first
    const days = new Date(calYear, calMonth + 1, 0).getDate();
    const cells: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  function canGoPrev(): boolean {
    return new Date(calYear, calMonth, 1) > new Date(now.getFullYear(), now.getMonth(), 1);
  }

  function canGoNext(): boolean {
    return new Date(calYear, calMonth + 1, 0) < maxDate;
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  }

  const grid = buildGrid();

  // ── Shared styles ──────────────────────────────────────────────────────────

  const monoLabel = "text-[11px] font-mono text-[var(--color-neutral-600)]";
  const backBtn = "text-[13px] font-mono text-[var(--color-neutral-600)] mb-4 cursor-pointer bg-transparent border-0 hover:text-[var(--color-text)] transition-colors p-0";
  const navBtn = "text-[18px] px-2 py-1 disabled:opacity-30 cursor-pointer bg-transparent border-0 text-[var(--color-text)] disabled:cursor-default";

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-bg)] w-full max-w-[520px] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--color-divider)]">
          <span className={monoLabel}>{t.title}</span>
          <button
            onClick={onClose}
            className="text-[22px] leading-none text-[var(--color-neutral-600)] hover:text-[var(--color-text)] transition-colors cursor-pointer bg-transparent border-0"
            style={{ fontFamily: "inherit" }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6">

          {/* ── Step 1: Date picker ─────────────────────────────────────── */}
          {step === "date" && (
            <div>
              <div className="text-[20px] font-extrabold tracking-[-0.02em] mb-5">{t.pickDate}</div>

              <div className="flex items-center justify-between mb-3">
                <button onClick={prevMonth} disabled={!canGoPrev()} className={navBtn} style={{ fontFamily: "inherit" }}>←</button>
                <span className="text-[15px] font-extrabold tracking-[-0.01em]">
                  {t.months[calMonth]} {calYear}
                </span>
                <button onClick={nextMonth} disabled={!canGoNext()} className={navBtn} style={{ fontFamily: "inherit" }}>→</button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {t.weekdays.map((wd) => (
                  <div key={wd} className={`text-center py-1 ${monoLabel}`}>{wd}</div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {grid.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const sel = isSelectable(calYear, calMonth, day);
                  const dateStr = toDateStr(calYear, calMonth, day);
                  const active = selectedDate === dateStr;
                  return (
                    <button
                      key={i}
                      onClick={() => sel && selectDate(dateStr)}
                      className="aspect-square flex items-center justify-center text-[14px] font-extrabold border-0 transition-colors"
                      style={{
                        fontFamily: "inherit",
                        background: active ? "var(--color-accent)" : "transparent",
                        color: active ? "var(--color-bg)" : sel ? "var(--color-text)" : "var(--color-neutral-500)",
                        cursor: sel ? "pointer" : "default",
                        opacity: sel ? 1 : 0.4,
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 2: Time slots ──────────────────────────────────────── */}
          {step === "time" && (
            <div>
              <button onClick={() => setStep("date")} className={backBtn} style={{ fontFamily: "inherit" }}>{t.back}</button>
              <div className="text-[20px] font-extrabold tracking-[-0.02em] mb-1">{t.pickTime}</div>
              <div className={`mb-5 ${monoLabel}`}>{formatDisplayDate()}</div>

              {loadingSlots && (
                <p className="text-[14px] text-[var(--color-neutral-600)] font-mono py-4">{t.loadingSlots}</p>
              )}
              {!loadingSlots && slots.length === 0 && (
                <p className="text-[14px] text-[var(--color-neutral-600)] py-4">{t.noSlots}</p>
              )}
              {!loadingSlots && slots.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => { setSelectedSlot(slot); setStep("details"); }}
                        className="py-3 text-[14px] font-extrabold border-2 cursor-pointer transition-colors"
                        style={{
                          fontFamily: "inherit",
                          borderColor: active ? "var(--color-accent)" : "var(--color-neutral-700)",
                          background: active ? "var(--color-accent)" : "transparent",
                          color: active ? "var(--color-bg)" : "var(--color-text)",
                        }}
                      >
                        {formatTime(slot)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Details form ────────────────────────────────────── */}
          {step === "details" && (
            <div>
              <button onClick={() => setStep("time")} className={backBtn} style={{ fontFamily: "inherit" }}>{t.back}</button>
              <div className="text-[20px] font-extrabold tracking-[-0.02em] mb-1">{t.yourDetails}</div>
              <div className={`mb-5 ${monoLabel}`}>
                {formatDisplayDate()}{selectedSlot ? ` — ${formatTime(selectedSlot)}` : ""}
              </div>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-0 border-b-2 border-[var(--color-neutral-700)] text-[var(--color-text)] text-[16px] py-[10px] outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-neutral-500)]"
                />
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-0 border-b-2 border-[var(--color-neutral-700)] text-[var(--color-text)] text-[16px] py-[10px] outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-neutral-500)]"
                />
                <textarea
                  rows={3}
                  placeholder={t.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-transparent border-2 border-[var(--color-neutral-700)] text-[var(--color-text)] text-[16px] p-3 outline-none focus:border-[var(--color-accent)] transition-colors resize-none placeholder:text-[var(--color-neutral-500)]"
                />

                {error && (
                  <p className="text-[13px] text-[var(--color-accent)]">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="text-[15px] font-extrabold bg-[var(--color-accent)] text-[var(--color-bg)] border-0 py-[18px] px-[22px] cursor-pointer hover:bg-[var(--color-accent-600)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "inherit" }}
                >
                  {submitting ? t.confirming : t.confirm}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Confirmation ────────────────────────────────────── */}
          {step === "confirmed" && (
            <div>
              <div className="text-[24px] font-extrabold tracking-[-0.02em] mb-2">{t.confirmed}</div>
              <p className="text-[14px] text-[var(--color-neutral-600)] leading-[1.6] mb-6">{t.successBody}</p>

              {meetLink && (
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[var(--color-accent)] text-[var(--color-bg)] no-underline text-[15px] font-extrabold py-[18px] px-[22px] hover:bg-[var(--color-accent-600)] transition-colors mb-3"
                >
                  {t.joinMeet}
                </a>
              )}

              <button
                onClick={onClose}
                className="w-full text-[14px] font-extrabold text-[var(--color-neutral-600)] border-0 bg-transparent py-3 cursor-pointer hover:text-[var(--color-text)] transition-colors"
                style={{ fontFamily: "inherit" }}
              >
                {t.close}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
