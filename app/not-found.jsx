import Link from "next/link";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import pages from "@/app/data/pages.json";
import "@/app/styles/global.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});
export default async function NotFound() {
  const lang = (await cookies()).get("locale");
  const content = await pages.not_found[lang.value];

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
