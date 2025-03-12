"use client";
import Burger from "./Burger";
import classes from "./Header.module.css";
import ActiveMenuItem from "@/components/ActiveMenuItem";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import LanguageVersion from "@/components/header/LanguageVersion";
import { useState } from "react";

export default function MobileMenu({ menu, locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Burger active={menuOpen} toggle={setMenuOpen} />

      <nav
        className={menuOpen ? `${classes.mobile_menu}` : `${classes.mobile_menu} ${classes.hide}`}
      >
        <ul className={classes.mobile_menu__list}>
          {Object.keys(menu).map((item) => (
            <li key={item} className={classes.mobile_menu__item} onClick={() => setMenuOpen(false)}>
              <ActiveMenuItem href={menu[item][locale].url} locale={locale}>
                {menu[item][locale].name}
              </ActiveMenuItem>
            </li>
          ))}
          <li>{/* <ShoppingCart /> */}</li>
        </ul>
        <div className={classes.language_switcher}>
          {/* <LanguageSwitcher /> */}
          <div className="flex items-center gap-1 px-6 py-2">
            <LanguageVersion locale={locale} />
          </div>
        </div>
      </nav>
    </>
  );
}
