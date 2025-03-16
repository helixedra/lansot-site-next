import pages from "@/app/data/pages.json";
import Link from "next/link";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.services[locale];
  const meta = {
    title: content.meta.title + ` - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "services" });
}
export default function ServicesPage({ params }) {
  const { locale } = params;
  const content = pages.services[locale];
  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={content.title} subtitle={content.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-black pb-32 pt-8">
        <div className="text-xl leading-relaxed">{content.content.p1}</div>
      </div>

      <div className="border-t border-black pb-32 pt-8">
        <ul>
          {content.content.list.map((item, index) => (
            <li
              key={index}
              className="mb-[6rem] w-1/2 text-2xl flex items-start"
            >
              <span className="mr-8">—</span>
              <span dangerouslySetInnerHTML={{ __html: item }}></span>
            </li>
          ))}
        </ul>
        <div className="border-t border-black pb-32 pt-8">
          <div className="text-xl leading-relaxed w-1/2 ">
            {content.content.p2}
          </div>
          <div className="text-xl leading-relaxed w-1/2 mt-8">
            {content.content.p3.split("{a}").map((part, index) => (
              <span key={index}>
                {index % 2 === 0 ? (
                  part
                ) : (
                  <Link href={`/${locale}/contacts`}>
                    <strong>{part}</strong>
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
