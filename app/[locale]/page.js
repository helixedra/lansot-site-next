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

  const links = {
    metadataBase: new URL("https://lansot.com"),
    alternates: {
      canonical: "/",
      languages: {
        uk: "/uk",
        en: "/en",
      },
    },
  };

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,

    openGraph: {
      title: content.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
    },
    ...links,
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
      <div data-aos="fade-up" data-aos-duration="500" className={`${classes.image_slider}`}>
        <ResponsiveCarousel images={sliderImages} delay={6500} />
      </div>

      <IntroText data-aos="fade-down" data-aos-duration="500">
        <h1 className={classes.title}>{data.homepage[locale].herotext.title}</h1>
        <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed">
          {data.homepage[locale].herotext.content}
        </p>
      </IntroText>

      <CollectionsSlider data-aos="fade-up" data-aos-duration="500" />

      <ServiceSection
        content={data.homepage[locale].service}
        locale={locale}
        data-aos="fade-up"
        data-aos-duration="500"
      />
      <TopProductsSlider data-aos="fade-up" data-aos-duration="500" locale={locale} />
      <ArticlesSection
        data-aos="zoom-out"
        data-aos-duration="500"
        articles={articles}
        locale={locale}
      />
      <ContactSection locale={locale} />
    </>
  );
}
