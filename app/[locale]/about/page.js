import Image from "next/image";
import classes from "./page.module.css";
import page from "@/app/data/pages.json";
import PageTitle from "@/components/shared/PageTitle";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = await page.about[locale];

  return (
    <>
      <PageTitle title={data.title} image={"sc-3_12_1s.jpg"} alt={""} />
      <div className={classes.about_text} dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </>
  );
}
