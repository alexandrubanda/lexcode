import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ro"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "ro";

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

function setCookie(res: NextResponse, locale: Locale) {
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "lax",
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /ro → redirect to / (ro is the default, canonical URL is /)
  if (pathname === "/ro" || pathname.startsWith("/ro/")) {
    const newPath = pathname === "/ro" ? "/" : pathname.slice(3);
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    const res = NextResponse.redirect(url);
    setCookie(res, "ro");
    return res;
  }

  // /en or /en/* → pass through with x-locale header
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const locale = pathname.split("/")[1] as Locale;
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-locale", locale);
    const res = NextResponse.next({ request: { headers: reqHeaders } });
    setCookie(res, locale);
    return res;
  }

  // No locale prefix — detect and handle
  const locale = detectLocale(req);

  if (locale === "en") {
    // Redirect to /en
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const res = NextResponse.redirect(url);
    setCookie(res, "en");
    return res;
  }

  // Romanian (default) — rewrite to /ro internally, URL stays clean
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-locale", "ro");
  const url = req.nextUrl.clone();
  url.pathname = `/ro${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.rewrite(url, { request: { headers: reqHeaders } });
  setCookie(res, "ro");
  return res;
}

export const config = {
  matcher: [
    // Skip Next.js internals, static assets, image routes and API routes
    "/((?!api|_next/static|_next/image|opengraph-image|twitter-image|icon|apple-icon|manifest|.*\\.(?:ico|svg|png|jpg|jpeg|gif|webp|txt|xml|webmanifest)).*)",
  ],
};
