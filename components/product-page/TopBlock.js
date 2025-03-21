import ShowroomBadge from "./ShowroomBadge";
import classes from "./TopBlock.module.css";
import Image from "next/image";
import ui from "@/app/data/ui";
import Tooltip from "@/components/shared/Tooltip";
import OrderButtons from "./OrderButtons";

export default function TopBlock({ product, locale }) {
  return (
    <section className={`${classes.product_top} animate_moveUp`}>
      <div className={classes.product_main_img}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.url}/${product.top_image}`}
          alt={`${product.sub[locale]} ${product.name}`}
          title={`${product.sub[locale]} ${product.name}`}
          width={1600}
          height={1200}
        />
      </div>

      <div className={classes.product_description}>
        <h1 className="normal-case">{product.name}</h1>
        <p>{product.description[locale]}</p>

        <div className={classes.price}>
          <small>{ui.global.from[locale] + ` `}</small>
          <strong>
            {product.start_price}
            {` ` + ui.global.currency[locale]}
          </strong>
          <Tooltip>{ui.global.price_tooltip[locale]}</Tooltip>
        </div>
        <OrderButtons locale={locale} product={product} />
        {product.showroom && <ShowroomBadge locale={locale} />}
      </div>
    </section>
  );
}
