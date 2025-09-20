import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, logout } from "../services/auth";
import "../styles/header.css"; // <- thêm file CSS mới

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(getAuth());

  useEffect(() => {
    setAuth(getAuth());
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(null);
    navigate("/login");
  };

  return (
    <Navbar className="custom-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="dm-serif-text-regular text-white fs-3">
          <img
            src="http://localhost:3000/image/logo.png"
            alt="Logo CLB"
            width="50"
            height="35"
            className="d-inline-block align-top me-2 mx-1"
          />
          NextStar League
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar m-4">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>

          {/* Bên phải */}
          <div className="d-flex gap-2">
            {!auth ? (
              <>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-success"
                  size="sm"
                  className="btn-auth"
                >
                  Register
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="success"
                  size="sm"
                  className="btn-auth"
                >
                  Login
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="success"
                  size="sm"
                  id="dropdown-user"
                  className="btn-auth"
                >
                  Xin chào, {auth.user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
