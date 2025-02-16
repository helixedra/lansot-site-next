import Header from "@/components/header/Header";
import "./global.css";
import { CartProvider } from "@/contexts/CartContext";
import Footer from "@/components/footer/Footer";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <div className="wrapper">
        <CartProvider>
          <Header locale={locale} />
          <main className="main">{children}</main>
        </CartProvider>
      </div>
      <Footer />
    </>
  );
}
