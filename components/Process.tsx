import SectionLabel from "./ui/SectionLabel";
import type { Translations } from "@/lib/i18n/types";

type ProcessT = Translations["process"];

export default function Process({ t }: { t: ProcessT }) {
  return (
    <section
      id="process"
      className="border-t-2 border-[var(--color-divider)] mt-16 md:mt-[72px] bg-[var(--color-surface)]"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-16 md:py-[80px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] m-0 max-w-[620px]">
              {t.heading}
            </h2>
          </div>
          <p className="text-[13px] leading-[1.6] text-[var(--color-neutral-700)] max-w-[250px] m-0">
            {t.subtitle}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "2px solid var(--color-divider)" }}
        >
          {t.steps.map((step) => (
            <div key={step.no} className="pt-7 pr-0 md:pr-6 pb-7 flex flex-col gap-[10px]">
              <div className="text-[44px] font-extrabold tracking-[-0.03em] leading-[1] text-[var(--color-accent)]">
                {step.no}
              </div>
              <div className="text-[20px] font-extrabold tracking-[-0.02em]">{step.title}</div>
              <div className="text-[14px] leading-[1.55] text-[var(--color-neutral-800)]">{step.body}</div>
              <div className="text-[12px] font-mono text-[var(--color-neutral-600)] mt-[6px]">{step.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
