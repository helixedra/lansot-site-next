import articles from "@/app/data/articles.json";

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = await articles.find((article) => article.slug === slug);
  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">
            {article.subtitle[locale]}
          </div>
          <h1 className="PageHeader__title max-w-[920px]">{article.title[locale]}</h1>
        </div>

        <div
          className="article mt-8 lg:mt-24"
          dangerouslySetInnerHTML={{ __html: article.content[locale] }}
          і
        ></div>
      </div>
    </>
  );
}
