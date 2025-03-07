import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import Link from "next/link";
import pages from "@/app/data/pages.json";
import Image from "next/image";
import LinkButton from "@/components/shared/LinkButton";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const content = pages.collections[locale];

  const path = `collections`;
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
    title: content.meta.title + " - Lansot",
    description: content.meta.description,
    keywords: content.meta.keywords,

    openGraph: {
      title: content.meta.title + " - Lansot",
      description: content.meta.description,
      keywords: content.meta.keywords,
    },
    ...links,
  };
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
                className="grid grid-cols-1 lg:grid-cols-2 py-8 border-t border-black"
                key={collection.id}
              >
                <div>
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

                <div className="flex justify-end items-center">
                  <Link href={`/${locale}/collections/${collection.url}`}>
                    <Image
                      alt={collection.name[locale]}
                      src={`/images/collections/${collection.cover}`}
                      style={{ objectFit: "contain" }}
                      width={1024}
                      height={800}
                      className="w-auto h-auto"
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
