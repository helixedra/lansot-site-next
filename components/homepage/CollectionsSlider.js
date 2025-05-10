import Link from "next/link";
import Image from "next/image";
import ui from "@/app/data/ui.json";
import { EmblaCarousel } from "@/components/shared/EmblaCarousel";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export default async function CollectionsSlider({ locale }) {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collections?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  return (
    <div className="slider max-w-[1600px] mx-auto p-4 lg:pb-48 pb-24">
      <EmblaCarousel locale={locale}>
        {collections.map((collection) => (
          <div className="embla__slide max-w-[500px] p-2" key={collection.id}>
            <Link
              href={`/${locale}/collections/${collection.slug}`}
              key={collection.id}
              title={collection.name}
              className="block"
            >
              <Image
                alt={collection.cover.imageMeta.alt}
                title={collection.cover.imageMeta.title}
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${collection.cover.path}`}
                style={{ objectFit: "cover" }}
                className="w-[500px] h-[350px]"
                width={1024}
                height={700}
              />
              <div className="mt-4">
                <div className="text-sm text-zinc-500">{ui.global.collection[locale]}</div>
                <div className="text-md font-semibold">{collection.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </EmblaCarousel>
    </div>
    // <div className={`${classes.slider}`}  >
    //   <ItemsSlider slideWidth={500} locale={locale}>
    //
    //   </ItemsSlider>
    // </div>
  );
}
