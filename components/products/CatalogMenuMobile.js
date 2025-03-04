"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import classes from "@/components/products/CatalogMenu.module.css";
import Link from "next/link";
import ui from "@/app/data/ui.json";

export default function CatalogMenuMobile({ categories, locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();
  const activeCategory = pathname.split("/")[3];

  function getActiveCategory(url) {
    const active = categories.find((category) => category[locale].url === url);
    return active || { [locale]: { name: ui.global.all_products[locale] } };
  }

  return (
    <div className={classes.mobile_catalog_menu}>
      <button className={classes.catalog_selector} onClick={toggleMenu}>
        {getActiveCategory(activeCategory)[locale].name}

        <span
          className={isMenuOpen ? `${classes.arrow} ${classes.arrow_up}` : classes.arrow}
        ></span>
      </button>

      <ul className={classes.catalog_menu_items} style={{ display: isMenuOpen ? "block" : "none" }}>
        {categories.map((category) => (
          <li key={category[locale].url}>
            <Link
              href={`/${locale}/products${category[locale].url ? `/${category[locale].url}` : ""}`}
              key={category[locale].url}
            >
              {category[locale].name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
