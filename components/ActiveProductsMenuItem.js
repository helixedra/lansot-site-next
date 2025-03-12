"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "@/components/products/CatalogMenu.module.css";

export default function ActiveProductsMenuItem({ href, children, locale, title }) {
  const pathname = usePathname();

  const isActive = () => {
    // Для главной страницы
    if (href === `/${locale}/products` && pathname === `/${locale}/products`) {
      return true;
    }

    // Для остальных страниц
    return pathname === href;
  };

  return (
    <Link
      href={href}
      title={title}
      className={
        isActive() ? `${classes.catalog_menu_item__active}` : `${classes.catalog_menu_item}`
      }
    >
      {children}
    </Link>
  );
}
