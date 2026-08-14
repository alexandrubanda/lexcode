import type { Metadata } from "next";
import { getTranslations, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const BASE_URL = process.env.SITE_URL ?? "https://lexcode.ro";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const roUrl = BASE_URL;
  const enUrl = `${BASE_URL}/en`;

  const alternates = {
    canonical: locale === "ro" ? roUrl : enUrl,
    languages: {
      ro: roUrl,
      en: enUrl,
      "x-default": roUrl,
    },
  };

  const ogImage = { url: "/opengraph-image", width: 1200, height: 630 };

  if (locale === "ro") {
    return {
      alternates,
      title: "Lexcode - Studio software independent",
      description:
        "Spune-mi de ce ai nevoie. Eu construiesc soluția. Aplicații web, mobile, unelte interne și integrări AI",
      openGraph: {
        title: "Lexcode - Studio software independent",
        description: "Tu descrii. Eu programez.",
        type: "website",
        url: `${BASE_URL}/ro`,
        images: [ogImage],
      },
    };
  }

  return {
    alternates,
    title: "Lexcode - Software studio of one",
    description:
      "Tell me what you need. I'll build the thing that does it. Web apps, mobile apps, internal tools and AI features",
    openGraph: {
      title: "Lexcode - Software studio of one",
      description: "Words in. Software out.",
      type: "website",
      url: `${BASE_URL}/en`,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return (
    <>
      <JsonLd />
      <Nav t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Services t={t.services} />
        <Work t={t.work} />
        <Process t={t.process} />
        <About t={t.about} />
        <Contact t={t.contact} tBooking={t.booking} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
