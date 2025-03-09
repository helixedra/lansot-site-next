import ItemsSlider from "@/components/shared/ItemsSlider";
import LinkButton from "@/components/shared/LinkButton";
import classes from "./TopProductsSlider.module.css";
import Image from "next/image";
import Link from "next/link";
import { RiFunctionLine } from "react-icons/ri";
import productsData from "@/app/data/products.json";
import categories from "@/app/data/categories.json";
import ui from "@/app/data/ui";

export default async function TopProductsSlider({ locale, ...props }) {
  const products = await Object.values(productsData).filter((product) => product.popular === true);

  return (
    <div className={classes.container} {...props}>
      <div className={classes.header}>
        <div className={classes.title}>{ui.global.popular_products[locale]}</div>
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
                href={`/${locale}/products/${product.category}/${product.url}`}
                key={product.url}
                className={classes.slider__item}
                title={product.name}
              >
                <Image
                  alt={product.meta.title[locale]}
                  title={product.meta.title[locale]}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.url}/${product.cover}`}
                  style={{ objectFit: "contain" }}
                  width={640}
                  height={600}
                />
                <div className={classes.slider__content}>
                  <div>{categories[product.category][locale].name}</div>
                  <div>{product.name}</div>
                </div>
              </Link>
            ))}
        </ItemsSlider>
      </div>
    </div>
  );
}
