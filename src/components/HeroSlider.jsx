import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import slide1 from "../assets/images/building.png";
import slide2 from "../assets/images/building.png";
import slide3 from "../assets/images/building.png";

export default function HeroSlider() {
  const slides = [
    {
      image: slide1,
      title: "Professional Development",
      subtitle: "High-quality Construction  solutions",
      cta: "/projects",
    },
    {
      image: slide2,
      title: "Innovative Solutions",
      subtitle: "Building trust with quality",
      cta: "/services",
    },
    {
      image: slide3,
      title: "Reliable Expertise",
      subtitle: "Projects done right",
      cta: "/contact",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a href={slide.cta} className="btn btn-primary">
                Learn More
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
