import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";

export default function FeaturedProjects() {
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
    <section className="featured-projects projects-section pt-5">
      <div className="container">
        <div className="projects-header text-center">
          <h2>Featured Projects</h2>
          <p>Selected work showcasing our expertise across markets.</p>
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
  );
}
