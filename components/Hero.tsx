import BookingButton from "./ui/BookingButton";
import ScrollButton from "./ui/ScrollButton";
import HeroWidget from "./ui/HeroWidget";
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
            <BookingButton size="lg">{t.ctaBook}</BookingButton>
            <ScrollButton target="contact" variant="outline" size="lg">{t.ctaDescribe}</ScrollButton>
          </div>
        </div>

        {/* Right: widget */}
        <div className="lg:border-l-2 lg:border-[var(--color-divider)] flex flex-col">
          {/* Demo label strip */}
          <div className="flex items-center gap-2 px-8 md:px-10 py-[14px] border-b-2 border-[var(--color-divider)]">
            <div className="w-2 h-2 bg-[var(--color-accent)]" />
            <span className="text-[12px] font-mono font-extrabold tracking-[0.1em] uppercase text-[var(--color-text)]">
              {t.widget.demoLabel}
            </span>
          </div>
          <div className="flex-1 min-h-[300px] lg:min-h-[340px] bg-[var(--color-surface)] p-8 md:p-10 flex flex-col justify-center gap-5">
            <div className="text-[15px] md:text-[13px] font-mono text-[var(--color-neutral-700)]">{t.widget.inputLabel}</div>
            <div className="bg-[var(--color-bg)] border-2 border-[var(--color-text)] p-4">
              <div className="text-[17px] font-extrabold tracking-[-0.015em] leading-[1.3]">
                {t.widget.quote}
              </div>
            </div>
            <div className="h-[2px] bg-[var(--color-divider)]" />
            <div className="text-[15px] md:text-[13px] font-mono text-[var(--color-neutral-700)]">{t.widget.outputLabel}</div>
            <HeroWidget
              pickTime={t.widget.pickTime}
              confirmBooking={t.widget.confirmBooking}
              confirmedMsg={t.widget.confirmedMsg}
              tryAgain={t.widget.tryAgain}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
