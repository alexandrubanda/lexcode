import Link from "next/link";
import Mark from "./ui/Mark";
import type { Translations } from "@/lib/i18n/types";

type FooterT = Translations["footer"];

const legalPaths = {
  ro: { terms: "/termeni", privacy: "/confidentialitate", cookies: "/cookies" },
  en: { terms: "/en/termeni", privacy: "/en/confidentialitate", cookies: "/en/cookies" },
};

export default function Footer({ t, locale }: { t: FooterT; locale: string }) {
  const year = new Date().getFullYear();
  const paths = legalPaths[locale as "ro" | "en"] ?? legalPaths.ro;

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
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-6 md:py-[48px] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

        {/* Legal links */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-neutral-200)] pt-4">
          {(["terms", "privacy", "cookies"] as const).map((key) => (
            <Link
              key={key}
              href={paths[key]}
              className="text-[12px] font-mono text-[var(--color-neutral-500)] hover:text-[var(--color-text)] no-underline transition-colors"
            >
              {t.legal[key]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
