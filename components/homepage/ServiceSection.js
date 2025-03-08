import Image from "next/image";
import classes from "./ServiceSection.module.css";
import Link from "next/link";
import LinkButton from "@/components/shared/LinkButton";
import ui from "@/app/data/ui.json";

export default function ServiceSection({ content, locale, ...props }) {
  return (
    <div className={classes.container} {...props}>
      <div className={classes.inner_container}>
        <div className={classes.content}>
          <h2 className="mb-4 lg:mb-6">{content.title}</h2>
          <p className={classes.text}>{content.content}</p>
          <LinkButton href={`${locale}/services`}>{ui.global.see_more[locale]}</LinkButton>
        </div>
        <div className={classes.image}>
          <Image
            src="/images/homepage/folio-collection_2.jpg"
            title={content.title}
            alt={content.title}
            style={{ objectFit: "contain" }}
            width={1082}
            height={800}
          />
        </div>
      </div>
    </div>
  );
}
