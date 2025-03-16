import { CartProvider } from "@/contexts/CartContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Montserrat } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollUp from "@/components/ScrollUp";
import "@/app/styles/global.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <>
      <div className={`${montserrat.variable} wrapper w-full`}>
        <LocaleProvider locale={locale}>
          <CartProvider>
            <Header locale={locale} />
            <main className="main overflow-hidden mt-[80px]">{children}</main>
            <ScrollUp />
          </CartProvider>
        </LocaleProvider>
      </div>
      <Footer locale={locale} />
    </>
  );
}
