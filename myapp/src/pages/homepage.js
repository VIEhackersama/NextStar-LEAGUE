import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Abouthero from "../components/homehero";
import "../styles/home.css";

/* ---------- news ticker demo ---------- */
const demoNews = [
  "Breaking: Star winger signs new 5-year deal 🔏",
  "Matchweek Preview: Five storylines to watch 👀",
  "Injury update: Key midfielder returns to training 💪",
  "Tactical trends: High press is back in fashion 📈",
  "Young talent watchlist: Who's next? 🌟",
];

/* ---------- subcomponents ---------- */
function NewsTicker({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="news-ticker">
      <div className="ticker-label">News</div>
      <div className="ticker-track">
        <div className="ticker-inner">
          {items.concat(items).map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      type="button"
    >
      ↑
    </button>
  );
}

/* ======================== MAIN PAGE ======================== */
export default function Homepage() {
  return (
    <motion.div
      className="homepage-bg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* News ticker */}
      <NewsTicker items={demoNews} />

      {/* Hero */}
      <Abouthero />

      {/* === Transfer Snapshot (thống kê nhanh) === */}
      <Container className="py-4">
        <Row className="g-3">
          {[
            { k: "rumours", label: "Tin đồn", value: 128 },
            { k: "done",    label: "Hoàn tất", value: 34 },
            { k: "fee",     label: "Tổng phí hôm nay", value: "$412M" },
            { k: "top",     label: "Top fee", value: "$95M" },
          ].map((m, i) => (
            <Col key={m.k} xs={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: .35 }}
              >
                <Card className={`snap-card tone-${m.k}`}>
                  <Card.Body>
                    <div className="snap-label">{m.label}</div>
                    <div className="snap-value">{m.value}</div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* === Hot Transfers (minh hoạ 4 thương vụ) === */}
      <Container className="py-2">
        <div className="section-head">
          <h3 className="mb-0">🔥 Hot Transfers</h3>
          <span className="badge-soft">Minh hoạ</span>
        </div>
        <Row className="g-4">
          {[
            { id: 1, name: "V. Gyökeres → Arsenal", fee: "$95M", status: "Talks advanced", img: "/image/image1231312312.png" },
            { id: 2, name: "Osimhen → Chelsea",     fee: "$120M", status: "Rumour",         img: "/image/image11224411.png" },
            { id: 3, name: "De Ligt → Man Utd",     fee: "$70M",  status: "Medical booked", img: "/image/image123666.png" },
            { id: 4, name: "Yamal → (Stay)",        fee: "N/A",   status: "New contract",   img: "/image/image6666.png" },
          ].map((t, i) => (
            <Col key={t.id} md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: .4 }}
              >
                <Card className="tf-card h-100">
                  <div className="tf-thumb">
                    <img src={t.img} alt={t.name} onError={(e)=>{e.currentTarget.style.display='none';}} />
                    <span className="tf-fee">{t.fee}</span>
                  </div>
                  <Card.Body>
                    <Card.Title className="tf-title">{t.name}</Card.Title>
                    <div className="text-secondary small">{t.status}</div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* === Rumour Meter (độ tin cậy tin đồn) === */}
      <Container className="py-2">
        <div className="section-head">
          <h3 className="mb-0">🧪 Rumour Meter</h3>
          <span className="badge-soft">Minh hoạ</span>
        </div>
        <Row className="g-3">
          {[
            { id: 11, title: "Kvaratskhelia → PSG", reliability: 72, source: "L'Equipe" },
            { id: 12, title: "Bruno F. → Barcelona", reliability: 41, source: "Catalan Media" },
            { id: 13, title: "Rashford → Bayern", reliability: 58, source: "Kicker" },
            { id: 14, title: "Sancho → Juventus", reliability: 80, source: "Many outlets" },
          ].map((r, i) => (
            <Col key={r.id} md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: .35 }}
              >
                <Card className="rm-card h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div className="rm-title">{r.title}</div>
                      <span className="rm-badge">{r.reliability}%</span>
                    </div>
                    <div className="small text-secondary mb-2">Nguồn: {r.source}</div>
                    <div className="rm-bar">
                      <div className="rm-bar-fill" style={{ width: `${r.reliability}%` }} />
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Banner carousel */}
      <h1 className="text-center">Nothing is unnoticable!</h1>
      <div className="container">
        <Carousel fade interval={2600}>
          <Carousel.Item>
            <img className="d-block w-100" src="/image/image91923.jpg" alt="Premier League" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/image/background.avif" alt="Clubs" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Members */}
      <Container fluid className="py-5">
        <h2 className="text-center mb-5 fw-bold">👥 Our Team Members</h2>
        {[
          {
            id: 1,
            name: "Le Nhat Huy",
            role: "Leader",
            img: "/image/huy.jpg",
            fb: "https://facebook.com/lenhathuy",
            ig: "https://instagram.com/lenhathuy",
            tw: "https://twitter.com/lenhathuy",
            desc: "Responsible for managing the project, assigning tasks, and ensuring the team meets deadlines.",
          },
          {
            id: 2,
            name: "Nguyen Minh Ha",
            role: "Frontend Developer",
            img: "/image/minhha.jpg",
            fb: "https://facebook.com/nguyenminhha",
            ig: "https://instagram.com/nguyenminhha",
            tw: "https://twitter.com/nguyenminhha",
            desc: "Focused on building user interfaces, creating responsive layouts, and handling client-side logic.",
          },
          {
            id: 3,
            name: "Pham Hai Dong",
            role: "Backend Developer",
            img: "/image/dongpham.jpg",
            fb: "https://facebook.com/phamhai.dong",
            ig: "https://instagram.com/phamhai.dong",
            tw: "https://twitter.com/phamhai.dong",
            desc: "Works on server-side logic, database management, and building secure APIs for the system.",
          },
        ].map((m, i) => (
          <Row key={m.id} className="justify-content-center mb-4">
            <Col md={10}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
              >
                <Card className="member-card shadow-lg d-flex flex-row align-items-center p-3 w-100">
                  <div style={{ flex: "0 0 150px" }}>
                    <Card.Img
                      src={m.img}
                      alt={m.name}
                      style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 14 }}
                      loading="lazy"
                    />
                  </div>
                  <Card.Body className="ms-4">
                    <Card.Title className="fs-4 fw-bold">{m.name}</Card.Title>
                    <Card.Text className="role-text">{m.role}</Card.Text>
                    <Card.Text className="desc-text">{m.desc}</Card.Text>

                    {/* Icons */}
                    <div className="d-flex gap-3">
                      <a
                        href={m.fb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon fb"
                        aria-label="Facebook"
                        title="Facebook"
                      >
                        <FaFacebook size={20} />
                      </a>
                      <a
                        href={m.ig}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon ig"
                        aria-label="Instagram"
                        title="Instagram"
                      >
                        <FaInstagram size={20} />
                      </a>
                      <a
                        href={m.tw}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon tw"
                        aria-label="Twitter/X"
                        title="Twitter/X"
                      >
                        <FaTwitter size={20} />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        ))}
      </Container>

      {/* Newsletter */}
      <Container className="pb-5">
        <Card className="newsletter-card">
          <Card.Body className="d-flex flex-column flex-lg-row align-items-center gap-3">
            <div className="flex-grow">
              <h4 className="mb-1">Get weekly updates</h4>
              <p className="mb-0 text-secondary">
                Match previews, tactics, transfer whispers — straight to your inbox.
              </p>
            </div>
            <Form className="newsletter-form">
              <Form.Control type="email" placeholder="you@example.com" required />
              <Button type="submit" variant="outline-warning" className="btn-auth">Subscribe</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* Back to top */}
      <BackToTop />
    </motion.div>
  );
}
