import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import teamsData from "../assets/data/Premier.json";
import "../styles/home.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* ---------- favorites helpers ---------- */
const FAVE_KEY = "ns_faves";
const loadFaves = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVE_KEY) || "[]");
  } catch {
    return [];
  }
};
const saveFaves = (ids) => localStorage.setItem(FAVE_KEY, JSON.stringify(ids));

/* ---------- demo fixtures (nhiều trận) ---------- */
const demoFixtures = [
  { id: 1, homeId: 1, awayId: 2, time: "2025-09-20T19:00:00Z" },
  { id: 2, homeId: 3, awayId: 4, time: "2025-09-21T13:30:00Z" },
  { id: 3, homeId: 5, awayId: 6, time: "2025-09-22T16:30:00Z" },
  { id: 4, homeId: 7, awayId: 8, time: "2025-09-23T18:45:00Z" },
  { id: 5, homeId: 9, awayId: 10, time: "2025-09-24T14:00:00Z" },
  { id: 6, homeId: 11, awayId: 12, time: "2025-09-25T19:00:00Z" },
  { id: 7, homeId: 13, awayId: 14, time: "2025-09-26T13:30:00Z" },
  { id: 8, homeId: 15, awayId: 16, time: "2025-09-27T16:30:00Z" },
  { id: 9, homeId: 17, awayId: 18, time: "2025-09-28T18:45:00Z" },
  { id: 10, homeId: 19, awayId: 20, time: "2025-09-29T14:00:00Z" },
  { id: 11, homeId: 2, awayId: 5, time: "2025-10-01T19:00:00Z" },
  { id: 12, homeId: 8, awayId: 11, time: "2025-10-03T17:30:00Z" },
];

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
            <span className="ticker-item" key={i}>
              {t}
            </span>
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


