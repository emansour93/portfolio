import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";

export default function Projects() {
  const projects = [
    {
      title: "Downtown Office Complex",
      category: "Commercial",
      image: project1,
    },
    {
      title: "Luxury Residential Tower",
      category: "Residential",
      image: project2,
    },
    {
      title: "Industrial Logistics Hub",
      category: "Industrial",
      image: project3,
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
              <img src={p.image} alt={p.title} />
              <div className="project-overlay">
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
