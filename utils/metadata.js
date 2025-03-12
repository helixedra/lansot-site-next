export async function MetaData({ locale, meta, pathname }) {
  const baseUrl = process.env.NEXT_PUBLIC_HOST;

  return {
    title: meta.title,
    description: meta.description,

    openGraph: {
      title: meta.title,
      description: meta.description,
    },

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        uk: `${baseUrl}/uk/${pathname}`,
        en: `${baseUrl}/en/${pathname}`,
        "x-default": `${baseUrl}/uk/${pathname}`,
      },
    },
  };
}