function CompareOffcanvas({ show, onHide, teams }) {
  const [aId, setAId] = useState("");
  const [bId, setBId] = useState("");

  useEffect(() => {
    if (show && teams.length) {
      setAId(String(teams[0].id));
      setBId(String(teams[1]?.id || teams[0].id));
    }
  }, [show, teams]);

  const byId = useMemo(() => {
    const m = new Map();
    teams.forEach((t) => m.set(String(t.id), t));
    return m;
  }, [teams]);

  const A = byId.get(aId);
  const B = byId.get(bId);
  const age = (y) => (Number.isFinite(y) ? new Date().getFullYear() - y : "-");

  return (
    
    <Offcanvas show={show} onHide={onHide} placement="end" className="compare-offcanvas">
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>Compare clubs</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form className="mb-3">
          <Row className="g-2">
            <Col xs={12} md={6}>
              <Form.Label>Club A</Form.Label>
              <Form.Select value={aId} onChange={(e) => setAId(e.target.value)}>
                {teams.map((t) => (
                  <option value={t.id} key={`a-${t.id}`}>{t.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label>Club B</Form.Label>
              <Form.Select value={bId} onChange={(e) => setBId(e.target.value)}>
                {teams.map((t) => (
                  <option value={t.id} key={`b-${t.id}`}>{t.name}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {A && B && (
          <Row className="g-3">
            {[A, B].map((T) => (
              <Col md={6} key={T.id}>
                <Card className="compare-card h-100">
                  <div className="compare-logo-wrap">
                    <img src={T.image} alt={T.name} />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-1">{T.name}</Card.Title>
                    <div className="cmp-line"><span>Country:</span><strong>{T.country || "-"}</strong></div>
                    <div className="cmp-line"><span>Stadium:</span><strong>{T.stadium || "-"}</strong></div>
                    <div className="cmp-line"><span>Founded:</span><strong>{T.founded || "-"}</strong></div>
                    <div className="cmp-line"><span>Club age:</span><strong>{age(T.founded)} yrs</strong></div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function FixturesStrip({ fixtures, byId }) {
  // SỬA: scroller là fixtures-scroll, không phải track
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const fmt = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });

  // cập nhật trạng thái mũi tên
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 0);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // chạy lại sau render để chắc chắn (ảnh/logo load xong)
    const raf = requestAnimationFrame(update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const slide = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!fixtures.length) return null;

  return (
    <div className="fixtures-strip">
      <div className="fixtures-title">Upcoming fixtures</div>

      <button
        type="button"
        className={`arrow-btn left ${canLeft ? "" : "disabled"}`}
        onClick={() => slide(-1)}
        aria-label="Scroll left"
        disabled={!canLeft}
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        className={`arrow-btn right ${canRight ? "" : "disabled"}`}
        onClick={() => slide(1)}
        aria-label="Scroll right"
        disabled={!canRight}
      >
        <FaChevronRight />
      </button>

      <div className="fixtures-scroll" ref={scrollerRef}>
        <div className="fixtures-track">
          {fixtures.map((fx) => {
            const H = byId.get(String(fx.homeId));
            const A = byId.get(String(fx.awayId));
            return (
              <div className="fixture-card" key={fx.id} title={`${H?.name} vs ${A?.name}`}>
                <div className="fixture-team">
                  <img src={H?.image} alt={H?.name} />
                  <span>{H?.name || "Home"}</span>
                </div>
                <div className="fixture-vs">VS</div>
                <div className="fixture-team">
                  <img src={A?.image} alt={A?.name} />
                  <span>{A?.name || "Away"}</span>
                </div>
                <div className="fixture-meta">{fmt(fx.time)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ======================== MAIN PAGE ======================== */
function Homepage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [sortBy, setSortBy] = useState("name"); // name | foundedAsc | foundedDesc
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [faves, setFaves] = useState(loadFaves());
  const [showCompare, setShowCompare] = useState(false);

  const teams = teamsData.premier_league_teams || [];

  const byId = useMemo(() => {
    const m = new Map();
    teams.forEach((t) => m.set(String(t.id), t));
    return m;
  }, [teams]);

  const countries = useMemo(() => {
    const set = new Set(teams.map((t) => t.country).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [teams]);

  const filteredTeams = useMemo(() => {
    let list = teams.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    if (country !== "All") list = list.filter((t) => t.country === country);
    if (favoritesOnly) list = list.filter((t) => faves.includes(t.id));

    switch (sortBy) {
      case "foundedAsc":
        list.sort((a, b) => (a.founded || 0) - (b.founded || 0));
        break;
      case "foundedDesc":
        list.sort((a, b) => (b.founded || 0) - (a.founded || 0));
        break;
      default:
        list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [teams, search, country, sortBy, favoritesOnly, faves]);

  const stats = useMemo(() => {
    const total = teams.length;
    const cset = new Set(teams.map((t) => t.country));
    const years = teams.map((t) => t.founded).filter((y) => Number.isFinite(y));
    const avg = years.length
      ? Math.round(years.reduce((s, y) => s + y, 0) / years.length)
      : "-";
    return { total, countries: cset.size, avgFounded: avg };
  }, [teams]);

  // spotlight auto-rotate
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  useEffect(() => {
    setSpotlightIndex(0);
    if (!filteredTeams.length) return;
    const id = setInterval(
      () => setSpotlightIndex((i) => (i + 1) % Math.min(filteredTeams.length, 12)),
      5000
    );
    return () => clearInterval(id);
  }, [filteredTeams]);
  const spotlight = filteredTeams[spotlightIndex] || teams[0];

  // toggle favorite
  const toggleFav = (id) => {
    setFaves((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveFaves(next);
      return next;
    });
  };

  return (
    <motion.div
      className="homepage-bg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* 0) News ticker */}
      <NewsTicker items={demoNews} />

      {/* 1) Hero / Carousel */}
      <Carousel fade interval={2600}>
        <Carousel.Item>
          <img className="d-block w-100" src="/image/new3.webp" alt="Premier League" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/image/background.avif" alt="Clubs" />
        </Carousel.Item>
      </Carousel>

      {/* 2) Spotlight */}
      {spotlight && (
        <Container className="py-4">
          <motion.div
            className="spotlight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Row className="g-3 align-items-center">
              <Col md={3}>
                <img src={spotlight.image} alt={spotlight.name} className="spotlight-logo" loading="lazy" />
              </Col>
              <Col md={9}>
                <h3 className="mb-1">{spotlight.name}</h3>
                <p className="mb-2 spotlight-meta">
                  <Badge bg="" className="badge-soft">🏟 {spotlight.stadium}</Badge>
                  <Badge bg="" className="badge-soft ms-2">📅 {spotlight.founded}</Badge>
                  <Badge bg="" className="badge-soft ms-2">🌍 {spotlight.country}</Badge>
                </p>
                <Button as={Link} to={`/team/${spotlight.id}`} variant="outline-warning" className="btn-auth">
                  View club
                </Button>
              </Col>
            </Row>
          </motion.div>
        </Container>
      )}

      {/* 3) Fixtures strip */}
      <Container className="pb-3">
        <FixturesStrip fixtures={demoFixtures} byId={byId} />
      </Container>

      {/* 4) Filters + stats + compare */}
      <Container className="pt-2 pb-4">
        <Row className="g-3 align-items-end filter-bar">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Search for a club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow search-bar"
            />
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
              {countries.map((c) => (
                <option value={c} key={c}>{c}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort: Name (A→Z)</option>
              <option value="foundedAsc">Sort: Founded (oldest)</option>
              <option value="foundedDesc">Sort: Founded (newest)</option>
            </Form.Select>
          </Col>

          <Col xs={12} className="d-flex flex-wrap gap-2 stats-wrap">
            <div className="stat-pill">Teams: <strong>{stats.total}</strong></div>
            <div className="stat-pill">Countries: <strong>{stats.countries}</strong></div>
            <div className="stat-pill">Avg founded: <strong>{stats.avgFounded}</strong></div>
            <Form.Check
              type="switch"
              id="fav-switch"
              label="Favorites only"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
            />
            <Button variant="outline-warning" className="btn-auth ms-auto" onClick={() => setShowCompare(true)}>
              Compare clubs
            </Button>
          </Col>
        </Row>
      </Container>

      {/* 5) Club grid */}
      <Container className="pb-5">
        <Row className="g-4">
          {filteredTeams.map((club, index) => {
            const fav = faves.includes(club.id);
            return (
              <Col md={4} lg={3} key={club.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.04 * index, duration: 0.4 }}
                >
                  <Card className="club-card h-100">
                    <div className="club-logo-wrap">
                      <Card.Img variant="top" src={club.image} alt={club.name} className="club-logo" loading="lazy" />
                      <button
                        className={`fav-btn ${fav ? "is-fav" : ""}`}
                        onClick={(e) => { e.preventDefault(); toggleFav(club.id); }}
                        aria-label={fav ? "Remove favorite" : "Add favorite"}
                        title={fav ? "Remove favorite" : "Add favorite"}
                        type="button"
                      >
                        {fav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                      </button>
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="club-title">{club.name}</Card.Title>
                      <Card.Text className="club-info">
                        <span className="chip">🏟 {club.stadium}</span>
                        <span className="chip">📅 {club.founded}</span>
                        <span className="chip">🌍 {club.country}</span>
                      </Card.Text>
                      <Button as={Link} to={`/team/${club.id}`} size="sm" variant="outline-warning" className="btn-auth">
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* 6) Members */}
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
                    <div className="d-flex gap-3">
                      <a href={m.fb} target="_blank" rel="noopener noreferrer" className="social-icon fb" aria-label="Facebook"><FaFacebook size={20} /></a>
                      <a href={m.ig} target="_blank" rel="noopener noreferrer" className="social-icon ig" aria-label="Instagram"><FaInstagram size={20} /></a>
                      <a href={m.tw} target="_blank" rel="noopener noreferrer" className="social-icon tw" aria-label="Twitter"><FaTwitter size={20} /></a>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        ))}
      </Container>

      {/* 7) Newsletter CTA */}
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

      {/* Compare Offcanvas */}
      <CompareOffcanvas show={showCompare} onHide={() => setShowCompare(false)} teams={teams} />

      {/* Back to top */}
      <BackToTop />
    </motion.div>
  );
}

export default Homepage;