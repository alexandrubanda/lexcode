import SectionLabel from "./ui/SectionLabel";
import ServicesCta from "./ui/ServicesCta";
import type { Translations } from "@/lib/i18n/types";

type ServicesT = Translations["services"];

export default function Services({ t }: { t: ServicesT }) {
  return (
    <section id="services" className="max-w-[1240px] mx-auto px-5 md:px-10">
      <div className="pt-16 md:pt-[72px] pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
        <div>
          <SectionLabel>{t.label}</SectionLabel>
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] m-0 max-w-[640px]">
            {t.heading}
          </h2>
        </div>
        <p className="text-[13px] leading-[1.6] text-[var(--color-neutral-700)] max-w-[260px] m-0">
          {t.subtitle}
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderTop: "2px solid var(--color-divider)", borderLeft: "2px solid var(--color-divider)" }}
      >
        {t.items.map((s) => (
          <div
            key={s.no}
            className="flex flex-col gap-[10px] p-6 md:p-7 min-h-[220px] transition-colors hover:bg-[var(--color-surface)]"
            style={{ borderRight: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}
          >
            <div className="text-[11px] font-mono text-[var(--color-accent)]">{s.no}</div>
            <h3 className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.02em] leading-[1.1] m-0">{s.title}</h3>
            <p className="text-[14px] leading-[1.55] text-[var(--color-neutral-800)] m-0">{s.body}</p>
            <div className="mt-auto text-[12px] font-mono text-[var(--color-neutral-600)]">{s.meta}</div>
          </div>
        ))}

        <ServicesCta cta={t.cta} />
      </div>
    </section>
  );
}
