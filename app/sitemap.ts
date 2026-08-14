import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://lexcode.ro";

const roUrl = BASE_URL;
const enUrl = `${BASE_URL}/en`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: roUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: { ro: roUrl, en: enUrl } },
    },
    {
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: { ro: roUrl, en: enUrl } },
    },
  ];
}
