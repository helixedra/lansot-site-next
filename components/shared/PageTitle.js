import Image from "next/image";
import classes from "./PageTitle.module.css";
export default function PageTitle({ title, image, alt }) {
  return (
    <div className={classes.page_title_container}>
      <h1 className={classes.page_title}>{title}</h1>
      <div className={classes.page_title_background_img}>
        <Image src={`/images/${image}`} alt={alt} fill />
      </div>
    </div>
  );
}
