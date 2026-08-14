import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ro"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

function detectLocale(req: NextRequest): Locale {
  // 1. Cookie stores the user's explicit choice — always respect it
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie === "en" || cookie === "ro") return cookie;

  // 2. Vercel injects the visitor's country in production
  const country = req.headers.get("x-vercel-ip-country");
  if (country === "RO") return "ro";

  // 3. Accept-Language header as a dev/browser fallback
  const acceptLang = req.headers.get("accept-language") ?? "";
  if (acceptLang.toLowerCase().startsWith("ro")) return "ro";

  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) {
    // Route already has a locale — set the request header so the root layout
    // can read it to set <html lang="…"> without another round-trip.
    const locale = pathname.split("/")[1] as Locale;
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-locale", locale);

    const res = NextResponse.next({ request: { headers: reqHeaders } });
    // Persist the user's current locale as their preference
    res.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    return res;
  }

  // No locale in path — detect and redirect
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: [
    // Skip Next.js internals, static assets, image routes and API routes
    "/((?!api|_next/static|_next/image|opengraph-image|twitter-image|icon|apple-icon|manifest|.*\\.(?:ico|svg|png|jpg|jpeg|gif|webp|txt|xml|webmanifest)).*)",
  ],
};
