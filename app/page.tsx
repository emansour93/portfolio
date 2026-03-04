"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const [heroImages, setHeroImages] = useState<
    { src: string; altText: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setHeroImages(data.heroImages ?? []))
      .catch((err) => console.error("Failed to fetch hero images:", err));
  }, []);

  return (
    <main className="relative h-screen w-full">
      <Nav />
      <HeroSlider
        images={heroImages.map((img) => img.src)}
        altText="Couture dress by Jean Pierre Khoury"
      />
      <Footer />
    </main>
  );
}
