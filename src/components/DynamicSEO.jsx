import { useEffect, useState } from "react";
import { Title, Meta } from "react-head";
import { getSEO } from "../api";

export default function DynamicSEO({ slug }) {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchSEO = async () => {
      try {
        // Try fetching SEO for the page
        const res = await getSEO(slug);
        setSeo(res.data);
      } catch (err) {
        console.warn(`SEO for "${slug}" not found, using default`);

        try {
          // Fallback to default SEO
          const res = await getSEO("all");
          setSeo(res.data);
        } catch {
          console.error("Default SEO not found");
        }
      }
    };

    fetchSEO();
  }, [slug]);

  if (!seo) return null;

  return (
    <>
      <Title>{seo.meta_title}</Title>
      <Meta name="description" content={seo.meta_description} />
      <Meta name="keywords" content={seo.meta_keywords} />
      <Meta property="og:title" content={seo.og_title || seo.meta_title} />
      <Meta
        property="og:description"
        content={seo.og_description || seo.meta_description}
      />
      <Meta property="og:image" content={seo.og_image} />
    </>
  );
}
