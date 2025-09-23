import React from "react";
import { Container, Row, Col, Nav, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ns-footer">
      {/* TOP */}
      <Container className="py-4 py-lg-5">
        <Row className="gy-4">
          {/* Brand + tagline + socials */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src="/image/logo.png"
                alt="NextStar League"
                width="56"
                height="40"
                className="rounded shadow-sm"
              />
              <h5 className="m-0 brand-title">NextStar League</h5>
            </div>

            <p className="tagline mb-3">
              ⚽ Pride & Passion — Connecting football fans worldwide.
            </p>

            <div className="ns-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <Twitter size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={22} />
              </a>
            </div>
          </Col>

          {/* Links (2 cột) */}
          <Col lg={4} md={6}>
            <h6 className="ns-h6">Quick Links</h6>
            <Row xs={2} className="g-2">
              <Col>
                <Nav className="flex-column ns-links">
                  <Nav.Link as={Link} to="/home">Home</Nav.Link>
                  <Nav.Link as={Link} to="/stars">Stars</Nav.Link>
                  <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
                </Nav>
              </Col>
              <Col>
                <Nav className="flex-column ns-links">
                  <Nav.Link as={Link} to="/news">News</Nav.Link>
                  <Nav.Link as={Link} to="/players">Players</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>

          {/* Newsletter */}
          <Col lg={4}>
            <h6 className="ns-h6">Weekly newsletter</h6>
            <p className="text-muted small mb-2">
              Tactics, fixtures & transfer whispers — straight to your inbox.
            </p>
            <Form onSubmit={(e) => e.preventDefault()}>
              <InputGroup className="ns-input">
                <Form.Control type="email" placeholder="you@example.com" aria-label="Email" required />
                <Button variant="warning" className="fw-bold">Subscribe</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* BOTTOM BAR */}
      <div className="ns-bottom">
        <Container className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2">
          <small className="text-muted">© {year} NextStar League. All rights reserved.</small>
          <div className="ns-bottom-links">
            <Link to="/news">News</Link>
            <span>•</span>
            <Link to="/contact">Contact</Link>
            <span>•</span>
            <Link to="/home">Home</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
