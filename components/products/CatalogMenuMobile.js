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

  function getActiveCategory(slug) {
    const active = categories.find((category) => category.slug === slug);
    return active || { name: ui.global.all_products[locale] };
  }

  return (
    <div className={classes.mobile_catalog_menu}>
      <button className={classes.catalog_selector} onClick={toggleMenu}>
        {getActiveCategory(activeCategory).name}

        <span
          className={isMenuOpen ? `${classes.arrow} ${classes.arrow_up}` : classes.arrow}
        ></span>
      </button>

      <ul className={classes.catalog_menu_items} style={{ display: isMenuOpen ? "block" : "none" }}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/${category.locale}/products${category.slug ? `/${category.slug}` : ""}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
