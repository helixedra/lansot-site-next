import Image from "next/image";
import page from "@/app/data/pages.json";
import ContactSection from "@/components/homepage/ContactSection";
import collections from "@/app/data/collections.json";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const content = await collections.find((collection) => collection.slug === slug);

  const path = `collections/${slug}`;
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
    title: content.title[locale] + " - Lansot",
    description: content.meta.description[locale],
    keywords: content.meta.keywords[locale],

    openGraph: {
      title: content.title[locale] + " - Lansot",
      description: content.meta.description[locale],
      keywords: content.meta.keywords[locale],
    },
    ...links,
  };
}

export default async function ContactsPage({ params }) {
  const { locale, slug } = await params;

  const content = await collections.find((collection) => collection.slug === slug);

  // console.log(slug);

  // const data = await page.contacts[locale];

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">collection page</div>
    </>
  );
}
