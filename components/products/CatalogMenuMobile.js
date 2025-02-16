"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import classes from "@/components/products/CatalogMenu.module.css";
import Link from "next/link";

export default function CatalogMenuMobile({ categories, locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();
  const activeCategory = pathname.split("/")[3];

  return (
    <div className={classes.mobile_catalog_menu}>
      <button className={classes.catalog_selector} onClick={toggleMenu}>
        {activeCategory || "Всі товари"}

        <span className={isMenuOpen ? `${classes.arrow} ${classes.arrow_up}` : classes.arrow}></span>
      </button>

      <ul className={classes.catalog_menu_items} style={{ display: isMenuOpen ? "block" : "none" }}>
        {categories.map((category) => (
          <li key={category[locale].url}>
            <Link href={`/${locale}/products${category[locale].url ? `/${category[locale].url}` : ""}`} key={category[locale].url}>
              {category[locale].name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
