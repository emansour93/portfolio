export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Expert Development Partner</h1>
        <p>Delivering trusted and high‑quality development solutions.</p>
        <div>
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/services" className="btn btn-outline-light">Our Services</Link>
        </div>
      </div>
    </section>
  );
}