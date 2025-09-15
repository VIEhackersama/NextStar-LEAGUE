import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeSlash, ShieldLock } from "react-bootstrap-icons";
import { register } from "../services/auth";
import "../styles/auth.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  // password strength
  const pwdScore = useMemo(() => {
    let score = 0;
    if (form.password.length >= 8) score++;
    if (/[A-Z]/.test(form.password)) score++;
    if (/[a-z]/.test(form.password)) score++;
    if (/\d/.test(form.password)) score++;
    if (/[^A-Za-z0-9]/.test(form.password)) score++;
    return score; // 0..5
  }, [form.password]);

  const pwdLabel = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"][pwdScore];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    const f = e.currentTarget;
    const passwordsMatch = form.password === form.password2;

    if (!f.checkValidity() || !passwordsMatch) {
      e.stopPropagation();
      setValidated(true);
      if (!passwordsMatch) setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setOk("Account created successfully! Redirecting to sign in…");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="auth-card shadow-xl border-0 rounded-4 fade-in">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Create account</h2>
                  <p className="text-muted mb-0">Join the NextStar League community</p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {ok && <div className="alert alert-success py-2">{ok}</div>}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your full name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
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
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPwd ? "text" : "password"}
                        name="password"
                        placeholder="At least 8 characters; mix upper, lower, number, symbol"
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

                    <div className="mt-2 d-flex align-items-center gap-2">
                      <ShieldLock />
                      <div className="flex-grow-1">
                        <ProgressBar
                          now={(pwdScore / 5) * 100}
                          className={`pwd-meter score-${pwdScore}`}
                          aria-label="Password strength"
                        />
                        <small className="text-muted">Strength: {pwdLabel}</small>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPwd2 ? "text" : "password"}
                        name="password2"
                        placeholder="Re-enter your password"
                        minLength={8}
                        value={form.password2}
                        onChange={handleChange}
                        isInvalid={validated && form.password !== form.password2}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPwd2((s) => !s)}
                        aria-label={showPwd2 ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPwd2 ? <EyeSlash /> : <Eye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="agree">
                    <Form.Check
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      label={
                        <>
                          I agree to the <a href="#!">Terms</a> &{" "}
                          <a href="#!">Privacy Policy</a>.
                        </>
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      You must agree before creating an account.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="outline-warning"
                      className="btn-auth"
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-4 mb-0">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterPage;
