import ActiveProductsMenuItem from "@/components/ActiveProductsMenuItem";
import classes from "@/components/products/CatalogMenu.module.css";

export default function CatalogMenu({ categories }) {
  return (
    <>
      <aside className={classes.catalog_menu}>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <ActiveProductsMenuItem
                title={category.name}
                href={`/${category.locale}/products${
                  category.slug ? `/${category.slug}` : ""
                }`}
                locale={category.locale}
              >
                {category.name}
              </ActiveProductsMenuItem>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
