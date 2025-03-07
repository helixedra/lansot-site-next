import pageContent from "@/app/data/pages.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/app/data/products.json";
import classes from "../products.module.css";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";
import TextMore from "@/components/shared/TextMore";

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  const content = pageContent.products[locale];
  const categoryData = categories[category][locale];

  const path = `products/${category}`;
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
    title: `${categoryData.name} - ${content.title} - Lansot`,
    description: categoryData.meta.description,
    keywords: categoryData.meta.keywords,

    openGraph: {
      title: `${categoryData.name} - ${content.title} - Lansot`,
      description: categoryData.meta.description,
      keywords: categoryData.meta.keywords,
    },
    ...links,
  };
}

export default async function ProductsPage({ params }) {
  const { locale, category } = await params;
  const content = categories[category][locale];
  const categoriesList = Array.isArray(categories) ? categories : Object.values(categories);

  const products = Array.isArray(productsData) ? productsData : Object.values(productsData);

  const productsFiltered = products.filter((product) => product.category === category);

  return (
    <div className={`${classes.catalog} container`}>
      <CatalogMenu categories={categoriesList} locale={locale} />
      <CatalogMenuMobile categories={categoriesList} locale={locale} />

      <div data-aos="fade-up">
        <h1 className={`normal-case ${classes.category_title}`}>
          {categories[category][locale].name}
        </h1>
        <div className={classes.catalog_grid}>
          {productsFiltered.map((product) => (
            <ProductCard key={product.url} product={product} locale={locale} />
          ))}
        </div>
        <TextMore locale={locale}>
          {content.category_description
            .split("</p>")
            .filter((paragraph) => paragraph.trim())
            .map((paragraph, index) => (
              <p key={index}>{paragraph.replace("<p>", "")}</p>
            ))}
        </TextMore>
      </div>
    </div>
  );
}
