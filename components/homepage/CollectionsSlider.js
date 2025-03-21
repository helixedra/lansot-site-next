import Link from "next/link";
import Image from "next/image";
import ItemsSlider from "@/components/shared/ItemsSlider";
import classes from "./CollectionsSlider.module.css";
import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import { EmblaCarousel } from "@/components/shared/EmblaCarousel";

export default function CollectionsSlider({ locale }) {
  return (
    <div className="slider max-w-[1600px] mx-auto p-4">
      <EmblaCarousel locale={locale}>
        {collections.map((collection) => (
          <div className="embla__slide max-w-[500px] p-2" key={collection.id}>
            <Link
              href={`/${locale}/collections/${collection.url}`}
              key={collection.id}
              title={collection.name[locale]}
              className="block"
            >
              <Image
                alt={collection.name[locale]}
                title={collection.name[locale]}
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/collections/${collection.cover}`}
                style={{ objectFit: "cover" }}
                className="w-[500px] h-[350px]"
                width={1024}
                height={700}
              />
              <div className="mt-4">
                <div className="text-sm text-zinc-500">{ui.global.collection[locale]}</div>
                <div className="text-md font-semibold">{collection.name[locale]}</div>
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
