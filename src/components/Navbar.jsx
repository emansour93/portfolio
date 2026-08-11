import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logos/logo-white-s.png";

export default function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Close menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const navbarClass = isHome
    ? scrolled
      ? "bg-blue shadow"
      : "bg-transparent1"
    : "bg-blue shadow";

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      expanded={expanded}
      className={navbarClass}
      variant="light"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="menu-logo" alt="RGM Development" />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              onClick={() => setExpanded(false)}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/services"
              onClick={() => setExpanded(false)}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/projects"
              onClick={() => setExpanded(false)}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              onClick={() => setExpanded(false)}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link>
              License:
              <br /> CGC1541558
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
