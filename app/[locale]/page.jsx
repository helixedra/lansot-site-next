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


// export async function generateStaticParams({ params }) {
//   const { locale } = await params;
//   const res = await fetch(`${process.env.API_ENDPOINT}/homepage/homepage?populate=*&locale=${locale}`)
//   const homepageContent = await res.json()
 
//   return {
//     props: {
//       homepageContent,
//     },
//   }
// }

export default async function HomePage({ params }) {
  const { locale } = await params;
  // const homepageContent = pages.homepage[locale];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage?populate=*&locale=${locale}`)
  const homepageContent = await res.json()


  const homeSlider = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/homepage?populate[HomeSlider][populate]=*&locale=${locale}`)
  const homeSliderData = await homeSlider.json()
  // const sliderImages = getSliderImages(locale);

  const introText = homepageContent.data.Intro;
  const service = homepageContent.data.Service;

  // console.log(homeSlider)

  return (
    <>
      <div className="max-w-[var(--maxwidth-container)] mx-auto px-4 md:px-4 sm:px-0 animate_moveUp">
        <ResponsiveCarousel
          slides={homeSliderData.data.HomeSlider}
          delay={6500}
          locale={locale}
        />
      </div>

      <IntroText>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {introText.Title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed lg:leading-relaxed">
          {introText.Content}
        </p>
      </IntroText>

      <CollectionsSlider locale={locale} />
      <ServiceSection content={service} locale={locale} />
      <TopProductsSlider locale={locale} />
      <ArticlesSection articles={articles} locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}

