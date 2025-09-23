import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

import NewsCard from "../components/NewsCard";
import QuickView from "../components/QuickView";
import StandingsCard from "../components/StandingsCard";

import data from "../assets/data/new.json";
import "../styles/new.css";
import "../styles/quickview.css";
import { getAuth } from "../services/auth";

const BOOKMARK_KEY = "news_bookmarks_v1";
const readBookmarks = () => { try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]"); } catch { return []; } };
const writeBookmarks = (ids) => localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
const inferCategory = (n) => {
  const s = `${n.title} ${n.content}`.toLowerCase();
  if (/transfer|sign|joins|contract|loan|fee|window/.test(s)) return "Transfers";
  if (/manager|sack|boss|coach/.test(s)) return "Managers";
  if (/stadium|capacity|facility|infrastructure/.test(s)) return "Club";
  if (/record|ballon|award|milestone/.test(s)) return "Records";
  return "General";
};

export default function NewsPage() {
  const news = data.news || [];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [bookmarks, setBookmarks] = useState(readBookmarks());
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [limit, setLimit] = useState(8);
  const [quickView, setQuickView] = useState({ open: false, item: null });
  const [auth, setAuth] = useState(getAuth());
  useEffect(() => { setBookmarks(readBookmarks()); }, []);

  const categories = useMemo(() => {
    const set = new Set(news.map(inferCategory));
    return ["All", ...Array.from(set).sort()];
  }, [news]);

  const processed = useMemo(() => {
    let arr = news.map(n => ({ ...n, _cat: inferCategory(n) }));
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(n => `${n.title} ${n.summary} ${n.content}`.toLowerCase().includes(q));
    }
    if (category !== "All") arr = arr.filter(n => n._cat === category);
    if (onlyBookmarks) arr = arr.filter(n => bookmarks.includes(n.id));

    switch (sortBy) {
      case "comments": arr.sort((a, b) => (b.comments || 0) - (a.comments || 0)); break;
      case "title": arr.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: arr.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
    return arr;
  }, [news, query, category, sortBy, onlyBookmarks, bookmarks]);

  const visible = processed.slice(0, limit);
  const canLoadMore = limit < processed.length;

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      writeBookmarks(next);
      return next;
    });
  };

  const sentinelRef = useRef(null);
  useEffect(() => {
    const el = sentinelRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && setLimit(l => Math.min(l + 6, processed.length)));
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [processed.length]);

  if (!auth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="pred-bg"
      >
        <Container className="pred-wrap">
          <h2 className="pf-title text-center">
            Getting the latest news of the tournament<br></br> Faster than lightning with an account!
          </h2>
          <Card className="pf-composer card shadow-sm">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h5
                  style={{ color: "#ffd34d", fontWeight: 700 }}
                  className="mb-1"
                >
                  Match Predictions
                </h5>
                <div className="muted">
                  You need to sign in to make predictions.
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button href="/login" variant="warning" className="btn-auth">
                  Sign in
                </Button>
                {/* <Button
                    href="/register"
                    variant="outline-light"
                    className="btn-auth"
                  >
                    Create account
                  </Button> */}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </motion.div>
    );
  }
  else return (
    <div className="news-container">
      <Container className="topbar">
        <Row className="g-2 align-items-center">
          <Col lg={5}>
            <div className="search-wrap">
              <FaSearch />
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news, clubs, transfers…"
                aria-label="Search news"
              />
            </div>
          </Col>
          <Col xs={6} lg={3}>
            <Form.Select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setLimit(8); }}
              className="select-control"
            >
              {categories.map(c => <option value={c} key={c}>{c}</option>)}
            </Form.Select>
          </Col>
          <Col xs={6} lg={2}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-control"
            >
              <option value="latest">Sort: Latest</option>
              <option value="comments">Sort: Most comments</option>
              <option value="title">Sort: Title (A→Z)</option>
            </Form.Select>
          </Col>
          <Col lg={2} className="d-flex justify-content-lg-end">
            <Form.Check
              type="switch"
              id="bm-switch"
              label="Bookmarks only"
              checked={onlyBookmarks}
              onChange={(e) => setOnlyBookmarks(e.target.checked)}
              className="bookmark-switch"
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row className="g-4">
          <Col lg={8}>
            <h2 className="section-title">Latest Premier League News</h2>
            <Row className="g-4">
              {visible.map((n) => (
                <Col md={6} key={n.id}>
                  <NewsCard
                    item={n}
                    isBookmarked={bookmarks.includes(n.id)}
                    toggleBookmark={toggleBookmark}
                    onQuickView={(item) => setQuickView({ open: true, item })}
                    linkState={{ from: "/news" }}
                  />
                </Col>
              ))}
            </Row>

            <div ref={sentinelRef} className="load-sentinel" />
            <div className="load-more-wrap">
              {canLoadMore && (
                <Button variant="outline-light" onClick={() => setLimit(l => l + 6)} className="btn-auth">
                  Load more
                </Button>
              )}
              {!processed.length && (
                <div className="empty-state">No articles found. Try clearing filters.</div>
              )}
            </div>
          </Col>

          <Col lg={4}>
            <br></br><br></br>
            <div className="sidebar-sticky">
              <StandingsCard standings={data.standings || []} />

              <div className="mini-ticker">
                <div className="mini-ticker-label">Trending</div>
                <div className="mini-ticker-track">
                  <div className="mini-ticker-inner">
                    {news.slice(0, 8).map(n => <span key={n.id}>{n.title}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <AnimatePresence>
        {quickView.open && (
          <QuickView
            show={quickView.open}
            item={quickView.item}
            onHide={() => setQuickView({ open: false, item: null })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
