import Header from '@/components/header/Header';
import './global.css';
import { CartProvider } from '@/contexts/CartContext';
import Footer from '@/components/footer/Footer';
import { LocaleProvider } from '@/contexts/LocaleContext';

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <div className="wrapper">
        <LocaleProvider locale={locale}>
          <CartProvider>
            <Header locale={locale} />
            <main className="main">{children}</main>
          </CartProvider>
        </LocaleProvider>
      </div>
      <Footer />
    </>
  );
}
