import Link from "next/link";
import classes from "./Breadcrumbs.module.css";
import pages from "@/app/data/pages";

export default function breadcrumbs({ category, locale }) {
  return (
    <div className={classes.breadcrumbs_container}>
      <ul className={classes.breadcrumbs_list}>
        <li className={classes.breadcrumbs_list_item}>
          <Link href="/">{pages.homepage[locale].name}</Link>
        </li>
        <li className={classes.breadcrumbs_list_item}>
          <Link href="/products">{pages.products[locale].name}</Link>
        </li>
        <li className={classes.breadcrumbs_list_item}>
          <Link href={`/products/${category[locale].url}`}>{category[locale].name}</Link>
        </li>
      </ul>
    </div>
  );
}
