"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
// import { useLocale } from "@/contexts/LocaleContext";
import classes from "@/components/header/LanguageSwitcher.module.css";
import { RiGlobalLine } from "react-icons/ri";

export default function LanguageSwitcher({ locale: currentLocale }) {
  // const { locale: currentLocale } = await params;
  // const currentLocale = params.locale;
  // const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  const switchLanguage = (newLocale) => {
    if (isChanging || currentLocale === newLocale) return;

    setIsChanging(true);

    // Обновляем куки
    document.cookie = `locale=${newLocale};path=/`;

    // Получаем текущий путь и заменяем в нем локаль
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    // Перенаправляем, сохраняя текущий путь
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className={classes.language_switcher}>
      <RiGlobalLine />
      <button onClick={() => switchLanguage("uk")} disabled={isChanging} className={currentLocale === "uk" ? `${classes.active} ${classes.language_switcher__item}` : `${classes.language_switcher__item}`}>
        УКР
      </button>
      <button onClick={() => switchLanguage("en")} disabled={isChanging} className={currentLocale === "en" ? `${classes.active} ${classes.language_switcher__item}` : `${classes.language_switcher__item}`}>
        ENG
      </button>
    </div>
  );
}
