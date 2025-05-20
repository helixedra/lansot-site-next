import ui from "@/app/data/ui.json";
import Image from "next/image";
import classes from "./Technical.module.css";
export default function Technical({ product, locale }) {

  return (
    <section className={classes.product_drawings}>
      <h3 className="section_title">{ui.product_page.specifications[locale]}</h3>

      <div className={classes.drawings_container}>
        {product.technical.map((image) => (
          <div
            key={image.id}
            href={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.slug}/${image.path}`}
            className={classes.drawing}
          >
            <Image
              
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.slug}/${image.path}`}
              alt={image.imageMeta.alt}
              title={image.imageMeta.title}
              width={840}
              height={720}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
