import pages from "@/app/data/pages.json";
import PageHeader from "@/components/shared/PageHeader";
import { MetaData } from "@/utils/metadata";

export function generateStaticParams() {
  return Object.keys(pages.delivery).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.delivery[locale];

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
  const data = pages.delivery[locale];

  const sections = [
    { title: data.info.payment.title, content: data.info.payment.description },
    {
      title: data.info.delivery.title,
      content: data.info.delivery.description,
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={data.title} subtitle={data.subtitle} />

      <div className="mt-8 lg:mt-24 animate_fadeIn">
        <ul>
          {sections.map(({ title, content }, index) => (
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
                {content?.map((item, i) => (
                  <div
                    className="mb-16 lg:mb-32 text-xl"
                    key={`${index}-${i}`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
