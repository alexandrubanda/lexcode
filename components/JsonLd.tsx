import { CONTACT_EMAIL } from "@/lib/data";

const BASE_URL = process.env.SITE_URL ?? "https://lexcode.ro";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${BASE_URL}/#organization`,
        "name": "Lexcode",
        "url": BASE_URL,
        "email": CONTACT_EMAIL,
        "description":
          "Software studio of one. Web apps, mobile apps, internal tools and AI features. I’m Alex, an engineer who takes a described problem and returns working software.",
        "slogan": "Words in. Software out.",
        "founder": { "@id": `${BASE_URL}/#person` },
        "areaServed": [
          { "@type": "Country", "name": "Romania" },
          { "@type": "AdministrativeArea", "name": "Worldwide" },
        ],
        "knowsLanguage": ["en", "ro"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Development Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web apps & SaaS development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MVP builds" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Websites & landing pages" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile app development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automation & internal tools" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI feature integration" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical consulting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project rescue & audit" } },
          ],
        },
        // Add social profiles here when available, e.g.:
        // "sameAs": ["https://linkedin.com/in/...", "https://github.com/..."]
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Alex",
        "url": BASE_URL,
        "email": CONTACT_EMAIL,
        "jobTitle": "Software Engineer",
        "worksFor": { "@id": `${BASE_URL}/#organization` },
        "knowsLanguage": ["en", "ro"],
        "knowsAbout": [
          "Web Development",
          "Mobile Development",
          "Software Architecture",
          "Artificial Intelligence",
          "Software as a Service",
          "Technical Consulting",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "name": "Lexcode",
        "url": BASE_URL,
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": ["en", "ro"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
