import Link from "next/link";
import classes from "./Breadcrumbs.module.css";
import ui from "@/app/data/ui.json";

export default function Breadcrumbs({ category, locale }) {
  return (
    <div className={classes.breadcrumbs_container}>
      <ul className={classes.breadcrumbs_list}>
        <li className={classes.breadcrumbs_list_item}>
          <Link href={`/${locale}`}>{ui.global.home_link[locale]}</Link>
        </li>
        <li className={classes.breadcrumbs_list_item}>
          <Link href={`/${locale}/products`}>{ui.global.products[locale]}</Link>
        </li>
        <li className={classes.breadcrumbs_list_item}>
          <Link href={`/${locale}/products/${category.slug}`}>{category.name}</Link>
        </li>
      </ul>
    </div>
  );
}
