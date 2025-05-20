import Image from "next/image";
import { RiInformationLine } from "react-icons/ri";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export function generateStaticParams() {
  const locales = languages.lang;
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // fetch finishes page data
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/finishes?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  return MetaData({
    locale,
    meta: {
      title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: content.meta.description,
    },
    pathname: "finishes",
  });
}

export async function MaterialBlock({ materials, category }) {

  if (!materials) return null;

  return (
    <div className="my-12 animate_fadeIn">
      <h3 className="mt-12 mb-4">{category}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {materials.map((item) => (
          <div key={item.id} className="relative mb-6 w-full min-h-[150px]">
            <div className="absolute left-2 bottom-3 text-white bg-black p-2 z-10">
              <span className="text-xs">{item.image.imageMeta.alt}</span>
              <br />
              {item.image.imageMeta.title}
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/decors/${item.category.slug}/${item.image.path}`}
              alt={item.image.imageMeta.alt}
              title={item.image.imageMeta.title}
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
  // fetch finishes page data
  const page = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/finishes?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  // fetch materials list
  const materials = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/materials?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  let mappedMaterials = [];

  materials.forEach((material) => {
    if (!mappedMaterials.find((item) => item.id === material.category.id)) {
      mappedMaterials.push({
        id: material.category.id,
        name: material.category.name,
        materials: [material],
      });
    } else {
      mappedMaterials.find((item) => item.id === material.category.id).materials.push(material);
    }
  });

  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <PageHeader title={page.title} subtitle={page.subtitle} />
      

      {mappedMaterials.map((material) => (
        <MaterialBlock key={material.id} materials={material.materials} category={material.name} />
      ))}

      {page.info && (
        <div className="flex mt-12 bg-zinc-100 p-6 rounded-lg">
          <RiInformationLine fontSize={24} className="text-zinc-900 min-w-8" />
          <div className="ml-3 leading-6">{page.info}</div>
        </div>
      )}
    </div>
  );
}
