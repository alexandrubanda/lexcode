import Mark from "./ui/Mark";
import type { Translations } from "@/lib/i18n/types";

type FooterT = Translations["footer"];

export default function Footer({ t }: { t: FooterT }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Red banner */}
      <div className="bg-[var(--color-accent)] text-[var(--color-bg)]">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-10 md:py-[56px]">
          <div className="text-[48px] md:text-[64px] font-extrabold tracking-[-0.04em] leading-[1]">
            {t.tagline}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-6 md:py-[48px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-[10px]">
          <Mark size={22} />
          <div className="text-[13px] font-mono text-[var(--color-neutral-700)]">
            Lexcode &mdash; {year}
          </div>
        </div>
        <div className="text-[13px] font-mono text-[var(--color-neutral-700)]">
          {t.byline}
        </div>
      </div>
    </footer>
  );
}
