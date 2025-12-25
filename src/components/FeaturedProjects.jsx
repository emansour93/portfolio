import { useEffect, useState } from "react";
import api from "../api";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    api
      .get("/projects/featured")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to load featured projects:", err));
  }, []);

  return (
    <main className="main-margin">
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
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              {p.before_image && p.after_image ? (
                <BeforeAfterSlider
                  before={`${API_BASE}/uploads/${p.before_image}`}
                  after={`${API_BASE}/uploads/${p.after_image}`}
                />
              ) : (
                <img
                  src={
                    p.before_image
                      ? `${API_BASE}/uploads/${p.before_image}`
                      : p.after_image
                      ? `${API_BASE}/uploads/${p.after_image}`
                      : ""
                  }
                  alt={p.title}
                />
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
