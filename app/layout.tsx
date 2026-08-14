import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "Lexcode — Software studio of one",
  description:
    "Tell me what you need. I'll build the thing that does it. Web apps, mobile apps, internal tools and AI features — by Alex.",
  openGraph: {
    title: "Lexcode — Software studio of one",
    description: "Words in. Software out.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();
  const locale = headerStore.get("x-locale") ?? "en";

  return (
    <html lang={locale} className={archivo.variable}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
