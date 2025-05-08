import pageContent from "@/app/data/pages.json";
import categories from "@/app/data/categories.json";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/app/data/products.json";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pageContent.products[locale];
  const meta = {
    title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "products" });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function ProductsPage({ params }) {
  const { locale } = await params;


  const categoriesData = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${locale}`).then((res) => res.json())
  const productsDataRaw = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${locale}`).then((res) => res.json())

  
  // const categoriesList = Array.isArray(categories)
  // ? categories
  // : Object.values(categories);
  //
  // const products = Array.isArray(productsData)
  // ? productsData
  // : Object.values(productsData);
//
//   const content = categories.products[locale];
  
//   console.log(categories)
//   console.log("categoriesData", categoriesData)
//   console.log("categoriesList", categoriesList)
// console.log("content", content)
// console.log("products", categories.products)
// console.log("products", products)

console.log("productsDataRaw", productsDataRaw)


  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:px-12 flex flex-col md:flex-row items-start">
      <CatalogMenu categories={categoriesData} locale={locale} />
      <CatalogMenuMobile categories={categoriesData} locale={locale} />

      <div className="w-full animate_moveUp">
        <h1 className="text-2xl font-medium md:block hidden">{categoriesData[0].name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {productsDataRaw.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
