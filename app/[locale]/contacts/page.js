import Image from "next/image";
import page from "@/app/data/pages.json";
import ContactSection from "@/components/homepage/ContactSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const content = page.contacts[locale];

  return {
    title: content.meta.title + " - Lansot",
    description: content.meta.description,
    keywords: content.meta.keywords,

    openGraph: {
      title: content.meta.title + " - Lansot",
      description: content.meta.description,
      keywords: content.meta.keywords,
    },
  };
}

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const data = await page.contacts[locale];

  const contacts = [
    { href: "viber://pa?chatURI=Lansot_com", icon: "/images/viber.png", alt: "viber" },
    { href: "https://t.me/lansot_com", icon: "/images/telegram.png", alt: "telegram" },
    {
      href: "https://www.messenger.com/t/lansotcom",
      icon: "/images/messenger.png",
      alt: "messenger",
    },
    { href: "https://wa.me/380971122616", icon: "/images/whatsapp.png", alt: "whatsapp" },
  ];
  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">
        <div data-aos="fade-up" data-aos-duration="300" className="PageHeader py-8 lg:py-24">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">{data.title}</div>
          <h1 className="PageHeader__title max-w-[920px]">{data.subtitle}</h1>
        </div>

        <div className="mt-8 lg:mt-24">
          <ul>
            <li
              data-aos="zoom-out"
              data-aos-duration="300"
              className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
            >
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
            <li
              data-aos="zoom-out"
              data-aos-duration="300"
              className="flex flex-col lg:flex-row gap-4 border-t border-black pb-32 pt-8"
            >
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
              <Image src={contact.icon} alt={contact.alt} width={32} height={32} />
            </a>
          ))}
        </div>
      </div>
      <ContactSection />
    </>
  );
}
