import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import Link from "next/link";
import pages from "@/app/data/pages.json";
import Image from "next/image";
import LinkButton from "@/components/shared/LinkButton";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.collections[locale];

  const meta = {
    title: content.meta.title + ` ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: `collections` });
}

export default async function CollectionsPage({ params }) {
  const { locale } = await params;
  const content = pages.collections[locale];

  return (
    <div className="container max-w-[1600px] mx-auto px-4">
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">
            {content.title}
          </div>
          <h1 className="PageHeader__title max-w-[920px]">{content.subtitle}</h1>
        </div>

        <div className="gap-8 pb-32 pt-8 mt-8 lg:mt-24">
          {collections.map((collection) => (
            <div key={collection.id}>
              <div
                className="flex flex-col lg:flex-row py-8 border-t border-black"
                key={collection.id}
              >
                <div className="w-full lg:w-1/2 order-last lg:order-first mt-12 mb-8 lg:mt-0">
                  <Link href={`/${locale}/collections/${collection.url}`}>
                    <h2 className="mb-8">{collection.name[locale]}</h2>
                  </Link>

                  <div className="py-4 pr-8 text-xl leading-relaxed">
                    {collection.content.main.text[locale]}
                  </div>
                  <LinkButton className="mt-8" href={`/${locale}/collections/${collection.url}`}>
                    {ui.global.see_more[locale]}
                  </LinkButton>
                </div>

                <div className="w-full lg:w-1/2 flex lg:justify-end">
                  <Link href={`/${locale}/collections/${collection.url}`}>
                    <Image
                      alt={collection.name[locale]}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${collection.cover}`}
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
