import ResponsiveCarousel from "@/components/homepage/ResponsiveCarousel";
import classes from "./homepage.module.css";
import pages from "@/app/data/pages.json";
import IntroText from "@/components/homepage/IntroText";
import CollectionsSlider from "@/components/homepage/CollectionsSlider";
import ServiceSection from "@/components/homepage/ServiceSection";
import TopProductsSlider from "@/components/homepage/TopProductsSlider";
import ArticlesSection from "@/components/homepage/ArticlesSection";
import ContactSection from "@/components/homepage/ContactSection";
import articles from "@/app/data/articles.json";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.homepage[locale];

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
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,

    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
    },
    ...links,
  };
}
export default async function HomePage({ params }) {
  const { locale } = await params;

  const sliderImages = [
    {
      img: "/images/home_slider_img_12.jpg",
      alt: { uk: "Комод Folio DH від Lansot", en: "Drawer Folio DH by Lansot" },
    },
    {
      img: "/images/home_slider_img_8.jpg",
      alt: { uk: "Стіл Frank в інтер'єрі кухні", en: "Frank table in the kitchen interior" },
    },
    {
      img: "/images/home_slider_img_9.jpg",
      alt: {
        uk: "Тумба Leon в інтер'єрі вітальні",
        en: "Leon cabinet in the living room interior",
      },
    },
  ];

  return (
    <>
      <div data-aos="fade-up" data-aos-duration="500" className={`${classes.image_slider}`}>
        <ResponsiveCarousel images={sliderImages} delay={6500} locale={locale} />
      </div>

      <IntroText data-aos="fade-down" data-aos-duration="500">
        <h1 className={classes.title}>{pages.homepage[locale].herotext.title}</h1>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed lg:leading-relaxed mt-6">
          {pages.homepage[locale].herotext.content}
        </p>
      </IntroText>

      <CollectionsSlider data-aos="fade-up" data-aos-duration="500" locale={locale} />

      <ServiceSection
        content={pages.homepage[locale].service}
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
