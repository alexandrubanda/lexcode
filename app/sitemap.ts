import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE_URL = process.env.SITE_URL ?? "https://lexcode.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}`])),
    },
  }));
}
