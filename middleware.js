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
    return NextResponse.next("/public" + pathname);
  }

  // Check if a locale is specified in the URL
  const localeInPath = SUPPORTED_LOCALES.find((locale) => pathname.startsWith(`/${locale}`));
  if (localeInPath) {
    // Store the locale in cookies
    const response = NextResponse.next();
    response.cookies.set("locale", localeInPath, { path: "/" });
    return response;
  }

  // Check for the locale in cookies
  const localeFromCookie = request.cookies.get("locale");

  if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie.value)) {
    // Redirect to the saved locale
    return NextResponse.redirect(new URL(`/${localeFromCookie.value}${pathname}`, request.url));
  }

  // If no locale is specified or it is not supported, redirect to the default locale
  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
}
