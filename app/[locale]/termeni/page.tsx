import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { terms } from "@/lib/legal/terms";
import LegalLayout from "@/components/LegalLayout";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const doc = terms[locale as Locale] ?? terms.ro;
  return {
    title: `${doc.title} — Lexcode`,
    robots: { index: false, follow: false },
  };
}

export default async function TermeniPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const doc = terms[locale as Locale] ?? terms.ro;

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
