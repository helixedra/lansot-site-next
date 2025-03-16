import pages from "@/app/data/pages.json";
import PageHeader from "@/components/shared/PageHeader";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.delivery[locale];
  const meta = {
    title: content.meta.title + ` - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "delivery" });
}

export default async function DeliveryPage({ params }) {
  const { locale } = await params;
  const data = await pages.delivery[locale];

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={data.title} subtitle={data.subtitle} />

      <div className="mt-8 lg:mt-24 animate_fadeIn">
        <ul>
          <li className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8">
            <div className="lg:w-1/2">
              <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                {data.info.payment.title}
              </h2>
            </div>
            <div className="lg:w-1/2">
              <div>
                {data.info.payment.description.map((item, index) => (
                  <div
                    className="mb-16 lg:mb-32 text-xl"
                    key={`${index}-payment`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></div>
                ))}
              </div>
            </div>
          </li>
          <li className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8">
            <div className="lg:w-1/2">
              <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                {data.info.delivery.title}
              </h2>
            </div>
            <div className="lg:w-1/2">
              <div>
                {data.info.delivery.description.map((item, index) => (
                  <div
                    className="mb-16 lg:mb-32 text-xl"
                    key={`${index}-delivery`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></div>
                ))}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
