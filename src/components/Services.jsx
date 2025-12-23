import "./Services.css";
import commercial from "../assets/services/commercial.jpg";
import residential from "../assets/services/residential.jpg";
import exteriorRestoration from "../assets/services/Apartments-faded-exterior-paint.webp";

export default function Services() {
  const markets = [
    {
      title: "Commercial",
      desc: "Office buildings, retail spaces, and mixed-use developments",
      image: commercial,
    },
    {
      title: "Residential",
      desc: "High-end homes and multi-family projects",
      image: residential,
    },
    {
      title: "Exterior Restoration & Waterproofing",
      desc: "Restoring building exteriors and preventing water intrusion through reliable, long-lasting solutions",
      image: exteriorRestoration,
    },
  ];
  return (
    <section className="services-markets py-5">
      {" "}
      <div className="container">
        {" "}
        <div className="text-center mb-5">
          {" "}
          <h6 className="section-subtitle">Construction Markets</h6>{" "}
          <h2 className="section-title">Our Core Markets</h2>{" "}
          <p className="section-desc">
            {" "}
            Our team has experience across a wide range of construction sectors.{" "}
          </p>{" "}
        </div>{" "}
        <div className="row g-4">
          {" "}
          {markets.map((m, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              {" "}
              <div className="market-card">
                {" "}
                <img src={m.image} alt={m.title} />{" "}
                <div className="overlay">
                  {" "}
                  <h3>{m.title}</h3> <p>{m.desc}</p>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
