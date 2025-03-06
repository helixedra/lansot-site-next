import { AOSInit } from "@/components/AOSInit";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  // const { locale } = await params;
  const lang = (await cookies()).get("locale");

  return (
    <html lang={lang.value}>
      <body>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
