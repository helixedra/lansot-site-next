import mat from "@/app/data/decors.json";
import pages from "@/app/data/pages.json";
import Image from "next/image";
import { RiInformationLine } from "react-icons/ri";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";

export function generateStaticParams() {
  return Object.keys(pages.finishes).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.finishes[locale];

  return MetaData({
    locale,
    meta: {
      title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: content.meta.description,
    },
    pathname: "finishes",
  });
}

function renderMaterialBlock(category, locale) {
  const { title, images } = mat[category] || {};
  if (!title || !images) return null;

  return (
    <div className="my-12 animate_fadeIn">
      <h3 className="mt-12 mb-4">{title[locale]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <div key={index} className="relative mb-6 w-full min-h-[150px]">
            <div className="absolute left-2 bottom-3 text-white bg-black p-2 z-10">
              <span className="text-xs">{item.description[locale]}</span>
              <br />
              {item.title}
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/decors/ldsp/${item.img}`}
              alt={`${item.title} - ${locale}`}
              width={300}
              height={150}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function FinishingPage({ params }) {
  const { locale } = await params;
  const data = pages.finishes[locale];

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={data.title} subtitle={data.subtitle} />

      {renderMaterialBlock("ldsp", locale)}
      {renderMaterialBlock("ldsp_wood", locale)}

      {data.info && (
        <div className="flex mt-12 bg-zinc-100 p-6 rounded-lg">
          <RiInformationLine fontSize={24} className="text-zinc-900 min-w-8" />
          <div className="ml-3 leading-6">{data.info}</div>
        </div>
      )}
    </div>
  );
}
