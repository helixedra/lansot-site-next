import { AOSInit } from "@/components/AOSInit";
export default async function RootLayout({ params, children }) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
