"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGlobalLine } from "react-icons/ri";
import { setCookie } from "../../utils/cookieUtils";

export default function LanguageVersion({ locale }) {
  const pathname = usePathname();

  const active = {
    uk: locale === "uk" ? "font-semibold" : "opacity-50 font-semibold",
    en: locale === "en" ? "font-semibold" : "opacity-50 font-semibold",
  };

  const path = {
    uk: {
      href: `/uk${pathname.substring(3)}`,
      title: "Українська версія",
    },
    en: {
      href: `/en${pathname.substring(3)}`,
      title: "English version",
    },
  };

  function handleSetLanguage(newLocale) {
    setCookie("locale", newLocale, { sameSite: "Lax" });
  }

  return (
    <div className="flex items-center gap-3 text-md lg:text-sm md:ml-4">
      {/* <RiGlobalLine /> */}
      <Link
        href={`${path.uk.href}`}
        title={`${path.uk.title}`}
        className={active.uk}
        onClick={() => handleSetLanguage("uk")}
      >
        УКР
      </Link>
      <Link
        href={`${path.en.href}`}
        title={`${path.en.title}`}
        className={active.en}
        onClick={() => handleSetLanguage("en")}
      >
        EN
      </Link>
    </div>
  );
}
