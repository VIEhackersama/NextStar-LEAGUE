import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer-bg text-light pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          
          <Col md={4} className="text-center text-md-start">
            <h5 className="d-flex align-items-center gap-2">
              <img
                src="/image/logo.png"
                alt="Club Logo"
                width="60"
                height="40"
                className="rounded shadow-sm"
              />
              <span className="fw-bold">NextStar League</span>
            </h5>
            <p className="text-light mt-2 small fst-italic">
              ⚽ Pride & Passion – Connecting Football Fans!
            </p>
          </Col>

        
          <Col md={4} className="text-left">
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <Nav className="flex-column gap-2">
              <Nav.Link as={Link} to="/" className="footer-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/clubs" className="footer-link">Clubs</Nav.Link>
              <Nav.Link as={Link} to="/stars" className="footer-link">Stars</Nav.Link>
              <Nav.Link as={Link} to="/news" className="footer-link">News</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="footer-link">Contact</Nav.Link>
            </Nav>
          </Col>

          
          <Col md={4} className="text-center text-md-end">
            <h6 className="fw-bold mb-3 text-uppercase">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                <Facebook size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                <Twitter size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                <Instagram size={30} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon">
                <Youtube size={30} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-light opacity-25" />

        <Row>
          <Col className="text-center">
            <small className="text-light">
              © {new Date().getFullYear()} NextStar League. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
