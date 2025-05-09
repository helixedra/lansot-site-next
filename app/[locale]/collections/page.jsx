// import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import Link from "next/link";
import pages from "@/app/data/pages.json";
import Image from "next/image";
import LinkButton from "@/components/shared/LinkButton";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/collections/${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());
  // const content = pages.collections[locale];
  const meta = {
    title: `${collections.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: collections.meta.description,
  };
  return MetaData({ locale, meta, pathname: "collections" });
}

export async function generateStaticParams() {
  return languages.lang.map((locale) => ({
    locale,
  }));
}

export default async function CollectionsPage({ params }) {
  const { locale } = await params;

  const [page, collections] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/collections/${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()),
  ]);

  return (
    <div className="container max-w-[1600px] mx-auto px-4">
      <div className="max-w-[1600px] mx-auto mb-12">
        <PageHeader title={page.title} subtitle={page.subtitle} />
        <div className="gap-8 pb-32 pt-8 mt-8 lg:mt-24 animate_fadeIn">
          {collections.map((collection) => (
            <div key={collection.id}>
              <div className="flex flex-col lg:flex-row py-8 border-t border-black">
                <div className="w-full lg:w-1/2 order-last lg:order-first mt-12 mb-8 lg:mt-0">
                  <Link href={`/${locale}/collections/${collection.slug}`}>
                    <h2 className="mb-8">{collection.name}</h2>
                  </Link>
                  <div className="py-4 pr-8 text-xl leading-relaxed">
                    {collection.contents[0].content}
                  </div>
                  <LinkButton
                    className="mt-8"
                    href={`/${locale}/collections/${collection.slug}`}
                  >
                    {ui.global.see_more[locale]}
                  </LinkButton>
                </div>
                <div className="w-full lg:w-1/2 flex lg:justify-end">
                  <Link href={`/${locale}/collections/${collection.slug}`}>
                    <Image
                      alt={collection.cover.imageMeta.alt}
                      title={collection.cover.imageMeta.title}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${collection.cover.path}`}
                      style={{ objectFit: "cover" }}
                      width={1024}
                      height={800}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
