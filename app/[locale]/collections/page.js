import collections from "@/app/data/collections.json";
import ui from "@/app/data/ui.json";
import Link from "next/link";

export default async function CollectionsPage({ params }) {
  const { locale } = await params;
  return (
    <div>
      {collections.map((collection) => (
        <div key={collection.id}>
          <Link href={`/collections/${collection.url}`} key={collection.id}>
            <h1>{collection.name[locale]}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
