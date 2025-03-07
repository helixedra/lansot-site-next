import menu from "@/app/data/menu.json";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ActiveMenuItem from "@/components/ActiveMenuItem";
import ShoppingCart from "@/components/ShoppingCart";
import classes from "@/components/header/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Burger from "./Burger";
import MobileMenu from "./MobileMenu";
import ui from "@/app/data/ui.json";

export default function Header({ locale }) {
  return (
    <>
      <header className={`${classes.header} max-w-[1600px] mx-auto`}>
        <div className={classes.header_container}>
          <Link href="/" className={classes.logo_сontainer} title={ui.global.home_link[locale]}>
            <Image
              src="/images/lansot-logo.svg"
              alt="Lansot logo"
              title="Lansot"
              className={classes.logo_image}
              width={300}
              height={42}
              priority={true}
            ></Image>
          </Link>
          <nav className={classes.desktop_menu}>
            <div className={classes.desktop_menu__container}>
              <ul className={classes.desktop_menu__list}>
                {Object.keys(menu).map((item) => (
                  <li key={item} className={classes.desktop_menu__item}>
                    <ActiveMenuItem
                      title={menu[item][locale].name}
                      href={menu[item][locale].url}
                      locale={locale}
                    >
                      {menu[item][locale].name}
                    </ActiveMenuItem>
                  </li>
                ))}
                <li>{/* <ShoppingCart /> */}</li>
              </ul>
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
          <MobileMenu menu={menu} locale={locale} />
        </div>
      </header>
    </>
  );
}
