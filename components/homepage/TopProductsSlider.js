import ItemsSlider from "@/components/shared/ItemsSlider";
import LinkButton from "@/components/shared/LinkButton";
import classes from "./TopProductsSlider.module.css";
import Image from "next/image";
import Link from "next/link";
import { RiFunctionLine } from "react-icons/ri";

export default function TopProductsSlider() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Популярні продукти</div>
        <div className={classes.controls}>
          <LinkButton href="/products" title="Всі продукти" type="icon" customStyle={{ backgroundColor: "var(--color-dark-100)", color: "white", border: "none" }}>
            <RiFunctionLine />
          </LinkButton>
        </div>
      </div>
      <div className={classes.slider}>
        <ItemsSlider slideWidth={440}>
          <Link href="/collections/office" className={classes.slider__item}>
            <Image alt="" src={"/images/products/folio-dh/folio_dh_cover.jpg"} style={{ objectFit: "contain" }} width={640} height={600} />
            <div className={classes.slider__content}>
              <div>Комод</div>
              <div>Folio DH</div>
            </div>
          </Link>
          <Link href="/collections/office" className={classes.slider__item}>
            <Image alt="" src={"/images/products/folio-dh/folio_dh_cover.jpg"} style={{ objectFit: "contain" }} width={640} height={600} />
            <div className={classes.slider__content}>
              <div>Комод</div>
              <div>Folio DH</div>
            </div>
          </Link>
          <Link href="/collections/office" className={classes.slider__item}>
            <Image alt="" src={"/images/products/folio-dh/folio_dh_cover.jpg"} style={{ objectFit: "contain" }} width={640} height={600} />
            <div className={classes.slider__content}>
              <div>Комод</div>
              <div>Folio DH</div>
            </div>
          </Link>
          <Link href="/collections/office" className={classes.slider__item}>
            <Image alt="" src={"/images/products/folio-dh/folio_dh_cover.jpg"} style={{ objectFit: "contain" }} width={640} height={600} />
            <div className={classes.slider__content}>
              <div>Комод</div>
              <div>Folio DH</div>
            </div>
          </Link>
          <Link href="/collections/office" className={classes.slider__item}>
            <Image alt="" src={"/images/products/folio-dh/folio_dh_cover.jpg"} style={{ objectFit: "contain" }} width={640} height={600} />
            <div className={classes.slider__content}>
              <div>Комод</div>
              <div>Folio DH</div>
            </div>
          </Link>
        </ItemsSlider>
      </div>
    </div>
  );
}
