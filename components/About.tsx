import SectionLabel from "./ui/SectionLabel";
import type { Translations } from "@/lib/i18n/types";

type AboutT = Translations["about"];
type ComparisonT = AboutT["comparison"];

function AgencyComparison({ c }: { c: ComparisonT }) {
  return (
    <div className="aspect-[3/4] bg-[var(--color-surface)] p-8 flex flex-col justify-center gap-[26px]">
      {/* Agency side */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[11px] font-mono text-[var(--color-neutral-600)]">{c.agencyLabel}</div>
        <div className="flex flex-col gap-[6px]">
          {[c.you, ...c.agencySteps].map((label, i, arr) => (
            <div key={label}>
              <div className="border-2 border-[var(--color-neutral-400)] text-[var(--color-neutral-700)] text-[13px] font-extrabold px-3 py-[10px]">
                {label}
              </div>
              {i < arr.length - 1 && (
                <div className="text-[13px] text-[var(--color-neutral-500)] pl-3">&darr;</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[2px] bg-[var(--color-divider)]" />

      {/* Lexcode side */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[11px] font-mono text-[var(--color-accent-700)]">{c.lexcodeLabel}</div>
        <div className="flex flex-col gap-[6px]">
          <div className="bg-[var(--color-text)] text-[var(--color-bg)] text-[15px] font-extrabold px-[14px] py-[14px]">
            {c.you}
          </div>
          <div className="flex items-center gap-[10px] pl-3">
            <div className="text-[16px] font-extrabold text-[var(--color-accent)]">&darr;</div>
            <div className="text-[11px] font-mono text-[var(--color-neutral-700)]">{c.sameDay}</div>
          </div>
          <div className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[15px] font-extrabold px-[14px] py-[14px]">
            {c.alexLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About({ t }: { t: AboutT }) {
  return (
    <section id="about" className="max-w-[1240px] mx-auto px-5 md:px-10">
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]"
        style={{ borderBottom: "2px solid var(--color-divider)" }}
      >
        {/* Left: diagram */}
        <div className="py-12 lg:py-[72px] lg:pr-12 lg:border-r-2 lg:border-[var(--color-divider)]">
          <AgencyComparison c={t.comparison} />
        </div>

        {/* Right: bio */}
        <div className="py-12 lg:py-[72px] lg:pl-12">
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] m-0 mb-5">
            {t.heading}
          </h2>
          <p className="text-[17px] leading-[1.6] text-[var(--color-text)] max-w-[560px] m-0 mb-4">
            {t.body1}
          </p>
          <p className="text-[15px] leading-[1.6] text-[var(--color-neutral-800)] max-w-[560px] m-0">
            {t.body2}
          </p>

          <div
            className="grid grid-cols-3 gap-0 mt-9"
            style={{ borderTop: "2px solid var(--color-divider)" }}
          >
            {t.facts.map((fact) => (
              <div key={fact.k} className="pt-5 pr-4">
                <div className="text-[28px] md:text-[32px] font-extrabold tracking-[-0.03em] leading-[1]">{fact.k}</div>
                <div className="text-[13px] leading-[1.5] text-[var(--color-neutral-700)] mt-[6px]">{fact.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
