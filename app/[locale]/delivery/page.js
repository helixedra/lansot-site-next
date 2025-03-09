import pages from "@/app/data/pages.json";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.delivery[locale];
  const meta = {
    title: content.meta.title + ` ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "delivery" });
}

export default async function DeliveryPage({ params }) {
  const { locale } = await params;
  const data = await pages.delivery[locale];

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
        <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">{data.title}</div>
        <h1 className="PageHeader__title max-w-[920px]">{data.subtitle}</h1>
      </div>

      <div className="mt-8 lg:mt-24">
        <ul>
          <li
            data-aos="zoom-out"
            data-aos-duration="300"
            className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
          >
            <div className="lg:w-1/2">
              <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                {data.info.payment.title}
              </h2>
            </div>
            <div className="lg:w-1/2">
              <div>
                {data.info.payment.description.map((item, index) => (
                  <>
                    <div
                      data-aos="fade-up-left"
                      data-aos-duration="300"
                      className="mb-16 lg:mb-32 text-xl"
                      key={`${index}-payment`}
                      dangerouslySetInnerHTML={{ __html: item }}
                    ></div>
                    {/* <div className="h-1 bg-zinc-800 w-16 mb-8"></div> */}
                  </>
                ))}
              </div>
            </div>
          </li>
          <li
            data-aos="zoom-out"
            data-aos-duration="300"
            className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
          >
            <div className="lg:w-1/2">
              <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                {data.info.delivery.title}
              </h2>
            </div>
            <div className="lg:w-1/2">
              <div>
                {data.info.delivery.description.map((item, index) => (
                  <>
                    <div
                      data-aos="fade-up-left"
                      data-aos-duration="300"
                      className="mb-16 lg:mb-32 text-xl"
                      key={`${index}-delivery`}
                      dangerouslySetInnerHTML={{ __html: item }}
                    ></div>
                    {/* <div className="h-1 bg-zinc-800 w-16 mb-8"></div> */}
                  </>
                ))}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
