import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import  "../styles/footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
         
          <Col md={4} className="mb-3">
            <h5>
              <img
                src="./image/logo.png" 
                alt="CLB Logo"
                width="60"
                height="40"
                className="mb-3"
              />
              NextStar League
            </h5>
            <p className="text-muted">Niềm tự hào của người hâm mộ!</p>
          </Col>

          
          <Col md={4} className="mb-3">
            <h6>Liên kết nhanh</h6>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-light">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/team" className="text-light">Đội hình</Nav.Link>
              <Nav.Link as={Link} to="/matches" className="text-light">Lịch thi đấu</Nav.Link>
              <Nav.Link as={Link} to="/news" className="text-light">Tin tức</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-light">Liên hệ</Nav.Link>
            </Nav>
          </Col>

          
          <Col md={4} className="mb-3 text-md-end text-center">
            <p className="mb-0">
              © {new Date().getFullYear()} CLB Bóng Đá. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;