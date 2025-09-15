import React, { useMemo, useState } from "react";
import {
  Container, Row, Col, Card, Form, Button, InputGroup, ProgressBar
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Envelope, Key, Eye, EyeSlash, ShieldLock } from "react-bootstrap-icons";
import { startPasswordReset, completePasswordReset } from "../services/auth";
import "../styles/auth.css";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  // steps: 1 = request code by email, 2 = enter code + new password
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  // form states
  const [email, setEmail] = useState("");
  const [serverCode, setServerCode] = useState(null); // demo only (so user can see the code)
  const [code, setCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const pwdScore = useMemo(() => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  }, [pwd]);
  const pwdLabel = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"][pwdScore];

  const onRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    const f = e.currentTarget;

    if (!f.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      const res = await startPasswordReset(email);
      setServerCode(res.code); // demo: show code if the account exists
      setOk(
        res.code
          ? "We emailed you a reset code. (Demo: code shown below)"
          : "If the email exists, a reset code has been sent."
      );
      setStep(2);
    } catch (err) {
      setError(err.message || "Unable to start reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    const f = e.currentTarget;

    const match = pwd === pwd2;
    if (!f.checkValidity() || !match) {
      e.stopPropagation();
      setValidated(true);
      if (!match) setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await completePasswordReset({ email, code, newPassword: pwd });
      setOk("Password updated! You can sign in now.");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(err.message || "Reset failed. Please try again.");
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
                  <h2 className="fw-bold mb-1">Forgot password</h2>
                  <p className="text-muted mb-0">
                    {step === 1 ? "We'll send a 6-digit code to your email." : "Enter the code and set a new password."}
                  </p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {ok && <div className="alert alert-success py-2">{ok}</div>}

                {step === 1 && (
                  <Form noValidate validated={validated} onSubmit={onRequestCode}>
                    <Form.Group className="mb-3" controlId="resetEmail">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><Envelope /></InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid email address.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="outline-warning"
                        className="btn-auth"
                        disabled={loading}
                      >
                        {loading ? "Sending code..." : "Send reset code"}
                      </Button>
                    </div>

                    <p className="text-center mt-4 mb-0">
                      Remembered your password? <Link to="/login">Back to sign in</Link>
                    </p>
                  </Form>
                )}

                {step === 2 && (
                  <Form noValidate validated={validated} onSubmit={onReset}>
                    {/* DEMO helper: show generated code if available */}
                    {serverCode && (
                      <div className="alert alert-info py-2">
                        Demo code: <strong>{serverCode}</strong> (expires in 10 minutes)
                      </div>
                    )}

                    <Form.Group className="mb-3" controlId="resetCode">
                      <Form.Label>Verification code</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><Key /></InputGroup.Text>
                        <Form.Control
                          type="text"
                          pattern="^\d{6}$"
                          inputMode="numeric"
                          placeholder="6-digit code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="code-input"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Enter the 6-digit code we sent you.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>New password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPwd ? "text" : "password"}
                          placeholder="At least 8 characters; mix upper/lower/number/symbol"
                          minLength={8}
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
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

                    <Form.Group className="mb-4" controlId="newPassword2">
                      <Form.Label>Confirm new password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPwd2 ? "text" : "password"}
                          placeholder="Re-enter your new password"
                          minLength={8}
                          value={pwd2}
                          onChange={(e) => setPwd2(e.target.value)}
                          isInvalid={validated && pwd !== pwd2}
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

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="outline-warning"
                        className="btn-auth"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update password"}
                      </Button>
                    </div>

                    <p className="text-center mt-4 mb-0">
                      Back to <Link to="/login">sign in</Link>
                    </p>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;
