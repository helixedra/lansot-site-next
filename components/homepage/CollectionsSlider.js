import Link from "next/link";
import Image from "next/image";
import ItemsSlider from "@/components/shared/ItemsSlider";
import classes from "./CollectionsSlider.module.css";

export default function CollectionsSlider() {
  return (
    <div className={classes.slider}>
      <ItemsSlider slideWidth={500}>
        <Link href="/collections/office">
          <Image alt="" src={"/images/collections-slider/slide_01.jpg"} style={{ objectFit: "contain" }} width={1024} height={800} />
          <div className={classes.slider__content}>
            <div>Колекція</div>
            <div>Домашній Офіс</div>
          </div>
        </Link>
        <Link href="/collections/office">
          <Image alt="" src={"/images/collections-slider/slide_01.jpg"} style={{ objectFit: "contain" }} width={1024} height={800} />
          <div className={classes.slider__content}>
            <div>Колекція</div>
            <div>Домашній Офіс</div>
          </div>
        </Link>
        <Link href="/collections/office">
          <Image alt="" src={"/images/collections-slider/slide_01.jpg"} style={{ objectFit: "contain" }} width={1024} height={800} />
          <div className={classes.slider__content}>
            <div>Колекція</div>
            <div>Домашній Офіс</div>
          </div>
        </Link>
        <Link href="/collections/office">
          <Image alt="" src={"/images/collections-slider/slide_01.jpg"} style={{ objectFit: "contain" }} width={1024} height={800} />
          <div className={classes.slider__content}>
            <div>Колекція</div>
            <div>Домашній Офіс</div>
          </div>
        </Link>
      </ItemsSlider>
    </div>
  );
}
