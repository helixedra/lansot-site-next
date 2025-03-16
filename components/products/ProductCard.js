import Link from "next/link";
import Image from "next/image";
import classes from "./ProductCard.module.css";

export default function ProductCard({ product, locale }) {
  return (
    <div className={classes.product_card} key={product.url}>
      <Link
        href={`/${locale}/products/${product.category}/${product.url}`}
        title={product.name}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.url}/${product.cover}`}
          alt={`${product.sub[locale]} - ${product.name}`}
          title={`${product.sub[locale]} - ${product.name}`}
          width={640}
          height={600}
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
          quality={75}
        />
        <div className={classes.product_sub}>{product.sub[locale]}</div>
        <div className={classes.product_card_name}>{product.name}</div>
      </Link>
    </div>
  );
}
