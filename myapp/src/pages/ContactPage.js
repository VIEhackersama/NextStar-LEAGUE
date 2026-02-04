import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Accordion,
  Badge,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,

} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../styles/contact.css";

function ContactPage() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    topic: "General inquiry",
    club: "",
    message: "",
    consent: false,
    subscribe: true,
  });

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    setErr("");

    const f = e.currentTarget;
    if (!f.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      const all = JSON.parse(localStorage.getItem("ns_contact_msgs") || "[]");
      all.push({ id: Date.now(), ...form });
      localStorage.setItem("ns_contact_msgs", JSON.stringify(all));

      setOk("Thanks! Your message has been sent. We’ll reply within 24–48h.");
      setForm({
        fullName: "",
        email: "",
        topic: "General inquiry",
        club: "",
        message: "",
        consent: false,
        subscribe: true,
      });
      setValidated(false);
    } catch (e2) {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Hero */}
      <section className="contact-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="hero-title">Get in touch</h1>
              <p className="hero-sub">
                Have a question about <strong>NextStar League</strong>, a
                partnership idea, or found a bug? We’d love to hear from you.
              </p>
              <div className="hero-meta">
                <Badge bg="" className="soft-pill">Average reply: &nbsp;<strong>24–48h</strong></Badge>
                <Badge bg="" className="soft-pill ms-2"><FiClock /> &nbsp;Mon–Fri, 9:00–18:00</Badge>
              </div>
            </Col>
          </Row>
        </Container>
        <img className="hero-bg" src="/image/background.avif" alt="" />
        <div className="hero-overlay" />
      </section>

      <Container className="py-5">
        <Row className="g-4">
          {/* Left: form */}
          <Col xl={7} lg={7}>
            <Card className="contact-card">
              <Card.Body className="p-4 p-md-5">
                <div className="section-title">
                  <span className="dot" />
                  <h3 className="mb-0">Send us a message</h3>
                </div>

                {ok && (
                  <div className="alert alert-success d-flex align-items-center mt-3">
                    <FiCheckCircle className="me-2" />
                    <div>{ok}</div>
                  </div>
                )}
                {err && <div className="alert alert-danger mt-3">{err}</div>}

                <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder="John Doe"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your full name.
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        A valid email is required.
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6}>
                      <Form.Label>Topic</Form.Label>
                      <Form.Select name="topic" value={form.topic} onChange={onChange} required>
                        <option>General inquiry</option>
                        <option>Partnerships / Sponsorship</option>
                        <option>Press & Media</option>
                        <option>Bug report</option>
                        <option>Feature request</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Club (optional)</Form.Label>
                      <Form.Control
                        name="club"
                        value={form.club}
                        onChange={onChange}
                        placeholder="e.g. Arsenal"
                      />
                    </Col>

                    <Col xs={12}>
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder="Tell us how we can help…"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please write a message.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs={12}>
                      <Form.Check
                        id="consent"
                        name="consent"
                        checked={form.consent}
                        onChange={onChange}
                        label={
                          <>
                            I agree to the <a href="#!">Terms</a> &{" "}
                            <a href="#!">Privacy Policy</a>.
                          </>
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please agree to continue.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs={12}>
                      <Form.Check
                        id="subscribe"
                        name="subscribe"
                        checked={form.subscribe}
                        onChange={onChange}
                        label="Subscribe me to weekly updates (optional)"
                      />
                    </Col>

                    <Col xs={12} className="d-grid mt-2">
                      <Button
                        type="submit"
                        variant="outline-warning"
                        className="btn-auth"
                        disabled={loading}
                      >
                        {loading ? "Sending…" : <>Send message <FiSend /></>}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* FAQ */}
            <Card className="contact-card mt-4">
              <Card.Body className="p-4 p-md-5">
                <div className="section-title">
                  <span className="dot" />
                  <h3 className="mb-0">FAQ</h3>
                </div>
                <Accordion defaultActiveKey="0" className="mt-3 faq">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>How fast do you respond?</Accordion.Header>
                    <Accordion.Body>
                      We usually reply within <strong>24–48 hours</strong> on weekdays (Mon–Fri).
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Do you accept partnership proposals?</Accordion.Header>
                    <Accordion.Body>
                      Yes! Choose <em>“Partnerships / Sponsorship”</em> in the topic field and add
                      a short pitch. We’ll get back if it’s a good fit.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Where can I report a bug?</Accordion.Header>
                    <Accordion.Body>
                      Pick <em>“Bug report”</em> and include steps to reproduce, browser, and screenshots if possible.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I request a new feature?</Accordion.Header>
                    <Accordion.Body>
                      Absolutely—select <em>“Feature request”</em> and tell us what you have in mind.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Do you have a newsletter?</Accordion.Header>
                    <Accordion.Body>
                      Yes. Tick <em>“Subscribe to weekly updates”</em> in the form to receive highlights and fixtures.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: info + map + social */}
          <Col xl={5} lg={5}>
            <Card className="contact-card">
              <Card.Body className="p-4 p-md-5">
                <div className="section-title">
                  <span className="dot" />
                  <h3 className="mb-0">Contact info</h3>
                </div>

                <div className="info-list mt-3">
                  <div className="info-item">
                    <div className="info-icon"><FiMail /></div>
                    <div>
                      <div className="info-label">Email</div>
                      <a href="mailto:support@nextstar.league">support@nextstar.league</a>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon"><FiPhone /></div>
                    <div>
                      <div className="info-label">Phone</div>
                      <span>+44 20 1234 5678</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon"><FiMapPin /></div>
                    <div>
                      <div className="info-label">Address</div>
                      <span>Wembley Park, London, UK</span>
                    </div>
                  </div>
                </div>

                <div className="socials mt-3">
                  <a className="social fb" href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                  <a className="social ig" href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                  <a className="social tw" href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                  <a className="social yt" href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
                </div>
              </Card.Body>
            </Card>

            <Card className="contact-card mt-4">
              <Card.Body className="p-0">
                <div className="map-wrap">
                  <iframe
                    title="Map"
                    src="https://www.google.com/maps?q=Wembley%20Stadium&z=12&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default ContactPage;

