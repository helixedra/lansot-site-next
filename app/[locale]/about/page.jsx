import Image from "next/image";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateStaticParams() {
  return languages.lang.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  // fetch about page data
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/about?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);
  // generate metadata
  return MetaData({
    locale,
    meta: {
      title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: content.meta.description,
    },
    pathname: "about",
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  // fetch about page data
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/about?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  const features = data.content.filter((item) => item.slug.includes("feature"));

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={data.title} subtitle={data.subtitle} />

      <div className="gap-8 flex lg:flex-row flex-col-reverse border-t border-black pb-32 pt-8 animate_fadeIn">
        <div
          dangerouslySetInnerHTML={{ __html: data.content[0].content }}
          className="lg:w-4/12 lg:pr-16 mt-[-1rem] sm:w-full lg:text-xl lg:leading-9"
        ></div>
        <div className="w-full sm:w-full lg:w-8/12">
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
          {features.map((feature) => (
            <li
              key={feature.id}
              className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
            >
              <div className="lg:w-1/2">
                <h2 className="uppercase max-w-[500px]">{feature.title}</h2>
              </div>
              <div className="lg:w-1/2">{feature.content}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 lg:mt-24 relative mb-32">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/delta-t2/delta_t2_promo_img_4.jpg`}
          width={2000}
          height={1500}
          style={{ objectFit: "cover" }}
          alt="delta 2"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.content[1].content }}
          className="lg:absolute left-0 text-lg bottom-0 lg:text-white mt-8 lg:p-24 sm:w-full lg:text-2xl lg:leading-9"
        ></div>
      </div>
    </div>
  );
}
