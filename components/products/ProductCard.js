import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, locale, index }) {
  return (
    <div className="mb-12 text-center" key={product.url}>
      <Link
        href={`/${locale}/products/${product.category}/${product.url}`}
        title={product.name}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.url}/${product.cover}`}
          alt={`${product.sub[locale]} - ${product.name}`}
          title={`${product.sub[locale]} - ${product.name}`}
          width={640}
          height={600}
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
          quality={75}
        />
        <div className="-mt-4 text-sm text-zinc-500 relative">{product.sub[locale]}</div>
        <div className="font-medium text-xl relative">{product.name}</div>
      </Link>
    </div>
  );
}

