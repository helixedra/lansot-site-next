import Image from "next/image";
import ui from "@/app/data/ui.json";
import ProductsSlider from "@/components/homepage/ProductsSlider";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  // fetch collection data
  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${slug}?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  const meta = {
    title: `${collection.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: collection.meta.description,
  };
  return MetaData({ locale, meta, pathname: `collections/${slug}` });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/static/collections`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());
  return locales.flatMap((locale) =>
    collections.map((collection) => ({
      locale,
      slug: collection.slug,
    }))
  );
}

export default async function CollectionsPage({ params }) {
  const { locale, slug } = await params;
  // fetch collection data
  const collection = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections/${slug}?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader
        title={collection.name}
        subtitle={ui.global.collection[locale]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-black pb-32 pt-8 mt-8 lg:mt-24">
        <div className="text-xl leading-relaxed">
          {collection.contents[0].content}
        </div>
        <Image
          alt={collection.cover.imageMeta.alt}
          title={collection.cover.imageMeta.title}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${collection.cover.path}`}
          style={{ objectFit: "contain" }}
          width={1024}
          height={800}
          className="w-auto h-auto"
        />
      </div>
      {collection.section.map((section) => (
        <div key={section.id}>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-[8rem] lg:my-[12rem]">
            <div className="mb-4">
              <h2>{section.title}</h2>
            </div>
            <div className="text-lg lg:text-xl leading-relaxed lg:leading-relaxed max-w-[800px]">
              {section.content}
            </div>
          </div>
          <div
            className={`grid grid-cols-1 items-center md:grid-${section.layout} gap-8`}
          >
            {section.images &&
              section.images.map((image, index) => (
                <div key={index} className="h-full lg:max-h-[600px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image.path}`}
                    alt={section.title}
                    className="h-full w-full object-cover"
                    width={1024}
                    height={800}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
      <ProductsSlider
        locale={locale}
        includes={collection.products}
        header={collection.name}
      />
    </div>
  );
}
