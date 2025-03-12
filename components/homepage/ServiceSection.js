import Image from "next/image";
import classes from "./ServiceSection.module.css";
import Link from "next/link";
import Button from "@/components/shared/Button";
import ui from "@/app/data/ui.json";

export default function ServiceSection({ content, locale, ...props }) {
  return (
    <div className={classes.container} {...props}>
      <div className={classes.inner_container}>
        <div className={classes.content}>
          <Link href={`/${locale}/services`}>
            <h2 className="mb-4 lg:mb-6">{content.title}</h2>
          </Link>
          <p className='md:text-xl mb-8'>{content.content}</p>
          <Button title={ui.global.see_more[locale]} href={`/${locale}/services`}>
            {ui.global.see_more[locale]}
          </Button>
        </div>
        <div className={classes.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/homepage/folio-collection_2.jpg`}
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
