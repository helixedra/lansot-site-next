import Image from "next/image";
import page from "@/app/data/pages.json";
import ContactSection from "@/components/homepage/ContactSection";

export default async function ContactsPage({ params }) {
  const { locale, slug } = await params;

  console.log(slug);

  // const data = await page.contacts[locale];

  return (
    <>
      <div className="max-w-[1600px] mx-auto mb-12 px-6 lg:px-12">collection page</div>
    </>
  );
}
