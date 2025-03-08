import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "uk"]; // List of supported locales
const DEFAULT_LOCALE = "uk"; // Default locale

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignore requests for static files
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Detect if request is from Googlebot
  const userAgent = request.headers.get("user-agent") || "";
  const isGooglebot = /Googlebot|Googlebot-Mobile|Googlebot-Image/i.test(userAgent);
  if (isGooglebot) {
    return NextResponse.next(); // Allow Googlebot to see the original URL
  }

  // Check if a locale is already in the URL
  const localeInPath = SUPPORTED_LOCALES.find((locale) => pathname.startsWith(`/${locale}`));
  if (localeInPath) {
    const response = NextResponse.next();
    response.cookies.set("locale", localeInPath, { path: "/" });
    return response;
  }

  // Check for locale in cookies
  const localeFromCookie = request.cookies.get("locale");
  if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie.value)) {
    return NextResponse.redirect(
      new URL(`/${localeFromCookie.value}${pathname}`, request.url),
      302
    );
  }

  // Redirect only for normal users, not Googlebot
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
}
