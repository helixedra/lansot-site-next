import Image from "next/image";
import ResponsiveCarousel from "@/components/homepage/ResponsiveCarousel";
import classes from "./homepage.module.css";
import data from "@/app/data/pages.json";
import Link from "next/link";
import IntroText from "@/components/homepage/IntroText";
import ItemsSlider from "@/components/shared/ItemsSlider";
import CollectionsSlider from "@/components/homepage/CollectionsSlider";
import ServiceSection from "@/components/homepage/ServiceSection";
import TopProductsSlider from "@/components/homepage/TopProductsSlider";
import ArticlesSection from "@/components/homepage/ArticlesSection";
import ContactSection from "@/components/homepage/ContactSection";
import articles from "@/app/data/articles.json";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = data.homepage[locale];
  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
  };
}
export default async function HomePage({ params }) {
  const { locale } = await params;

  const sliderImages = [
    { img: "/images/home_slider_img_12.jpg", alt: "Комод Folio DH від Lansot" },
    { img: "/images/home_slider_img_8.jpg", alt: "" },
    { img: "/images/home_slider_img_9.jpg", alt: "" },
  ];

  return (
    <>
      <div className={classes.image_slider} data-aos="zoom-out" data-aos-duration="1000">
        <ResponsiveCarousel images={sliderImages} delay={6500} />
      </div>
      <IntroText title={data.homepage[locale].herotext.title} content={data.homepage[locale].herotext.content} />
      <CollectionsSlider />
      <ServiceSection content={data.homepage[locale].service} locale={locale} />
      <TopProductsSlider />
      <ArticlesSection articles={articles} locale={locale} />
      <ContactSection />
    </>
  );
}
