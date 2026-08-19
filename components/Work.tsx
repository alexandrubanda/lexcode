import SectionLabel from "./ui/SectionLabel";
import type { Translations } from "@/lib/i18n/types";

type WorkT = Translations["work"];

function ReportingIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[18px] flex flex-col justify-between">
      <div className="flex gap-2">
        {[{ label: "revenue", val: "↑ 12%" }, { label: "margin", val: "31%" }].map((item) => (
          <div key={item.label} className="flex-1 border-2 border-[var(--color-text)] p-[6px_8px]">
            <div className="text-[9px] font-mono text-[var(--color-neutral-700)]">{item.label}</div>
            <div className="text-[15px] font-extrabold tracking-[-0.02em]">{item.val}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-[6px] border-b-2 border-[var(--color-text)]" style={{ height: "52%" }}>
        {[38, 62, 48, 82, 56, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ height: `${h}%`, background: i === 3 ? "var(--color-accent)" : "var(--color-text)" }}
          />
        ))}
      </div>
    </div>
  );
}

function DeskBookingIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[18px] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-extrabold">Floor 3</div>
        <div className="text-[9px] font-mono bg-[var(--color-accent)] text-[var(--color-bg)] px-[6px] py-[3px]">Tue 14 Oct</div>
      </div>
      <div className="flex-1 grid grid-cols-6 grid-rows-4 gap-[5px]">
        {[
          "n300","n300","text","n300","text","n300",
          "text","n300","accent","n300","n300","text",
          "span2","n300","text","n300","n300",
          "text","n300","n300","n300","text","n300",
        ].map((c, i) => {
          if (c === "span2") {
            return (
              <div key={i} className="col-span-2 border-2 border-[var(--color-neutral-400)]" style={{ background: "var(--color-neutral-200)" }} />
            );
          }
          const bg = c === "text" ? "var(--color-text)" : c === "accent" ? "var(--color-accent)" : "var(--color-neutral-300)";
          return <div key={i} style={{ background: bg }} />;
        })}
      </div>
      <div className="flex gap-[14px] text-[9px] font-mono text-[var(--color-neutral-700)]">
        {[{ color: "var(--color-accent)", label: "your seat" }, { color: "var(--color-text)", label: "taken" }, { color: "var(--color-neutral-300)", label: "free" }].map((item) => (
          <div key={item.label} className="flex items-center gap-[5px]">
            <div className="w-2 h-2" style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecognitionIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[18px] flex flex-col justify-center gap-[10px]">
      <div className="bg-[var(--color-bg)] border-2 border-[var(--color-text)] p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-[18px] h-[18px] bg-[var(--color-text)]" />
          <div className="text-[10px] font-mono text-[var(--color-neutral-700)]">Maria thanked Ion</div>
        </div>
        <div className="text-[12px] font-extrabold tracking-[-0.01em] leading-[1.35]">
          &ldquo;Stayed late to get the client migration over the line with me.&rdquo;
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[11px] font-extrabold px-[10px] py-[6px]">+150 points</div>
        <div className="h-[2px] flex-1 bg-[var(--color-divider)]" />
        <div className="text-[9px] font-mono text-[var(--color-neutral-700)]">redeemable</div>
      </div>
    </div>
  );
}

function CoursePlatformIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[18px] flex flex-col justify-between">
      <div className="flex flex-col gap-[9px]">
        {[
          { n: 1, bg: "var(--color-text)", barBg: "var(--color-text)", label: "done", labelColor: "var(--color-neutral-700)" },
          { n: 2, bg: "var(--color-text)", barBg: "var(--color-text)", label: "done", labelColor: "var(--color-neutral-700)" },
          { n: 3, bg: "var(--color-accent)", barBg: "var(--color-neutral-300)", label: "now", labelColor: "var(--color-accent-700)" },
          { n: 4, bg: "transparent", barBg: "var(--color-neutral-300)", label: "", labelColor: "", border: true },
        ].map((step) => (
          <div key={step.n} className="flex items-center gap-[10px]">
            <div
              className="w-5 h-5 text-[11px] font-extrabold flex items-center justify-center flex-shrink-0"
              style={{
                background: step.bg,
                color: step.border ? "var(--color-neutral-500)" : "var(--color-bg)",
                border: step.border ? "2px solid var(--color-neutral-400)" : undefined,
              }}
            >
              {step.n}
            </div>
            <div className="h-2 flex-1" style={{ background: step.barBg }} />
            {step.label && <div className="text-[9px] font-mono" style={{ color: step.labelColor }}>{step.label}</div>}
          </div>
        ))}
      </div>
      <div>
        <div className="text-[9px] font-mono text-[var(--color-neutral-700)] mb-[5px]">course progress</div>
        <div className="h-3 bg-[var(--color-neutral-300)] flex">
          <div className="w-[62%] bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  );
}

function ExpensesIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[16px] flex flex-col gap-[7px] justify-center">
      {[
        { badge: "approved", bg: "var(--color-accent)", color: "var(--color-bg)", border: false },
        { badge: "waiting", bg: "transparent", color: "var(--color-neutral-700)", border: true },
        { badge: "repaid", bg: "var(--color-accent)", color: "var(--color-bg)", border: false },
      ].map((row) => (
        <div key={row.badge} className="flex items-center gap-2 bg-[var(--color-bg)] border-2 border-[var(--color-text)] px-[10px] py-2">
          <div className="h-2 flex-1 bg-[var(--color-text)]" />
          <div
            className="text-[9px] font-mono px-[6px] py-[3px]"
            style={{ background: row.bg, color: row.color, border: row.border ? "2px solid var(--color-neutral-400)" : undefined }}
          >
            {row.badge}
          </div>
        </div>
      ))}
      <div className="text-[9px] font-mono text-[var(--color-neutral-700)] mt-1">request → approval → money back</div>
    </div>
  );
}

function DocCaptureIllustration() {
  return (
    <div className="h-[184px] bg-[var(--color-surface)] p-[18px] flex items-center justify-center gap-4">
      <div className="w-[78px] max-h-[150px] h-full border-2 border-[var(--color-text)] bg-[var(--color-bg)] p-2 flex flex-col gap-[6px]">
        <div className="h-1 w-[26px] bg-[var(--color-neutral-400)] mx-auto" />
        <div className="flex-1 border-2 border-dashed border-[var(--color-neutral-400)] flex items-center justify-center text-[16px] font-extrabold text-[var(--color-accent)]">+</div>
        <div className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[8px] font-extrabold py-[5px] px-1 text-center">Upload</div>
      </div>
      <div className="flex-1 flex flex-col gap-[7px]">
        {[
          { iconBg: "var(--color-text)", barBg: "var(--color-text)" },
          { iconBg: "var(--color-text)", barBg: "var(--color-text)" },
          { iconBg: "var(--color-accent)", barBg: "var(--color-neutral-300)" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-[7px]">
            <div className="w-3 h-[14px]" style={{ background: row.iconBg }} />
            <div className="h-[7px] flex-1" style={{ background: row.barBg }} />
          </div>
        ))}
        <div className="text-[9px] font-mono text-[var(--color-neutral-700)] mt-[2px]">receipts → your accountant</div>
      </div>
    </div>
  );
}

const illustrations = [
  <ReportingIllustration key="reporting" />,
  <DeskBookingIllustration key="desk" />,
  <RecognitionIllustration key="recognition" />,
  <CoursePlatformIllustration key="course" />,
  <ExpensesIllustration key="expenses" />,
  <DocCaptureIllustration key="doc" />,
];

export default function Work({ t }: { t: WorkT }) {
  return (
    <section id="work" className="max-w-[1240px] mx-auto px-5 md:px-10">
      <div className="pt-16 md:pt-[72px] pb-7">
        <SectionLabel>{t.label}</SectionLabel>
        <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] m-0 mb-[10px] max-w-[700px]">
          {t.heading}
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--color-neutral-700)] max-w-[560px] m-0">
          {t.subtitle}
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderTop: "2px solid var(--color-divider)", borderLeft: "2px solid var(--color-divider)" }}
      >
        {t.items.map((item, i) => (
          <div
            key={item.title}
            className="p-6"
            style={{ borderRight: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}
          >
            {illustrations[i]}
            <div className="pt-[18px] flex flex-col gap-[6px]">
              <div className="text-[11px] font-mono text-[var(--color-neutral-600)]">{item.tag}</div>
              <h3 className="text-[20px] font-extrabold tracking-[-0.02em] m-0">{item.title}</h3>
              <p className="text-[14px] leading-[1.55] text-[var(--color-neutral-800)] m-0">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
