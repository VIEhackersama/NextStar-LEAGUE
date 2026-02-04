// src/pages/ClubsExplore.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Badge, Button, Offcanvas } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import teamsData from "../assets/data/Premier.json";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/clubs-explore.css";
import { getAuth } from "../services/auth";

const FAVE_KEY = "ns_faves";
const loadFaves = () => { try { return JSON.parse(localStorage.getItem(FAVE_KEY) || "[]"); } catch { return []; } };
const saveFaves = (ids) => localStorage.setItem(FAVE_KEY, JSON.stringify(ids));

const demoFixtures = [
  { id: 1, homeId: 1, awayId: 2, time: "2025-09-21T02:00:00Z" },
  { id: 2, homeId: 3, awayId: 6, time: "2025-09-21T13:30:00Z" },
  { id: 3, homeId: 9, awayId: 12, time: "2025-09-22T23:30:00Z" },
  { id: 4, homeId: 13, awayId: 16, time: "2025-09-24T01:45:00Z" },
];

function CompareOffcanvas({ show, onHide, teams }) {
  const [aId, setAId] = useState(""), [bId, setBId] = useState("");
  useEffect(() => { if (show && teams.length) { setAId(String(teams[0].id)); setBId(String(teams[1]?.id || teams[0].id)); } }, [show, teams]);
  const byId = useMemo(() => new Map(teams.map(t => [String(t.id), t])), [teams]);
  const A = byId.get(aId), B = byId.get(bId);
  const age = (y) => (Number.isFinite(y) ? new Date().getFullYear() - y : "-");
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="compare-offcanvas">
      <Offcanvas.Header closeButton closeVariant="white"><Offcanvas.Title>Compare clubs</Offcanvas.Title></Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="g-2 mb-3">
          <Col xs={12} md={6}><Form.Select value={aId} onChange={e => setAId(e.target.value)}>{teams.map(t => <option key={`a${t.id}`} value={t.id}>{t.name}</option>)}</Form.Select></Col>
          <Col xs={12} md={6}><Form.Select value={bId} onChange={e => setBId(e.target.value)}>{teams.map(t => <option key={`b${t.id}`} value={t.id}>{t.name}</option>)}</Form.Select></Col>
        </Row>
        {A && B && (
          <Row className="g-3">
            {[A, B].map(T => (
              <Col md={6} key={T.id}>
                <Card className="compare-card h-100">
                  <div className="compare-logo-wrap"><img src={T.image} alt={T.name} /></div>
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
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false), [canRight, setCanRight] = useState(true);
  const fmt = (iso) => new Date(iso).toLocaleString(undefined, { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    const update = () => { const { scrollLeft, scrollWidth, clientWidth } = el; setCanLeft(scrollLeft > 0); setCanRight(scrollLeft + clientWidth < scrollWidth - 2); };
    update(); el.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    const raf = requestAnimationFrame(update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); cancelAnimationFrame(raf); };
  }, []);
  const slide = (dir) => { const el = scrollerRef.current; if (!el) return; el.scrollBy({ left: Math.round(el.clientWidth * 0.9) * dir, behavior: "smooth" }); };
  if (!fixtures.length) return null;
  return (
    <div className="fixtures-strip">
      <div className="fixtures-title">Upcoming fixtures</div>
      <button type="button" className={`arrow-btn left ${canLeft ? "" : "disabled"}`} onClick={() => slide(-1)} disabled={!canLeft}><FaChevronLeft /></button>
      <button type="button" className={`arrow-btn right ${canRight ? "" : "disabled"}`} onClick={() => slide(1)} disabled={!canRight}><FaChevronRight /></button>
      <div className="fixtures-scroll" ref={scrollerRef}>
        <div className="fixtures-track">
          {fixtures.map(fx => {
            const H = byId.get(String(fx.homeId)); const A = byId.get(String(fx.awayId));
            return (
              <div className="fixture-card" key={fx.id} title={`${H?.name} vs ${A?.name}`}>
                <div className="fixture-team"><img src={H?.image} alt={H?.name} /><span>{H?.name || "Home"}</span></div>
                <div className="fixture-vs">VS</div>
                <div className="fixture-team"><img src={A?.image} alt={A?.name} /><span>{A?.name || "Away"}</span></div>
                <div className="fixture-meta">{fmt(fx.time)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ClubsExplore() {
  const [search, setSearch] = useState(""), [country, setCountry] = useState("All"), [sortBy, setSortBy] = useState("name");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [faves, setFaves] = useState(loadFaves());
  const [showCompare, setShowCompare] = useState(false);
  const [auth, setAuth] = useState(getAuth());

  const teams = teamsData.premier_league_teams || [];
  const byId = useMemo(() => new Map(teams.map(t => [String(t.id), t])), [teams]);

  const countries = useMemo(() => ["All", ...Array.from(new Set(teams.map(t => t.country).filter(Boolean))).sort()], [teams]);

  const filtered = useMemo(() => {
    let list = teams.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    if (country !== "All") list = list.filter(t => t.country === country);
    if (favoritesOnly) list = list.filter(t => faves.includes(t.id));
    if (sortBy === "foundedAsc") list.sort((a, b) => (a.founded || 0) - (b.founded || 0));
    else if (sortBy === "foundedDesc") list.sort((a, b) => (b.founded || 0) - (a.founded || 0));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [teams, search, country, sortBy, favoritesOnly, faves]);

  const [spotIdx, setSpotIdx] = useState(0);
  useEffect(() => {
    setSpotIdx(0);
    if (!filtered.length) return;
    const id = setInterval(() => setSpotIdx(i => (i + 1) % Math.min(filtered.length, 12)), 5000);
    return () => clearInterval(id);
  }, [filtered]);
  const spotlight = filtered[spotIdx] || teams[0];

  const toggleFav = (id) => setFaves(prev => { const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]; saveFaves(next); return next; });

  const stats = useMemo(() => {
    const total = teams.length;
    const countries = new Set(teams.map(t => t.country)).size;
    const years = teams.map(t => t.founded).filter(Number.isFinite);
    const avg = years.length ? Math.round(years.reduce((s, y) => s + y, 0) / years.length) : "-";
    return { total, countries, avg };
  }, [teams]);


  if (!auth) {
    return (
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <Container>
          <h2 className="pf-title m-4 text-center">
            Get rich and exclusive intel<br></br> Fast and efficient with one account!
          </h2>
          <Card className="pf-composer card shadow-sm m-5 mb-4">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5
                    className="mb-1"
                    style={{ color: "#ffd34d", fontWeight: 700 }}
                  >
                    Explore your favorite players easy and fast, with an account!
                  </h5>
                  <div className="help">You need to sign in to post.</div>
                </div>
                <Button className="btn-auth" variant="warning" href="/login">
                  Sign in
                </Button>
              </div>
            </Card.Body>
          </Card></Container></motion.div>
    );
  }
  else return (
    <motion.div className="clubs-bg" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
      <div className="container d-flex py-2 justify-content-center">
        <img className="text-center" style={{ maxWidth: "900px", maxHeight: "600px" }} src='https://e0.365dm.com/21/07/2048x1152/skysports-premier-league-graphic_5458724.jpg?20210726090016'></img>
        <div className="p-3">
          <h2 className="p-2 pf-title text-center">
            Every legend starts with a club, regardless the actual size!
          </h2>
          <p>Over that span, 51 teams have played in the Premier League, two of which (Cardiff City and Swansea City) are located in Wales; they play in the English football league system for practical and historical reasons.<br></br>
            Eleven of the 22 founder members of the Premier League will compete in the 2025–26 season. Six (Arsenal, Chelsea, Everton, Liverpool, Manchester United, and Tottenham Hotspur) have contested every season of the Premier League. The remaining five (Aston Villa, Crystal Palace, Leeds United, Manchester City and Nottingham Forest), were also founder members, though each team has been relegated at least once in the past. Two clubs, Brighton & Hove Albion and Brentford, are not founding members of the Premier League, but have not been relegated since making their debuts in the Premier League after promotion in 2017 and 2021, respectively.</p>
        </div>
      </div>
      {spotlight && (
        <Container className="py-4">
          <motion.div className="spotlight-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <Row className="g-3 align-items-center">
              <Col md={3}><img src={spotlight.image} alt={spotlight.name} className="spotlight-logo" loading="lazy" /></Col>
              <Col md={9}>
                <h3 className="mb-1">{spotlight.name}</h3>
                <p className="mb-2 spotlight-meta">
                  <Badge bg="" className="badge-soft">🏟 {spotlight.stadium}</Badge>
                  <Badge bg="" className="badge-soft ms-2">📅 {spotlight.founded}</Badge>
                  <Badge bg="" className="badge-soft ms-2">🌍 {spotlight.country}</Badge>
                </p>
                <Button as={Link} to={`/team/${spotlight.id}`} variant="outline-warning" className="btn-auth">View club</Button>
              </Col>
            </Row>
          </motion.div>
        </Container>
      )}

      <Container className="pb-3">
        <FixturesStrip fixtures={demoFixtures} byId={byId} />
      </Container>

      <Container className="pt-2 pb-4">
        <Row className="g-3 align-items-end filter-bar">
          <Col md={6}>
            <Form.Control className="shadow search-bar" type="text" placeholder="🔍 Search for a club..." value={search} onChange={e => setSearch(e.target.value)} />
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={country} onChange={e => setCountry(e.target.value)}>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="name">Sort: Name (A→Z)</option>
              <option value="foundedAsc">Sort: Founded (oldest)</option>
              <option value="foundedDesc">Sort: Founded (newest)</option>
            </Form.Select>
          </Col>

          <Col xs={12} className="d-flex flex-wrap gap-2 stats-wrap">
            <div className="stat-pill">Teams: <strong>{stats.total}</strong></div>
            <div className="stat-pill">Countries: <strong>{stats.countries}</strong></div>
            <div className="stat-pill">Avg founded: <strong>{stats.avg}</strong></div>
            <Form.Check type="switch" id="fav-only" label="Favorites only" checked={favoritesOnly} onChange={e => setFavoritesOnly(e.target.checked)} />
            <Button variant="outline-warning" className="btn-auth ms-auto" onClick={() => setShowCompare(true)}>Compare clubs</Button>
          </Col>
        </Row>
      </Container>

      <Container className="pb-5">
        <Row className="g-4">
          {filtered.map((club, i) => {
            const fav = faves.includes(club.id);
            return (
              <Col md={4} lg={3} key={club.id}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                  <Card className="club-card h-100">
                    <div className="club-logo-wrap">
                      <Card.Img variant="top" src={club.image} alt={club.name} className="club-logo" loading="lazy" />
                      <button className={`fav-btn ${fav ? "is-fav" : ""}`} onClick={(e) => { e.preventDefault(); toggleFav(club.id); }} type="button" aria-label={fav ? "Remove favorite" : "Add favorite"}>
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
                      <Button as={Link} to={`/team/${club.id}`} size="sm" variant="outline-warning" className="btn-auth">Details</Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>

      <CompareOffcanvas show={showCompare} onHide={() => setShowCompare(false)} teams={teams} />
    </motion.div>
  );
}
