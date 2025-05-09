import ItemsSlider from "@/components/shared/ItemsSlider";
import LinkButton from "@/components/shared/LinkButton";
import classes from "./TopProductsSlider.module.css";
import Image from "next/image";
import Link from "next/link";
import { RiFunctionLine } from "react-icons/ri";
import ui from "@/app/data/ui";

export default async function TopProductsSlider({ locale, includes: products, header, ...props }) {


  return (
    <div className={classes.container} {...props}>
      <div className={classes.header}>
        <div className={classes.title}>{header}</div>
        <div className={classes.controls}>
          <LinkButton
            href={`/${locale}/products`}
            title={ui.global.all_products[locale]}
            type="icon"
            customStyle={{
              backgroundColor: "var(--color-dark-100)",
              color: "white",
              border: "none",
            }}
          >
            <RiFunctionLine />
          </LinkButton>
        </div>
      </div>
      <div className={classes.slider}>
        <ItemsSlider slideWidth={440} locale={locale}>
          {products &&
            products.map((product) => (
              <Link
                href={`/${locale}/products/${product.category.slug}/${product.slug}`}
                key={product.id}
                className={classes.slider__item}
              >
                <Image
                  alt={product.cover.imageMeta.alt}
                  title={product.cover.imageMeta.title}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.slug}/${product.cover.path}`}
                  style={{ objectFit: "contain" }}
                  width={640}
                  height={600}
                />
                <div className={classes.slider__content}>
                  <div>{product.category.name}</div>
                  <div>{product.name}</div>
                </div>
              </Link>
            ))}
        </ItemsSlider>
      </div>
    </div>
  );
}
