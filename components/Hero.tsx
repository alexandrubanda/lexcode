import Button from "./ui/Button";
import { BOOKING_URL } from "@/lib/data";
import type { Translations } from "@/lib/i18n/types";

type HeroT = Translations["hero"];

export default function Hero({ t }: { t: HeroT }) {
  return (
    <div id="top" className="max-w-[1240px] mx-auto px-5 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] border-b-2 border-[var(--color-divider)]">

        {/* Left: copy */}
        <div className="py-12 lg:py-20 lg:pr-12">
          <div className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-[var(--color-accent)] mb-6">
            {t.badge}
          </div>
          <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[0.98] m-0 mb-7 text-balance">
            {t.heading}
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.55] max-w-[560px] text-[var(--color-neutral-800)] m-0 mb-9">
            {t.body}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button href={BOOKING_URL} size="lg">{t.ctaBook}</Button>
            <Button href="#contact" variant="outline" size="lg">{t.ctaDescribe}</Button>
          </div>
        </div>

        {/* Right: widget */}
        <div className="lg:border-l-2 lg:border-[var(--color-divider)] flex flex-col">
          <div className="flex-1 min-h-[300px] lg:min-h-[340px] bg-[var(--color-surface)] p-8 md:p-10 flex flex-col justify-center gap-5">
            <div className="text-[11px] font-mono text-[var(--color-neutral-700)]">{t.widget.inputLabel}</div>
            <div className="bg-[var(--color-bg)] border-2 border-[var(--color-text)] p-4">
              <div className="text-[17px] font-extrabold tracking-[-0.015em] leading-[1.3]">
                {t.widget.quote}
              </div>
            </div>
            <div className="h-[2px] bg-[var(--color-divider)]" />
            <div className="text-[11px] font-mono text-[var(--color-neutral-700)]">{t.widget.outputLabel}</div>
            <div className="bg-[var(--color-bg)] border-2 border-[var(--color-text)]">
              <div className="flex items-center gap-[6px] px-[10px] py-2 border-b-2 border-[var(--color-text)]">
                <div className="w-2 h-2 bg-[var(--color-text)]" />
                <div className="w-2 h-2 bg-[var(--color-text)]" />
                <div className="w-2 h-2 bg-[var(--color-accent)]" />
                <div className="ml-2 text-[10px] font-mono text-[var(--color-neutral-600)]">booking.yourshop.com</div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="text-[13px] font-extrabold tracking-[-0.01em]">{t.widget.pickTime}</div>
                <div className="grid grid-cols-4 gap-1">
                  {["13:00", "13:30", "14:30", "15:00"].map((slot, i) => (
                    <div
                      key={slot}
                      className="text-[10px] font-extrabold py-2 pl-[6px]"
                      style={{
                        background: i === 2 ? "var(--color-accent)" : "var(--color-neutral-200)",
                        color: i === 2 ? "var(--color-bg)" : "var(--color-neutral-500)",
                      }}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
                <div className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[10px] font-extrabold py-[9px] px-3 self-start">
                  {t.widget.confirmBooking}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
