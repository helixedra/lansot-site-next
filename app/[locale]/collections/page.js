import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import Link from "next/link";
import pages from "@/app/data/pages.json";

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

        <div className="grid grid-cols-1 gap-8  pb-32 pt-8 mt-8 lg:mt-24">
          {collections.map((collection) => (
            <div key={collection.id}>
              <Link
                className="block py-8 border-t border-black hover:bg-zinc-100 h-96"
                href={`/collections/${collection.url}`}
                key={collection.id}
              >
                <h2>{collection.name[locale]}</h2>
                <div>{collection.content.main.text[locale]}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
