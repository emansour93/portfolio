import BeforeAfterSlider from "../components/BeforeAfterSlider";
import project1Before from "../assets/images/before1.jpg";
import project1After from "../assets/images/after1.jpg";
import project2Before from "../assets/images/before2.jpg";
import project2After from "../assets/images/after2.jpg";
import project3Before from "../assets/images/before3.jpg";
import project3After from "../assets/images/after3.jpg";

export default function Projects() {
  const projects = [
    {
      title: "Downtown Office Complex",
      category: "Commercial",
      before: project1Before,
      after: project1After,
    },
    {
      title: "Luxury Residential Tower",
      category: "Residential",
      before: project2Before,
      after: project2After,
    },
    {
      title: "Industrial Logistics Hub",
      category: "Industrial",
      before: project3Before,
      after: project3After,
    },
  ];

  return (
    <main className="main-top-margin">
      <section className="projects-section py-5">
        <div className="container-fluid px-lg-5">
          <div className="projects-header">
            <h1>Our Projects</h1>
            <p>
              A selection of projects that reflect our commitment to quality,
              craftsmanship, and performance.
            </p>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => (
            <div className="project-card" key={i}>
              {p.before && p.after ? (
                <BeforeAfterSlider before={p.before} after={p.after} />
              ) : (
                <img src={p.image} alt={p.title} />
              )}

              <div className="project-overlay always-visible">
                <div>
                  <h3>{p.title}</h3>
                  <span>{p.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
