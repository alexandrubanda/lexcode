import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cookies } from "@/lib/legal/cookies";
import LegalLayout from "@/components/LegalLayout";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const doc = cookies[locale as Locale] ?? cookies.ro;
  return {
    title: `${doc.title} — Lexcode`,
    robots: { index: false, follow: false },
  };
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const doc = cookies[locale as Locale] ?? cookies.ro;

  return (
    <LegalLayout
      t={t}
      locale={locale}
      title={doc.title}
      lastUpdated={doc.lastUpdated}
      content={doc.content}
    />
  );
}
