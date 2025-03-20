import articles from "@/app/data/articles.json";
import ui from "@/app/data/ui.json";
import { notFound } from "next/navigation";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  const content = articles.find((article) => article.slug === slug);
  const meta = {
    title: `${content.title[locale]} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description[locale],
  };
  return MetaData({ locale, meta, pathname: `articles/${slug}` });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  return locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export default function ArticlePage({ params }) {
  const { locale, slug } = params;
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader
        title={ui.global.articles[locale]}
        subtitle={article.title[locale]}
      />
      <div
        className="article mt-8 lg:mt-24"
        dangerouslySetInnerHTML={{ __html: article.content[locale] }}
      />
    </div>
  );
}
