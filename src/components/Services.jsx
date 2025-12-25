import { useEffect, useState } from "react";
import api from "../api";
import "./Services.css";

export default function Services() {
  const [markets, setMarkets] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // use your env variable

  useEffect(() => {
    api
      .get("/services") // public endpoint for services
      .then((res) => setMarkets(res.data))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  return (
    <section className="services-markets py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-subtitle">Construction Markets</h6>
          <h2 className="section-title">Our Core Markets</h2>
          <p className="section-desc">
            Our team has experience across a wide range of construction sectors.
          </p>
        </div>

        <div className="row g-4">
          {markets.map((m, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              <div className="market-card">
                {m.image && (
                  <img src={`${API_BASE}/uploads/${m.image}`} alt={m.title} />
                )}
                <div className="overlay">
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
