import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// (Tuỳ chọn) nếu bạn muốn dùng file css riêng cho nút auth:
// import "./Header.css";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="./image/logo.png"
            alt="Logo CLB"
            width="50"
            height="30"
            className="d-inline-block align-top me-2"
          />
          NextStar League
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/news">Tin tức</Nav.Link>
            <Nav.Link as={Link} to="/contact">Liên hệ</Nav.Link>
          </Nav>

          {/* Buttons bên phải - cùng style như Login */}
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to="/register"
              variant="outline-warning"
              className="btn-auth"
            >
              Register
            </Button>
            <Button
              as={Link}
              to="/login"
              variant="outline-warning"
              className="btn-auth"
            >
              Login
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
