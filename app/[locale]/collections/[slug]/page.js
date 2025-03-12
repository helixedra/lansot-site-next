import Image from "next/image";
import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import ProductsSlider from "@/components/homepage/ProductsSlider";
import { MetaData } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const content = await collections.find((collection) => collection.url === slug);

  const meta = {
    title: content.meta.title[locale] + ` ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description[locale],
  };
  return MetaData({ locale, meta, pathname: `collections/${slug}` });
}

export default async function ContactsPage({ params }) {
  const { locale, slug } = await params;

  const content = await collections.find((collection) => collection.url === slug);

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">
            {ui.global.collection[locale]}
          </div>
          <h1 className="PageHeader__title max-w-[920px]">{content.title[locale]}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-black pb-32 pt-8 mt-8 lg:mt-24">
          <div className="text-xl leading-relaxed">{content.content.main.text[locale]}</div>
          <Image
            alt={content.title[locale]}
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${content.cover}`}
            style={{ objectFit: "contain" }}
            width={1024}
            height={800}
            className="w-auto h-auto"
          />
        </div>

        {content.content.sections.map((section) => (
          <div key={section.title[locale]}>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-[8rem] lg:my-[12rem]">
              <div className="mb-4">
                <h2>{section.title[locale]}</h2>
              </div>
              <div className="text-lg lg:text-xl leading-relaxed lg:leading-relaxed max-w-[800px]">
                {section.text[locale]}
              </div>
            </div>
            <div className={`grid grid-cols-1 items-center md:grid-${section.layout} gap-8`}>
              {section.images &&
                section.images.map((image, index) => (
                  <div key={index} className="h-full lg:max-h-[600px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${image}`}
                      alt={section.title[locale]}
                      className="h-full w-full object-cover"
                      width={1024}
                      height={800}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <ProductsSlider
          locale={locale}
          includes={content?.linked_products}
          header={content.title[locale]}
        />
      </div>
    </>
  );
}
