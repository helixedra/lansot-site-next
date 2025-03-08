"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import classes from "@/components/header/LanguageSwitcher.module.css";
import { RiGlobalLine } from "react-icons/ri";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  const switchLanguage = (newLocale) => {
    if (isChanging || currentLocale === newLocale) return;
    setIsChanging(true);

    document.cookie = `locale=${newLocale};path=/;SameSite=Lax`; // More secure

    const newPath = pathname.startsWith(`/${currentLocale}`)
      ? `/${newLocale}${pathname.substring(currentLocale.length + 1)}`
      : `/${newLocale}${pathname}`;

    router.push(newPath);
  };

  return (
    <div className={classes.language_switcher}>
      <RiGlobalLine />
      <button
        onClick={() => switchLanguage("uk")}
        disabled={isChanging}
        className={`${classes.language_switcher__item} ${
          currentLocale === "uk" ? classes.active : ""
        }`}
      >
        УКР
      </button>
      <button
        onClick={() => switchLanguage("en")}
        disabled={isChanging}
        className={`${classes.language_switcher__item} ${
          currentLocale === "en" ? classes.active : ""
        }`}
      >
        ENG
      </button>
    </div>
  );
}
