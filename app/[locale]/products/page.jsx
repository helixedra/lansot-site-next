import ProductCard from "@/components/products/ProductCard";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateStaticParams() {
  const locales = languages.lang;
  return locales.map((locale) => ({
    locale,
  }));
}


export async function generateMetadata({ params }) {
  const { locale } = await params;
  // fetch content from API
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/products?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  const meta = {
    title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "products" });
}


export default async function ProductsPage({ params }) {
  const { locale } = await params;

  const [categories, products] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()),
  ]);

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:px-12 flex flex-col md:flex-row items-start">
      <CatalogMenu categories={categories} locale={locale} />
      <CatalogMenuMobile categories={categories} locale={locale} />

      <div className="w-full animate_moveUp">
        <h1 className="text-2xl font-medium md:block hidden">{categories[0].name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products.map((product, index) => (
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
