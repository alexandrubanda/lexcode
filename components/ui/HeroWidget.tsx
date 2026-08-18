"use client";

import { useState } from "react";

const slots = ["13:00", "13:30", "14:30", "15:00"];

interface HeroWidgetProps {
  pickTime: string;
  confirmBooking: string;
  confirmedMsg: string;
  tryAgain: string;
}

export default function HeroWidget({ pickTime, confirmBooking, confirmedMsg, tryAgain }: HeroWidgetProps) {
  const [selected, setSelected] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="bg-[var(--color-bg)] border-2 border-[var(--color-text)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-[6px] px-[10px] py-2 border-b-2 border-[var(--color-text)]">
        <div className="w-2 h-2 bg-[var(--color-text)]" />
        <div className="w-2 h-2 bg-[var(--color-text)]" />
        <div className="w-2 h-2 bg-[var(--color-accent)]" />
        <div className="ml-2 text-[10px] font-mono text-[var(--color-neutral-600)]">booking.yourshop.com</div>
      </div>

      <div className="p-4 flex flex-col gap-3 min-h-[110px] justify-center">
        {confirmed ? (
          <div className="flex flex-col gap-3 py-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center bg-[var(--color-accent)] shrink-0">
                <span className="text-[var(--color-bg)] text-[10px] font-extrabold leading-none">✓</span>
              </div>
              <span className="text-[13px] font-extrabold tracking-[-0.01em]">{confirmedMsg}</span>
            </div>
            <div className="text-[11px] font-mono text-[var(--color-neutral-600)]">{slots[selected]}</div>
            <button
              onClick={() => setConfirmed(false)}
              className="text-[10px] font-mono text-[var(--color-neutral-400)] hover:text-[var(--color-text)] transition-colors bg-transparent border-0 cursor-pointer self-start p-0 underline underline-offset-2"
            >
              {tryAgain}
            </button>
          </div>
        ) : (
          <>
            <div className="text-[13px] font-extrabold tracking-[-0.01em]">{pickTime}</div>
            <div className="grid grid-cols-4 gap-1">
              {slots.map((slot, i) => (
                <button
                  key={slot}
                  onClick={() => setSelected(i)}
                  className="text-[10px] font-extrabold py-2 pl-[6px] cursor-pointer border-0 text-left transition-colors"
                  style={{
                    background: i === selected ? "var(--color-accent)" : "var(--color-neutral-200)",
                    color: i === selected ? "var(--color-bg)" : "var(--color-neutral-500)",
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button
              onClick={() => setConfirmed(true)}
              className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[10px] font-extrabold py-[9px] px-3 self-start cursor-pointer border-0"
            >
              {confirmBooking}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
