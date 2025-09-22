import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { login } from "../services/auth"; // <- demo auth service
import "../styles/auth.css"; // <- glassmorphism styles

function LoginPage() {
  const navigate = useNavigate();

  // UI states
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  // Update form state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formEl = e.currentTarget;

    // Bootstrap validation
    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      await login({
        email: form.email,
        password: form.password,
        remember: form.remember,
      });
      // Success → go home (or wherever you want)
      const auth = JSON.parse(
        localStorage.getItem("ns_auth") || sessionStorage.getItem("ns_auth") || "null"
      );
      if (auth?.user?.email === "admin@example.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="auth-card shadow-xl border-0 rounded-4 fade-in">
              <Card.Body className="p-md-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Sign in</h2>
                  <p className="text-muted mb-0">Welcome back to NextStar League</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                {/* Form */}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPwd ? "text" : "password"}
                        name="password"
                        placeholder="Your password"
                        minLength={8}
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPwd((s) => !s)}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPwd ? <EyeSlash /> : <Eye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 8 characters.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      label="Remember me"
                    />
                    {/* <Link to="/forgot-password">Forgot password?</Link> */}
                  </div>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="outline-warning"
                      className="btn-auth"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </Form>

                {/* Footer */}
                <p className="text-center mt-4 mb-0">
                  Don’t have an account? <Link to="/register">Create one</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
