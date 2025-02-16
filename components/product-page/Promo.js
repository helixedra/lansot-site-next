import Image from "next/image";
import classes from "./Promo.module.css";
export default function Promo({ product, locale }) {
  return (
    <section className={classes.product_promo}>
      {product.promo.map((promo, index) => (
        <div key={index} className={`promo-img ${promo.type}`}>
          {promo.images && promo.images.map((image, imgIndex) => <Image key={imgIndex} src={`/images/products/${product.url}/${image.img}`} alt={image.alt} title={image.alt} data-aos="fade-up" data-aos-duration="400" data-aos-offset="0" data-aos-easing="ease-in-sine" fill />)}
        </div>
      ))}
    </section>
  );
}
