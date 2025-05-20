import { CartProvider } from "@/contexts/CartContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollUp from "@/components/ScrollUp";
import ClientHeaderEffect from "@/components/ClientHeaderEffect";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <>
      <LocaleProvider locale={locale}>
        <CartProvider>
          <Header locale={locale} />
          <ClientHeaderEffect />
          <main className="main overflow-hidden mt-[80px]">{children}</main>
          <ScrollUp />
        </CartProvider>
      </LocaleProvider>
      <Footer locale={locale} />
    </>
  );
}
