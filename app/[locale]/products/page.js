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
    description: content.meta.description,
    keywords: content.meta.keywords,

    openGraph: {
      title: content.title + " - Lansot",
      description: content.meta.description,
      keywords: content.meta.keywords,
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
    <div className={`${classes.catalog} max-w-[1600px] mx-auto px-6 lg:px-12`}>
      <CatalogMenu categories={categoriesList} locale={locale} />
      <CatalogMenuMobile categories={categoriesList} locale={locale} />

      <div className="w-full" data-aos="fade-up">
        <h1 className={classes.category_title}>{content.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products.map((product) => (
            <ProductCard key={product.url} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
