import React from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

          
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Tìm kiếm..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Tìm</Button>
          </Form>

        
          <Button as={Link} to="/login" variant="outline-warning">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
