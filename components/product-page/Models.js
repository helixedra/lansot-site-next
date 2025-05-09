import { RiFolderDownloadLine } from "react-icons/ri";
import ui from "@/app/data/ui.json";
import classes from "./Models.module.css";

export default function Models({ product, locale }) {
  return (
    <section className={`mb-12 ${classes.product_downloads}`}>
      <h3 className="section_title">{ui.product_page.models[locale]}</h3>
      <div>
        {product.files.map((file) => (
          <a
            key={file.id}
            href={`${process.env.NEXT_PUBLIC_MODEL_PATH}/${file.path}`}
            download={file.path}
            className={`${classes.download_link} w-full mb-8 md:w-auto md:min-w-[300px] p-8`}
          >
            <div className={classes.model_title}>{product.name}</div>
            <RiFolderDownloadLine fontSize={24} className={classes.download_icon} />
          </a>
        ))}
      </div>
    </section>
  );
}
