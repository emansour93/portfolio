// WhyChooseUs.jsx
import { FaCheckCircle, FaUsers, FaAward } from "react-icons/fa";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <FaUsers size={30} />,
      title: "Relationships",
      desc: "We believe strong relationships are the foundation of every successful project. Trust, respect, and  clear communication come first.",
    },
    {
      icon: <FaAward size={30} />,
      title: "Gratitude",
      desc: "Respect appreciation for clients and crews",
    },
    {
      icon: <FaCheckCircle size={30} />,
      title: "Mindset",
      desc: "Ownership, responsibility, and pride  in  our work",
    },
  ];

  return (
    <section className="why-choose-us py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Core Values</h2>
        <div className="row g-4">
          {points.map((p, idx) => (
            <div className="col-md-4 text-center" key={idx}>
              <div className="mb-3">{p.icon}</div>
              <h5>{p.title}</h5>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
