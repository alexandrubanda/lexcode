"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { BOOKING_URL } from "@/lib/data";
import type { Translations } from "@/lib/i18n/types";

type NavT = Translations["nav"];

function LocaleSwitcher({ bordered = false }: { bordered?: boolean }) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  function localePath(locale: string) {
    const segs = [...segments];
    segs[1] = locale;
    return segs.join("/") || `/${locale}`;
  }

  return (
    <div className={`flex items-center gap-[5px] ${bordered ? "border-l-2 border-[var(--color-neutral-300)] pl-4 ml-1" : ""}`}>
      {(["en", "ro"] as const).map((locale, i) => (
        <span key={locale} className="flex items-center gap-[5px]">
          {i > 0 && (
            <span className="text-[var(--color-neutral-400)] text-[12px] select-none">/</span>
          )}
          <Link
            href={localePath(locale)}
            className={`text-[13px] font-extrabold no-underline transition-colors ${
              currentLocale === locale
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-neutral-600)] hover:text-[var(--color-text)]"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

export default function Nav({ t }: { t: NavT }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.services, href: "#services" },
    { label: t.process, href: "#process" },
    { label: t.about, href: "#about" },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-[var(--color-bg)] border-b-2 border-[var(--color-text)]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-[14px] flex items-center justify-between gap-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-extrabold text-[var(--color-text)] no-underline hover:text-[var(--color-accent)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button href={BOOKING_URL}>{t.bookCall}</Button>
          <LocaleSwitcher bordered />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-0 cursor-pointer p-0"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="block h-[2px] bg-[var(--color-text)] transition-transform origin-center"
            style={{ transform: open ? "translateY(7px) rotate(45deg)" : undefined }}
          />
          <span
            className="block h-[2px] bg-[var(--color-text)] transition-opacity"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] bg-[var(--color-text)] transition-transform origin-center"
            style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : undefined }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t-2 border-[var(--color-text)] bg-[var(--color-bg)]">
          <div className="max-w-[1240px] mx-auto px-5 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-extrabold text-[var(--color-text)] no-underline py-2"
              >
                {l.label}
              </a>
            ))}
            <Button href={BOOKING_URL} size="lg" className="self-start mt-2">
              {t.bookCall}
            </Button>
            <div className="pt-3 border-t-2 border-[var(--color-neutral-200)]">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
