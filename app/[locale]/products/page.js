import pageContent from "@/app/data/pages.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/app/data/products.json";
import classes from "./products.module.css";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pageContent.products[locale];

  const path = `products`;
  const fullPath = `/${locale}/${path}`;
  const links = {
    metadataBase: new URL("https://lansot.com"),
    alternates: {
      canonical: fullPath,
      languages: {
        uk: "/uk/" + path,
        en: "/en/" + path,
      },
    },
  };

  return {
    title: content.title + " - Lansot",
    description: content.description,
    keywords: content.keywords,

    openGraph: {
      title: content.title + " - Lansot",
      description: content.description,
      keywords: content.keywords,
    },
    ...links,
  };
}

export default async function ProductsPage({ params }) {
  const { locale } = await params;
  const content = categories.products[locale];
  const categoriesList = Array.isArray(categories) ? categories : Object.values(categories);

  const products = Array.isArray(productsData) ? productsData : Object.values(productsData);

  return (
    <div className={`${classes.catalog} container `}>
      <CatalogMenu categories={categoriesList} locale={locale} />
      <CatalogMenuMobile categories={categoriesList} locale={locale} />

      <div data-aos="fade-up ">
        <h1 className={classes.category_title}>{content.name}</h1>
        <div className={classes.catalog_grid}>
          {products.map((product) => (
            <ProductCard key={product.url} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
