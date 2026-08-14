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
      title: "Lexcode - Tu descrii. Eu programez.",
      description:
        "Aplicații web, aplicații mobile, automatizări și integrări AI. Peste 8 ani de experiență. Un developer dedicat care lucrează direct cu tine.",
      openGraph: {
        title: "Lexcode - Tu descrii. Eu programez.",
        description: "Aplicații web, aplicații mobile, automatizări și integrări AI. Peste 8 ani de experiență. Un developer dedicat care lucrează direct cu tine.",
        type: "website",
        url: BASE_URL,
        images: [ogImage],
      },
    };
  }

  return {
    alternates,
    title: "Lexcode - Describe it. I build it.",
    description:
      "Custom web apps, mobile apps,i nternal tools and AI features. 8+ years of shipping production software. One dedicated developer working directly with you.",
    openGraph: {
      title: "Lexcode - Describe it. I build it.",
      description: "Custom web apps, mobile apps, internal tools, and AI features. 8+ years of shipping production software. One dedicated developer working directly with you.",
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
