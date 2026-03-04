"use client";
import { useEffect, useState } from "react"; // ← removed duplicate import
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

type CollectionImage = { id: number; src: string; altText: string };
type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  hero: string;
  images: CollectionImage[];
};

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/collections")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.collections ?? []).find(
          (c: Collection) => c.slug === slug,
        );
        if (found) setCollection(found);
        else setNotFound(true);
      });
  }, [slug]);

  if (notFound)
    return <p className="text-center mt-20">Collection not found.</p>;
  if (!collection) return <p className="text-center mt-20">Loading…</p>;

  return (
    <main className="relative w-full bg-white">
      <Nav />

      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        {/* Use <img> for local uploads to avoid next/image domain config */}
        <img
          src={collection.hero}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-24 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-widest">
            {collection.name}
          </h1>
          <p className="mt-4 text-white/90 max-w-xl">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <section className="px-6 md:px-24 py-16 space-y-12">
        <h2 className="text-3xl font-light tracking-widest">
          Explore the collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collection.images.map((img, idx) => (
            <div
              key={img.id}
              className="relative w-full h-64 cursor-pointer group overflow-hidden rounded-md"
              onClick={() => setZoomedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.altText || `${collection.name} ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {collection.images.length === 0 && (
          <p className="text-gray-400">No images in this collection yet.</p>
        )}
      </section>

      <Footer />

      {/* Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}
    </main>
  );
}
