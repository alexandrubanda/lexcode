"use client";

interface Cta {
  no: string;
  title: string;
  body: string;
  link: string;
}

export default function ServicesCta({ cta }: { cta: Cta }) {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent("open-booking"))}
      className="flex flex-col gap-[10px] p-6 md:p-7 min-h-[220px] text-left transition-colors hover:bg-[var(--color-accent-600)] w-full border-0 cursor-pointer"
      style={{
        borderRight: "2px solid var(--color-divider)",
        borderBottom: "2px solid var(--color-divider)",
        background: "var(--color-accent)",
        color: "var(--color-bg)",
        fontFamily: "inherit",
      }}
    >
      <div className="text-[11px] font-mono">{cta.no}</div>
      <div className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.02em] leading-[1.1]">{cta.title}</div>
      <div className="text-[14px] leading-[1.55]">{cta.body}</div>
      <div className="mt-auto text-[14px] font-extrabold">{cta.link}</div>
    </button>
  );
}
