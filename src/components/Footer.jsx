import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import logo from "../assets/logos/logo-white-footer.png";

export default function Footer() {
  return (
    <footer className="footer text-light pt-5 pb-3">
      <Container>
        <Row className="gy-4 align-items-start">
          {/* Logo + About */}
          <Col md={3}>
            <img
              src={logo}
              alt="RGM Development"
              className="footer-logo mb-3"
            />
          </Col>

          {/* Links */}
          <Col md={3}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="footer-link">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h5 className="mb-3">Contact</h5>
            <p className="mb-1">📍 Shalimar, Florida 32579, USA</p>
            <p className="mb-1">📞 +1 (850) 374-2784</p>
            <p className="mb-0">✉ info@rgmdevelopment.com</p>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Social Media</h5>

            {/* Social Media */}
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/profile.php?id=61585087227851"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/rgmdevelopment/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <div className="text-center text-muted small">
          © {new Date().getFullYear()} RGM Development. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
