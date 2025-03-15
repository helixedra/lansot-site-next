import Image from "next/image";
import classes from "./Promo.module.css";

const columnsStyle = {
  "col-1": "grid-cols-1",
  "col-2": "grid-cols-1 md:grid-cols-2  md:gap-8 lg:gap-12 md:p-4 lg:p-8",
  "col-3": "grid-cols-3 md:grid-cols-3 md:gap-8 lg:gap-12 md:p-4 lg:p-8",
};

export default function Promo({ product, locale }) {
  return (
    <section className={classes.product_promo}>
      {product.promo.map((promo, index) => (
        <div
          key={index}
          className={`promo-img grid my-[8rem] items-center justify-between ${
            columnsStyle[promo.type]
          }`}
        >
          {promo.images &&
            promo.images.map((image, imgIndex) => (
              <Image
                key={imgIndex}
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.url}/${image.img}`}
                alt={image.alt[locale]}
                title={image.alt[locale]}
                width={1600}
                height={1600}
                quality={90}
                className="max-h-[800px] w-full object-contain"
              />
            ))}
        </div>
      ))}
    </section>
  );
}
