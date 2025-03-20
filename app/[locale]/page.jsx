import ResponsiveCarousel from "@/components/homepage/ResponsiveCarousel";
import pages from "@/app/data/pages.json";
import IntroText from "@/components/homepage/IntroText";
import CollectionsSlider from "@/components/homepage/CollectionsSlider";
import ServiceSection from "@/components/homepage/ServiceSection";
import TopProductsSlider from "@/components/homepage/TopProductsSlider";
import ArticlesSection from "@/components/homepage/ArticlesSection";
import ContactSection from "@/components/homepage/ContactSection";
import articles from "@/app/data/articles.json";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const content = pages.homepage[locale];
  const meta = {
    title: content.meta.title,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "" });
}

export async function generateStaticParams() {
  return languages.lang.map((locale) => ({
    locale,
  }));
}

export default function HomePage({ params }) {
  const { locale } = params;
  const homepageContent = pages.homepage[locale];
  const sliderImages = getSliderImages(locale);

  return (
    <>
      <div className="max-w-[var(--maxwidth-container)] mx-auto px-4 md:px-4 sm:px-0 animate_moveUp">
        <ResponsiveCarousel
          images={sliderImages}
          delay={6500}
          locale={locale}
        />
      </div>

      <IntroText>
        <h1 className="text-4xl font-medium">
          {homepageContent.herotext.title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed lg:leading-relaxed mt-6">
          {homepageContent.herotext.content}
        </p>
      </IntroText>

      <CollectionsSlider locale={locale} />
      <ServiceSection content={homepageContent.service} locale={locale} />
      <TopProductsSlider locale={locale} />
      <ArticlesSection articles={articles} locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}

function getSliderImages(locale) {
  return [
    {
      img: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_12.jpg`,
      alt:
        locale === "uk"
          ? "Комод Folio DH від Lansot"
          : "Drawer Folio DH by Lansot",
    },
    {
      img: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_8.jpg`,
      alt:
        locale === "uk"
          ? "Стіл Frank в інтер'єрі кухні"
          : "Frank table in the kitchen interior",
    },
    {
      img: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_9.jpg`,
      alt:
        locale === "uk"
          ? "Тумба Leon в інтер'єрі вітальні"
          : "Leon cabinet in the living room interior",
    },
  ];
}
