import { cookies } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Montserrat } from "next/font/google";
import "@/app/styles/global.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export default async function RootLayout({ children }) {
  const lang = (await cookies()).get("locale");

  return (
    <html lang={lang?.value || "uk"}>
      <GoogleTagManager gtmId="GTM-M7SMSVT" />
      <body className={`${montserrat.variable} wrapper w-full`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-NMMCL5Q87S" />
    </html>
  );
}
