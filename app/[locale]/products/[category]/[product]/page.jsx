import productsData from "@/app/data/products.json";
import categories from "@/app/data/categories.json";
import { notFound } from "next/navigation";
import AddToCart from "@/components/parts/AddToCart";
import ProductConfig from "@/components/ProductConfig";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TopBlock from "@/components/product-page/TopBlock";
import Promo from "@/components/product-page/Promo";
import Technical from "@/components/product-page/Technical";
import Models from "@/components/product-page/Models";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

export async function generateMetadata({ params }) {
  const { locale, product } = await params;
  const productData = productsData[product];

  if (!productData) {
    notFound();
  }

  const currentCategory = categories[productData.category][locale];
  const meta = {
    title: `${productData.meta.title[locale]} - ${currentCategory.name} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: productData.meta.description[locale],
  };

  return MetaData({
    locale,
    meta,
    pathname: `products/${currentCategory.url}/${productData.url}`,
  });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  const productKeys = Object.keys(productsData);

  return locales.flatMap((locale) =>
    productKeys.map((product) => {
      const productData = productsData[product];
      const category = productData.category;
      return {
        locale,
        category,
        product,
      };
    })
  );
}

export default async function ProductPage({ params }) {
  const { locale, category, product } = await params;
  const productData = productsData[product];

  if (!productData) {
    notFound();
  }

  const currentCategory = categories[category];

  return (
    <div className="container max-w-[1600px] mx-auto">
      <Breadcrumbs category={currentCategory} locale={locale} />
      <TopBlock product={productData} locale={locale} />
      {/* <ProductConfig productData={productData} locale={locale} /> */}
      {/* <AddToCart productId={productData.id} locale={locale} /> */}
      <Promo product={productData} locale={locale} />
      <Technical product={productData} locale={locale} />
      <Models product={productData} locale={locale} />
    </div>
  );
}
