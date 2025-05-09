import ProductCard from "@/components/products/ProductCard";
import CatalogMenu from "@/components/products/CatalogMenu";
import CatalogMenuMobile from "@/components/products/CatalogMenuMobile";
import TextMore from "@/components/shared/TextMore";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${category}/${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  console.log(content);

  const meta = {
    title: `${content.name} - ${content.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };

  return MetaData({ locale, meta, pathname: `products/${category}` });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  // const categoryKeys = Object.keys(categories);
  const categoriesList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/en`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());
  const categoryKeys = categoriesList.map((category) => category.slug);

  // console.log(categoriesList);

  return locales.flatMap((locale) =>
    categoryKeys.map((category) => ({
      locale,
      category,
    }))
  );
}

export default async function ProductsPage({ params }) {
  const { locale, category } = await params;
  // fetch current category
  const currentCategory = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${category}/${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  // fetch categories list
  const categoriesList = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  const products = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${locale}?category=${category}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:px-12 flex flex-col md:flex-row items-start">
      <CatalogMenu categories={categoriesList} locale={locale} />
      <CatalogMenuMobile categories={categoriesList} locale={locale} />

      <div className="w-full animate_moveUp">
        <h1 className="normal-case text-2xl font-medium md:block hidden">
          {currentCategory.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        <TextMore locale={locale}>
          {currentCategory.description
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
