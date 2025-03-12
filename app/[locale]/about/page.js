import Image from "next/image";
import pages from "@/app/data/pages.json";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.about[locale];
  const meta = {
    title: content.meta.title + ` ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "about" });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = await pages.about[locale];

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24 lg:mb-12">
        <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">{data.title}</div>
        <h1 className="PageHeader__title max-w-[920px]">{data.subtitle}</h1>
      </div>

      <div className="gap-8 flex lg:flex-row flex-col-reverse border-t border-black pb-32 pt-8">
        <div
          data-aos="fade-up"
          data-aos-duration="300"
          dangerouslySetInnerHTML={{ __html: data.content_p1 }}
          className="lg:w-4/12 lg:pr-16 mt-[-1rem] sm:w-full lg:text-xl lg:leading-9"
        ></div>
        <div data-aos="fade-up" data-aos-duration="300" className="w-full sm:w-full lg:w-8/12">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_0.jpg`}
            width={1600}
            height={830}
            alt="Idea SL"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="mt-8 lg:mt-24">
        <ul>
          {data.features.map((feature, index) => (
            <li
              key={index}
              data-aos="fade-up-left"
              data-aos-duration="300"
              className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
            >
              <div className="lg:w-1/2">
                <h2 className="uppercase max-w-[500px]">{feature.title}</h2>
              </div>
              <div className="lg:w-1/2">{feature.text}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 lg:mt-24 relative mb-32">
        <Image
          data-aos="fade-up"
          data-aos-duration="300"
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/delta-t2/delta_t2_promo_img_4.jpg`}
          width={2000}
          height={1500}
          style={{ objectFit: "cover" }}
          alt="delta 2"
        />
        <div
          data-aos="fade-up"
          data-aos-duration="300"
          dangerouslySetInnerHTML={{ __html: data.content_p2 }}
          className="lg:absolute left-0 text-lg bottom-0 lg:text-white mt-8 lg:p-24 sm:w-full lg:text-2xl lg:leading-9 "
        ></div>
      </div>
    </div>
  );
}
