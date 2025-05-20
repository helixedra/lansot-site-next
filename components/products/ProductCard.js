import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, locale, index }) {
  return (
    <div className="mb-12 text-center" key={product.id}>
      <Link
        href={`/${locale}/products/${product.category.slug}/${product.slug}`}
        title={product.name}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/products/${product.slug}/${product.cover.path}`}
          alt={`${product.cover.imageMeta.alt}`}
          title={`${product.cover.imageMeta.title}`}
          width={640}
          height={600}
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
          quality={75}
        />
        <div className="-mt-4 text-sm text-zinc-500 relative">{product.type}</div>
        <div className="font-medium text-xl relative">{product.name}</div>
      </Link>
    </div>
  );
}

