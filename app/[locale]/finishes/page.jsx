import mat from "@/app/data/decors.json";
import Image from "next/image";
import { RiInformationLine } from "react-icons/ri";
import pages from "@/app/data/pages.json";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.finishes[locale];
  const meta = {
    title: content.meta.title + ` - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "finishes" });
}

export default async function FinishingPage({ params }) {
  const { locale } = await params;
  const data = pages.finishes[locale];
  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={data.title} subtitle={data.subtitle} />

      {mat?.ldsp && (
        <div className="my-12 animate_fadeIn">
          <h3 className="mt-12 mb-4">{mat.ldsp.title[locale]}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[150px]">
            {mat.ldsp.images.map((ldsp, index) => (
              <div
                key={index}
                className="relative mb-6 w-full h-full min-h-[150px]"
              >
                <div className="absolute left-2 bottom-3 text-white bg-black p-2 z-10">
                  <span className="text-xs">{ldsp.description[locale]}</span>
                  <br />
                  {ldsp.title}
                </div>
                <div className="w-full h-full relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/decors/ldsp/${ldsp.img}`}
                    alt={ldsp.title}
                    width={300}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mat?.ldsp_wood && (
        <div className="my-12">
          <h3 className="mt-12 mb-4">{mat.ldsp_wood.title[locale]}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[150px]">
            {mat.ldsp_wood.images.map((ldsp_wood, index) => (
              <div
                key={index}
                className="relative mb-6 w-full h-full min-h-[450px]"
              >
                <div className="absolute left-2 bottom-3 text-white bg-black p-2 z-10">
                  <span className="text-xs">
                    {ldsp_wood.description[locale]}
                  </span>
                  <br />
                  {ldsp_wood.title}
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/decors/ldsp/${ldsp_wood.img}`}
                    alt={ldsp_wood.title}
                    fill
                    sizes="w-[405px] h-[226px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-12 bg-zinc-100 p-6 rounded-lg">
            <div className="text-zinc-900 min-w-8">
              <RiInformationLine fontSize={24} />
            </div>
            <div className="ml-3 leading-6">{data.info}</div>
          </div>
        </div>
      )}
    </div>
  );
}
