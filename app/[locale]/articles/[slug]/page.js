import articles from "@/app/data/articles.json";
import ui from "@/app/data/ui.json";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const content = await articles.find((article) => article.slug === slug);

  const path = `articles/${slug}`;
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

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = await articles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">
            {ui.global.articles[locale]}
          </div>
          <h1 className="PageHeader__title max-w-[920px]">{article.title[locale]}</h1>
        </div>

        <div
          className="article mt-8 lg:mt-24"
          dangerouslySetInnerHTML={{ __html: article.content[locale] }}
        ></div>
      </div>
    </>
  );
}
