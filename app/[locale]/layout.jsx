import { CartProvider } from "@/contexts/CartContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollUp from "@/components/ScrollUp";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <>
      <LocaleProvider locale={locale}>
        <CartProvider>
          <Header locale={locale} />
          <main className="main overflow-hidden mt-[80px]">{children}</main>
          <ScrollUp />
        </CartProvider>
      </LocaleProvider>
      <Footer locale={locale} />
    </>
  );
}
