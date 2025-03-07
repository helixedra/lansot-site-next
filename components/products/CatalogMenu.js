import ActiveProductsMenuItem from "@/components/ActiveProductsMenuItem";
import classes from "@/components/products/CatalogMenu.module.css";

export default function CatalogMenu({ categories, locale }) {
  return (
    <>
      <aside className={classes.catalog_menu}>
        <ul>
          {categories.map((category) => (
            <li key={category[locale].url}>
              <ActiveProductsMenuItem
                title={category[locale].name}
                href={`/${locale}/products${
                  category[locale].url ? `/${category[locale].url}` : ""
                }`}
                locale={locale}
              >
                {category[locale].name}
              </ActiveProductsMenuItem>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
