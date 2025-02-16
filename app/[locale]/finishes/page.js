import classes from "./page.module.css";
import mat from "@/app/data/decors.json";
import Image from "next/image";
import { RiInformationLine } from "react-icons/ri";
import page from "@/app/data/pages.json";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const content = page.finishes[locale];
  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
  };
}

export default async function FinishingPage({ params }) {
  const { locale } = await params;
  const content = page.finishes[locale];
  return (
    <div className="container">
      <h1 className="page_heading">{content.title}</h1>
      <div className={classes.info_wrapper}>
        <div className={classes.info_icon}>
          <RiInformationLine fontSize={24} />
        </div>
        <div className={classes.info_text}>{content.info}</div>
      </div>

      {/* LDSP Section */}
      {mat?.ldsp && (
        <div className={classes.decor_set}>
          <h3 className={classes.decor_set_title}>{mat.ldsp.title[locale]}</h3>
          {/* <div>{mat.ldsp.description[locale]}</div> */}
          <div className={classes.samples}>
            {mat.ldsp.images.map((ldsp, index) => (
              <div key={index} className={classes.sample_item}>
                <div className={classes.sample_item_title}>
                  <span className={classes.sample_item_pre_title}>{ldsp.description[locale]}</span>
                  <br />
                  {ldsp.title}
                </div>
                <div className={classes.decor_sample}>
                  <Image src={`/images/decors/ldsp/${ldsp.img}`} alt={ldsp.title} fill />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LDSP Wood Section */}
      {mat?.ldsp_wood && (
        <div className={classes.decor_set}>
          <h3 className={classes.decor_set_title}>{mat.ldsp_wood.title[locale]}</h3>
          {/* <div>{mat.ldsp_wood.description[locale]}</div> */}
          <div className={classes.samples}>
            {mat.ldsp_wood.images.map((ldsp_wood, index) => (
              <div key={index} className={classes.sample_item_big}>
                <div className={classes.sample_item_title}>
                  <span className={classes.sample_item_title_item_pre_title}>{ldsp_wood.description[locale]}</span>
                  <br />
                  {ldsp_wood.title}
                </div>
                <div className={classes.decor_sample}>
                  <Image src={`/images/decors/ldsp/${ldsp_wood.img}`} alt={ldsp_wood.title} fill />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
