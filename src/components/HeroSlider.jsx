import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../api";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    api.get("/hero-slides/admin").then((res) => setSlides(res.data));
  }, []);

  const enableLoop = slides.length > 1;
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={enableLoop}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="hero-slide"
            style={{
              backgroundImage: `url(${API_BASE}/uploads/${slide.image})`,
            }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              {slide.button1_text && (
                <a href={slide.button1_link} className="btn btn-primary">
                  {slide.button1_text}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
