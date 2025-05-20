import PageHeader from "@/components/shared/PageHeader";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export function generateStaticParams() {
  const locales = languages.lang;
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  // fetch delivery page data
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/delivery?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  return MetaData({
    locale,
    meta: {
      title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: content.meta.description,
    },
    pathname: "delivery",
  });
}

export default async function DeliveryPage({ params }) {
  const { locale } = await params;
  // fetch delivery page data
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/delivery?locale=${locale}`).then((res) => res.json()).then((res) => res[0]);

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={content.subtitle} subtitle={content.title} />

      <div className="mt-8 lg:mt-24 animate_fadeIn">
        <ul>
          {content.content.map(({ title, content }, index) => (
            <li
              key={index}
              className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
            >
              <div className="lg:w-1/2">
                <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                  {title}
                </h2>
              </div>
              <div className="lg:w-1/2">
                
                  <div
                    className="mb-16 lg:mb-32 text-xl"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


