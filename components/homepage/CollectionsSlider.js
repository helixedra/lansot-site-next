import Link from "next/link";
import Image from "next/image";
import ItemsSlider from "@/components/shared/ItemsSlider";
import classes from "./CollectionsSlider.module.css";
import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";

export default function CollectionsSlider({ locale, ...props }) {
  return (
    <div className={classes.slider} {...props}>
      <ItemsSlider slideWidth={500}>
        {collections.map((collection) => (
          <Link
            href={`/collections/${collection.url}`}
            key={collection.id}
            title={collection.name[locale]}
          >
            <Image
              alt={collection.name[locale]}
              title={collection.name[locale]}
              src={`/images/collections/${collection.cover}`}
              style={{ objectFit: "cover" }}
              className="w-[500px] h-[350px]"
              width={1024}
              height={700}
            />
            <div className={classes.slider__content}>
              <div>{ui.global.collection[locale]}</div>
              <div>{collection.name[locale]}</div>
            </div>
          </Link>
        ))}
      </ItemsSlider>
    </div>
  );
}
