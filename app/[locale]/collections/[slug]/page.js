import Image from "next/image";
import page from "@/app/data/pages.json";
import ContactSection from "@/components/homepage/ContactSection";
import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const content = await collections.find((collection) => collection.url === slug);

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
    title: content.meta.title[locale] + " - Lansot",
    description: content.meta.description[locale],
    keywords: content.meta.keywords[locale],

    openGraph: {
      title: content.meta.title[locale] + " - Lansot",
      description: content.meta.description[locale],
      keywords: content.meta.keywords[locale],
    },
    ...links,
  };
}

export default async function ContactsPage({ params }) {
  const { locale, slug } = await params;

  const content = await collections.find((collection) => collection.url === slug);

  console.log(slug);
  console.log(content);
  console.log(locale);

  // const data = await page.contacts[locale];

  //   {
  //     "id": 1,
  //     "name": {
  //         "uk": "Вітальня",
  //         "en": "Living room"
  //     },
  //     "title": {
  //         "uk": "Вітальня",
  //         "en": "Living room"
  //     },
  //     "meta": {
  //         "title": {
  //             "uk": "Вітальня",
  //             "en": "Living room"
  //         },
  //         "description": {
  //             "uk": "Вітальня",
  //             "en": "Living room"
  //         },
  //         "keywords": {
  //             "uk": "Вітальня",
  //             "en": "Living room"
  //         }
  //     },
  //     "url": "living-room",
  //     "cover": "living-room.jpg",
  //     "content": {
  //         "uk": "<p>Collection 1 content in Ukrainian</p>",
  //         "en": "<p>Collection 1 content in English</p>"
  //     }
  // }

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">
            {ui.global.collection[locale]}
          </div>
          <h1 className="PageHeader__title max-w-[920px]">{content.title[locale]}</h1>
        </div>
      </div>
    </>
  );
}
