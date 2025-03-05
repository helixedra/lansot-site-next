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

export async function generateMetadata({ params }) {
  const { locale, product } = await params;

  const productData = productsData[product];
  const currentCategory = categories[productData.category][locale];

  if (!productData) {
    notFound();
  }

  const content = productData;

  const path = `products/${currentCategory.url}/${productData.url}`;
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
    title: `${content.meta.title[locale]} - ${currentCategory.name} - Lansot`,
    description: content.meta.description[locale],
    keywords: content.meta.keywords[locale],
    openGraph: {
      title: `${content.meta.title[locale]} - ${currentCategory.name} - Lansot`,
      description: content.meta.description[locale],
      keywords: content.meta.keywords[locale],
    },
    ...links,
  };
}

export default async function ProductPage({ params }) {
  const { locale, category, product } = await params;
  const productData = productsData[product];
  const currentCategory = categories[category];

  if (!productData) {
    notFound();
  }
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
