import classes from "./page.module.css";
import mat from "@/app/data/decors.json";
import Image from "next/image";
import { RiInformationLine } from "react-icons/ri";
import page from "@/app/data/pages.json";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const content = page.finishes[locale];

  const path = `finishes`;
  const fullPath = `/${locale}/${path}`;
  const links = {
    metadataBase: new URL("https://lansot.com"),
    alternates: {
      canonical: fullPath,
      languages: {
        uk: "/uk/" + path,
        en: "/en/" + path,
      },
    },
  };

  return {
    title: content.meta.title + " - Lansot",
    description: content.meta.description,
    keywords: content.meta.keywords,

    openGraph: {
      title: content.meta.title + " - Lansot",
      description: content.meta.description,
      keywords: content.meta.keywords,
    },
    ...links,
  };
}

export default async function FinishingPage({ params }) {
  const { locale } = await params;
  const data = page.finishes[locale];
  return (
    <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
      <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
        <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">{data.title}</div>
        <h1 className="PageHeader__title max-w-[920px]">{data.subtitle}</h1>
      </div>

      {/* LDSP Section */}
      {mat?.ldsp && (
        <div className={classes.decor_set} data-aos="zoom-out" data-aos-duration="300">
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
                <div className={`w-full h-full ${classes.decor_sample}`}>
                  <Image
                    src={`/images/decors/ldsp/${ldsp.img}`}
                    alt={ldsp.title}
                    width={300}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LDSP Wood Section */}
      {mat?.ldsp_wood && (
        <div className={classes.decor_set} data-aos="zoom-out" data-aos-duration="300">
          <h3 className={classes.decor_set_title}>{mat.ldsp_wood.title[locale]}</h3>
          {/* <div>{mat.ldsp_wood.description[locale]}</div> */}
          <div className={classes.samples}>
            {mat.ldsp_wood.images.map((ldsp_wood, index) => (
              <div key={index} className={classes.sample_item_big}>
                <div className={classes.sample_item_title}>
                  <span className={classes.sample_item_title_item_pre_title}>
                    {ldsp_wood.description[locale]}
                  </span>
                  <br />
                  {ldsp_wood.title}
                </div>
                <div className={classes.decor_sample}>
                  <Image src={`/images/decors/ldsp/${ldsp_wood.img}`} alt={ldsp_wood.title} fill />
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex mt-12 bg-zinc-100 p-6 rounded-lg"
            data-aos="fade-right"
            data-aos-duration="300"
          >
            <div className={classes.info_icon}>
              <RiInformationLine fontSize={24} />
            </div>
            <div className={classes.info_text}>{data.info}</div>
          </div>
        </div>
      )}
    </div>
  );
}
