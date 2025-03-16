import pageContent from "@/app/data/pages.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/app/data/products.json";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";
import TextMore from "@/components/shared/TextMore";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  const content = pageContent.products[locale];
  const categoryData = categories[category][locale];

  const meta = {
    title: `${categoryData.name} - ${content.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: categoryData.meta.description,
  };
  return MetaData({ locale, meta, pathname: `products/${category}` });
}

export default async function ProductsPage({ params }) {
  const { locale, category } = await params;
  const content = categories[category][locale];
  const categoriesList = Array.isArray(categories)
    ? categories
    : Object.values(categories);

  const products = Array.isArray(productsData)
    ? productsData
    : Object.values(productsData);

  const productsFiltered = products.filter(
    (product) => product.category === category
  );

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:px-12 flex flex-col md:flex-row items-start">
      <CatalogMenu categories={categoriesList} locale={locale} />
      <CatalogMenuMobile categories={categoriesList} locale={locale} />

      <div className="w-full animate_moveUp">
        <h1 className="normal-case text-2xl font-medium md:block hidden">
          {categories[category][locale].name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
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
