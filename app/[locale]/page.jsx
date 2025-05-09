import ResponsiveCarousel from "@/components/homepage/ResponsiveCarousel";
import IntroText from "@/components/homepage/IntroText";
import CollectionsSlider from "@/components/homepage/CollectionsSlider";
import ServiceSection from "@/components/homepage/ServiceSection";
import TopProductsSlider from "@/components/homepage/TopProductsSlider";
import ArticlesSection from "@/components/homepage/ArticlesSection";
import ContactSection from "@/components/homepage/ContactSection";
import articles from "@/app/data/articles.json";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

const SLUG = "homepage";
const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const content = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/${SLUG}?locale=${locale}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  ).then((res) => res.json()).then((res) => res[0]);

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

  const [homepageSlider, intro, service] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/galleries/home-slider?locale=${locale}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    }).then((res) => res.json()).then((res) => res[0]),
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contents/intro?locale=${locale}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    }).then((res) => res.json()).then((res) => res[0]),
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contents/intro?locale=${locale}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    }).then((res) => res.json()).then((res) => res[0]),
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contents/service?locale=${locale}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    }).then((res) => res.json()).then((res) => res[0]),
  ]);

  return (
    <>
      <div className="max-w-[var(--maxwidth-container)] mx-auto px-4 md:px-4 sm:px-0 animate_moveUp">
        <ResponsiveCarousel slides={homepageSlider} delay={6500} locale={locale} />
      </div>

      <IntroText>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">{intro.title}</h1>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed lg:leading-relaxed">
          {intro.content}
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
