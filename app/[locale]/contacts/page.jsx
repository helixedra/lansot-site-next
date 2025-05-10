import Image from "next/image";
import ContactSection from "@/components/homepage/ContactSection";
import PageHeader from "@/components/shared/PageHeader";
import { MetaData } from "@/utils/metadata";
import languages from "@/app/data/lang.json";

const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || "60");

export async function generateStaticParams() {
  return languages.lang.map((locale) => ({ locale }));
}


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/contacts?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);


  return MetaData({
    locale,
    meta: {
      title: `${content.meta.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: content.meta.description,
    },
    pathname: "contacts",
  });
}

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/pages/contacts?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  const tel = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contents/tel?locale=${locale}`, { next: { revalidate: REVALIDATE_SECONDS } }).then((res) => res.json()).then((res) => res[0]);

  const contacts = [
    { href: "viber://pa?chatURI=Lansot_com", icon: "viber.png", alt: "viber" },
    { href: "https://t.me/lansot_com", icon: "telegram.png", alt: "telegram" },
    {
      href: "https://www.messenger.com/t/lansotcom",
      icon: "messenger.png",
      alt: "messenger",
    },
    {
      href: "https://wa.me/380971122616",
      icon: "whatsapp.png",
      alt: "whatsapp",
    },
  ];

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <PageHeader title={data.title} subtitle={data.subtitle} />

        <div className="mt-8 lg:mt-24 animate_fadeIn">
          <ul>
            {data.content.map((section) => (
              <li
                key={section.id}
                className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
              >
                <div className="lg:w-1/2">
                  <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                    {section.title}
                  </h2>
                </div>
                <div className="lg:w-1/2 text-lg">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              </li>
            )).reverse()}
          </ul>
        </div>

        <div className="lg:flex justify-between gap-8 mt-8">
          {contacts.map(({ href, icon, alt }, index) => (
            <a
              key={index}
              className="flex items-center w-full bg-zinc-100 justify-center p-4 my-8 py-12 grayscale hover:grayscale-0"
              href={href}
              rel="nofollow"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${icon}`}
                alt={alt}
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>
      </div>
      <ContactSection locale={locale} contacts={tel} />
    </>
  );
}
