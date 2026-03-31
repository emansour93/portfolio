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
  subtitle: string;
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
  const images = collection.images;

  const close = () => setActiveIndex(null);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );
  };
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
          {collection?.subtitle && (
            <h6 className="text-sm md:text-lg font-light  text-white uppercase">
              {collection.subtitle}
            </h6>
          )}
        </div>
      </div>

      {/* Gallery */}
      <section className="px-6 md:px-24 py-16 space-y-12">
        <h2 className="text-3xl mb-2 font-light tracking-widest">
          Explore the collection
        </h2>
        <div dangerouslySetInnerHTML={{ __html: collection.description }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collection.images.map((img, idx) => (
            <div
              key={img.id}
              className="relative w-full h-64 cursor-pointer group overflow-hidden rounded-md"
              onClick={() => setActiveIndex(idx)}
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
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={close}
        >
          {/* Image */}
          <img
            src={images[activeIndex].src}
            alt="Zoomed"
            className="max-h-full max-w-full object-contain"
          />

          {/* Prev Button */}
          <button
            onClick={prev}
            className="absolute left-6 text-white text-3xl px-4 py-2"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute right-6 text-white text-3xl px-4 py-2"
          >
            ›
          </button>

          {/* Close hint (optional) */}
          <div className="absolute bottom-6 text-white/60 text-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </main>
  );
}
