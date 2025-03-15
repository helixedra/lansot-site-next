import { cookies } from "next/headers";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

export default async function RootLayout({ children }) {
  const lang = (await cookies()).get("locale");

  return (
    <html lang={lang.value} data-tag-assistant-present="" data-tag-assistant-prod-present="">
      <GoogleTagManager gtmId="GTM-M7SMSVT" />
      <body>
        {children}
      </body>
      <GoogleAnalytics gaId="G-NMMCL5Q87S" />
    </html>
  );
}
