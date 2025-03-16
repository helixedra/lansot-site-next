import Image from "next/image";
import pages from "@/app/data/pages.json";
import ContactSection from "@/components/homepage/ContactSection";
import { MetaData } from "@/utils/metadata";
import PageHeader from "@/components/shared/PageHeader";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = pages.contacts[locale];
  const meta = {
    title: content.meta.title + ` - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.meta.description,
  };
  return MetaData({ locale, meta, pathname: "contacts" });
}

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const data = await pages.contacts[locale];

  const contacts = [
    {
      href: "viber://pa?chatURI=Lansot_com",
      icon: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/viber.png`,
      alt: "viber",
    },
    {
      href: "https://t.me/lansot_com",
      icon: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/telegram.png`,
      alt: "telegram",
    },
    {
      href: "https://www.messenger.com/t/lansotcom",
      icon: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/messenger.png`,
      alt: "messenger",
    },
    {
      href: "https://wa.me/380971122616",
      icon: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/whatsapp.png`,
      alt: "whatsapp",
    },
  ];
  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <PageHeader title={data.title} subtitle={data.subtitle} />

        <div className="mt-8 lg:mt-24 animate_fadeIn">
          <ul>
            <li className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8">
              <div className="lg:w-1/2">
                <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                  {data.info.office.title}
                </h2>
              </div>
              <div className="lg:w-1/2 text-lg">
                <div>{data.info.office.content}</div>
                <div>{data.info.phone}</div>
                <div>{data.info.email}</div>
                <div className="mt-8 ">{data.info.schedule.title}</div>
                <div>{data.info.schedule.content}</div>
              </div>
            </li>
            <li className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8">
              <div className="lg:w-1/2">
                <h2 className="uppercase max-w-[500px] mt-[-1rem] mb-16">
                  {data.info.production.title}
                </h2>
              </div>
              <div className="lg:w-1/2 text-lg">
                <div>
                  <div>{data.info.production.content}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:flex justify-between gap-8 mt-8">
          {contacts.map((contact, index) => (
            <a
              key={index}
              className="flex items-center w-full bg-zinc-100 justify-center p-4 my-8 py-12 grayscale hover:grayscale-0"
              href={contact.href}
              rel="nofollow"
            >
              <Image
                src={contact.icon}
                alt={contact.alt}
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>
      </div>
      <ContactSection locale={locale} />
    </>
  );
}
