import Link from "next/link";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import "@/app/styles/global.css";
import { MetaData } from "@/utils/metadata";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

const page = {
  "not_found": {
    "uk": {
      "title": "Сторінку не знайдено",
      "content": "Вибачте, але сторінка, яку ви шукаєте, не існує або була видалена.",
      "back": "Повернутися на головну"
    },
    "en": {
      "title": "Page not found",
      "content": "Sorry, the page you are looking for does not exist or has been deleted.",
      "back": "Back to home"
    }
  }
}

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = (await cookieStore.get("locale")?.value) || "uk";
  const content = page.not_found[lang];
  const meta = {
    title: `404 - ${content.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: content.content,
  };
  return MetaData({ locale: lang, meta, pathname: "" });
}

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = (await cookieStore.get("locale")?.value) || "uk";
  const content = page.not_found[lang];

  return (
    <div
      className={`${montserrat.variable} min-h-screen flex items-center justify-center bg-zinc-100`}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div>
          <Image
            src="/images/lansot-logo.svg"
            alt="lansot logo"
            className="w-60 mb-12 opacity-15"
            width={240}
            height={140}
          />
        </div>
        <h1 className="text-4xl font-bold text-zinc-700">404</h1>
        <p className="text-xl text-zinc-600">{content.title}</p>
        <p className="text-sm mt-2 text-zinc-500">{content.content}</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-black hover:bg-zinc-800 text-white font-semibold transition-colors duration-200 shadow-sm"
        >
          {content.back}
        </Link>
      </div>
    </div>
  );
}
