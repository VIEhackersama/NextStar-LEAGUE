import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, logout } from "../services/auth";
import "../styles/header.css";

export default function Header() {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [auth, setAuth] = useState(getAuth());
  const isAdminLike =
    !!auth &&
    (
      auth?.user?.isAdmin === true ||                                     // nếu BE trả về isAdmin
      auth?.user?.email === "admin@example.com" ||                        // fallback theo email
      (auth?.user?.username || "").toLowerCase() === "true admin"         // yêu cầu: tên = True Admin
    );
  useLayoutEffect(() => {
    const applyHeaderHeight = () => {
      const h = navRef.current?.offsetHeight || 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      document.body.style.paddingTop = `${h}px`;
      const appMain = document.getElementById("app-main");
      if (appMain) document.body.style.paddingTop = "";
      if (appMain) appMain.style.paddingTop = `${h}px`;
    };
    applyHeaderHeight();

    const ro = new ResizeObserver(applyHeaderHeight);
    if (navRef.current) ro.observe(navRef.current);
    window.addEventListener("load", applyHeaderHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", applyHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const evt = new Event("resize");
    window.dispatchEvent(evt);
  }, [pathname]);

  useEffect(() => {
    setAuth(getAuth());
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(null);
    navigate("/login");
  };

  return (
    <Navbar ref={navRef} className="custom-navbar" expand="lg" fixed="top" collapseOnSelect>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/home"
          className="brand dm-serif-text-regular text-white"
        >
          <img
            src="/image/logo.png"
            alt="NextStar League"
            width="46"
            height="32"
            className="d-inline-block align-top me-2"
          />
          NextStar League
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link>
            <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
            {isAdminLike && (
              <Nav.Link as={Link} to="/admin">Admin portal</Nav.Link>
            )}
            {isAdminLike && (
              <Nav.Link as={Link} to="/postadmin">Post admin</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto align-items-lg-center mt-2 mt-lg-0">
            {!auth ? (
              <>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-warning"
                  size="sm"
                  className="btn-auth me-2"
                >
                  Register
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="warning"
                  size="sm"
                  className="btn-auth"
                >
                  Login
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="warning"
                  size="sm"
                  id="dropdown-user"
                  className="btn-auth"
                >
                  Greeting, {auth.user.username}!
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
