export async function MetaData({ locale, meta, pathname }) {
  const baseUrl = process.env.NEXT_PUBLIC_HOST;

  return {
    title: meta.title,
    description: meta.description,
    author: "Lansot",

    openGraph: {
      title: meta.title,
      description: meta.description,
    },

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: `${baseUrl}/${pathname ? `${locale}/${pathname}` : locale}`,
      languages: {
        uk: `${baseUrl}/${pathname ? `uk/${pathname}` : "uk"}`,
        en: `${baseUrl}/${pathname ? `en/${pathname}` : "en"}`,
        "x-default": `${baseUrl}/${pathname}`,
      },
    },
  };
}
