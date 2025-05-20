import ui from "@/app/data/ui.json";
import { notFound } from "next/navigation";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/articles/${slug}?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);
  const meta = {
    title: `${content.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: `articles/${slug}` });
}

export async function generateStaticParams() {
  const locales = languages.lang;
  const articles = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/static/articles`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  // const map = locales.flatMap((locale) =>
  //   articles.map((article) => ({
  //     locale,
  //     slug: article.slug,
  //   }))
  // );

  return articles;
}



export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;

  const article = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/articles/${slug}?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader
        title={article.title}
        subtitle={ui.global.articles[locale]}
      />
      <div
        className="article mt-8 lg:mt-24"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
