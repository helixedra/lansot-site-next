import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const lang = (await cookies()).get("locale");

  return (
    <html lang={lang.value}>
      <body>{children}</body>
      
    </html>
  );
}
