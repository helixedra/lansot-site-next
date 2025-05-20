import ItemsSlider from "@/components/shared/ItemsSlider";
import LinkButton from "@/components/shared/LinkButton";
import classes from "./TopProductsSlider.module.css";
import Image from "next/image";
import Link from "next/link";
import { RiFunctionLine } from "react-icons/ri";
// import productsData from "@/app/data/products.json";
// import categories from "@/app/data/categories.json";
import ui from "@/app/data/ui";
import { EmblaCarousel } from "@/components/shared/EmblaCarousel";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export default async function TopProductsSlider({ locale }) {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?locale=${locale}&top=true`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json());

  return (
    <div className={`${classes.container}`}>
      <div className={classes.header}>
        <div className="text-lg font-semibold px-2">{ui.global.popular_products[locale]}</div>
        <div className={classes.controls}>
          <LinkButton
            className="mr-2"
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
      <div className="slider max-w-[1600px] mx-auto p-4">
        <EmblaCarousel locale={locale}>
          {products &&
            products.map((product) => (
              <div className="embla__slide max-w-[440px] p-2" key={product.id}>
                <Link
                  href={`/${locale}/products/${product.category.slug}/${product.slug}`}
                  // className={classes.slider__item}
                  className="block border border-zinc-300 p-8"
                  title={product.name}
                >
                  <Image
                    alt={product.cover.imageMeta.alt}
                    title={product.cover.imageMeta.title}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.slug}/${product.cover.path}`}
                    style={{ objectFit: "contain" }}
                    width={640}
                    height={600}
                  />
                  <div>
                    <div className="text-sm text-zinc-500">
                      {product.category.name}
                    </div>
                    <div className="text-md font-semibold mt-1">{product.name}</div>
                  </div>
                </Link>
              </div>
            ))}
        </EmblaCarousel>
      </div>
      {/* <div className={classes.slider}>
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
      </div> */}
    </div>
  );
}
