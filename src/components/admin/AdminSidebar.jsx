import { NavLink } from "react-router-dom";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburger}>
        ☰
      </button>

      <div
        style={{
          ...styles.sidebar,
          left: isOpen ? "0" : "-220px",
        }}
      >
        <h2 style={styles.logo}>RGM CMS</h2>

        <NavLink
          to="/dashboard"
          style={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/hero"
          style={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Hero Slides
        </NavLink>
        <NavLink
          to="/admin/servicesManager"
          style={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Services
        </NavLink>
        <NavLink
          to="/admin/ProjectsManager"
          style={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Projects
        </NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={styles.logout}
        >
          Logout
        </button>
      </div>

      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#0f172a",
    color: "#fff",
    padding: "50px 20px 20px 20px",
    position: "fixed",
    top: 0,
    left: 0,
    transition: "left 0.3s ease",
    zIndex: 1000,
  },
  logo: { marginBottom: "30px" },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    margin: "15px 0",
  },
  logout: {
    marginTop: "40px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  hamburger: {
    position: "fixed",
    top: "15px",
    left: "15px",
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "#ffffff",
    zIndex: 1100,
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 900,
  },
};
