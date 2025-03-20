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
  const { locale } = await params;
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

export default async function HomePage({ params }) {
  const { locale } = await params;
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
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
      alt: {
        uk: "Сучасний світло-сірий комодFolio із шістьма шухлядами в спальні, прикрашений лампою, вазами та картиною на тлі коричневої стіни",
        en: "Modern light gray chest of drawers Folio with six drawers in the bedroom, decorated with a lamp, vases and a painting against a brown wall",
      },
      title: {
        uk: "Купіть стильний світло-сірий комод для спальні – ідеальне рішення для елегантного зберігання речей",
        en: "Buy a stylish light gray chest of drawers for the bedroom - the perfect solution for elegant storage",
      },
    },
    {
      img: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_8.jpg`,
      alt: {
        uk: "Елегантний довгий стіл Frank із темного дерева в сучасній кухні, оточений стільцями, з декоративними предметами та стильною білою лампою.",
        en: "Elegant long Frank table made of dark wood in a modern kitchen, surrounded by chairs, with decorative items and a stylish white lamp.",
      },
      title: {
        uk: "Купіть сучасний довгий стіл із темного дерева для вашої їдальні – ідеальний вибір для стилю та комфорту",
        en: "Buy a modern dark wood dining table for your dining room - the perfect choice for style and comfort",
      },
    },
    {
      img: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/home_slider_img_9.jpg`,
      alt: {
        uk: "Стильна низька тумба Leon з темного матеріалу з рифленими скляними дверцятами в сучасному інтер’єрі, прикрашена лампою та декоративними предметами",
        en: "Stylish low Leon cabinet made of dark material with ribbed glass doors in a modern interior, decorated with a lamp and decorative items",
      },
      title: {
        uk: "Купіть сучасну низьку тумбу з темного матеріалу для вашої вітальні – ідеальне поєднання стилю та практичності",
        en: "Buy a modern low cabinet made of dark material for your living room - the perfect combination of style and practicality",
      },
    },
  ];
}
