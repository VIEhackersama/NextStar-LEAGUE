import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, logout } from "../services/auth";
import "../styles/header.css";

/**
 * Header cố định trên cùng:
 * - Đo chiều cao thực tế và set CSS variable --header-h.
 * - Đẩy phần nội dung xuống bằng cách set padding-top cho body (fallback),
 *   và cho phần #app-main nếu có (tốt nhất).
 */
export default function Header() {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [auth, setAuth] = useState(getAuth());

  // đo chiều cao header và set biến toàn cục
  useLayoutEffect(() => {
    const applyHeaderHeight = () => {
      const h = navRef.current?.offsetHeight || 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      // Fallback đẩy nội dung nếu bạn chưa bọc nội dung trong #app-main
      document.body.style.paddingTop = `${h}px`;
      // Nếu có container chính, ưu tiên đẩy nó
      const appMain = document.getElementById("app-main");
      if (appMain) document.body.style.paddingTop = ""; // bỏ fallback
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

  // Khi đổi route, header có thể đổi chiều cao (collapse), đo lại
  useEffect(() => {
    const evt = new Event("resize");
    window.dispatchEvent(evt);
  }, [pathname]);

  useEffect(() => { setAuth(getAuth()); }, []);

  const handleLogout = () => {
    logout();
    setAuth(null);
    navigate("/login");
  };

  return (
    <Navbar ref={navRef} className="custom-navbar" expand="lg" fixed="top">
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

        {/* LƯU Ý: id phải KHÔNG có dấu cách */}
        <Navbar.Collapse id="main-navbar" className="mt-2 mt-lg-0">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            {!auth ? (
              <>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-warning"
                  size="sm"
                  className="btn-auth"
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
