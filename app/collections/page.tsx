"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

type Collection = {
  id: number;
  name: string;
  subtitle: string;
  slug: string;
  hero: string;
};

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/collections")
      .then((r) => r.json())
      .then((d) => setCollections(d.collections ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-20">Loading…</p>;

  return (
    <main className="relative w-full bg-white">
      <Nav />

      <div className="flex flex-col">
        {collections.map((collection, index) => (
          <section
            key={collection.id}
            className={`relative w-full h-[60vh] md:h-[80vh] flex items-center overflow-hidden ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={collection.hero}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l" />
            </div>

            {/* Text + Button */}
            <div className="mt-10 relative z-10 flex-1 flex flex-col items-center md:items-start justify-center px-6 md:px-24 text-center md:text-left">
              <h2 className="text-2xl md:text-5xl font-light tracking-widest text-white">
                {collection.name}
              </h2>
              {collection?.subtitle && (
                <h6 className="text-sm md:text-lg font-light tracking-[0.4em] text-white uppercase">
                  {collection.subtitle}
                </h6>
              )}

              <Link href={`/collections/${collection.slug}`}>
                <button className="mt-6 px-4 py-2 md:px-6 md:py-2 border border-white text-white text-sm md:text-base font-medium hover:bg-white hover:text-black transition">
                  Discover the Collection
                </button>
              </Link>
            </div>
          </section>
        ))}
      </div>

      {!loading && collections.length === 0 && (
        <p className="text-center py-32 text-gray-400">No collections yet.</p>
      )}

      <Footer />
    </main>
  );
}
