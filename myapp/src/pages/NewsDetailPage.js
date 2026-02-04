import React, { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaChevronLeft, FaCommentAlt, FaShareAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import data from "../assets/data/new.json";
import "../styles/sidebar.css";

const readingTime = (text) => Math.max(1, Math.round((text?.split(/\s+/).length || 120) / 200));
const inferCategory = (n) => {
  const s = `${n.title} ${n.content}`.toLowerCase();
  if (/transfer|sign|joins|contract|loan|fee|window/.test(s)) return "Transfers";
  if (/manager|sack|boss|coach/.test(s)) return "Managers";
  if (/stadium|capacity|facility|infrastructure/.test(s)) return "Club";
  if (/record|ballon|award|milestone/.test(s)) return "Records";
  return "General";
};

function shareArticle(article) {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: article.title, text: article.summary, url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(url);
    alert("Link copied to clipboard");
  }
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const list = data.news || [];
  const index = useMemo(() => list.findIndex((n) => String(n.id) === String(id)), [list, id]);
  const article = index >= 0 ? list[index] : null;

  useEffect(() => { document.title = article ? `${article.title} — News` : "News"; }, [article]);

  if (!article) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <h3 style={{ color: "#dc3545" }}>❌ This article does not exist!</h3>
        <Link to="/news" className="btn btn-primary mt-3">Back to News</Link>
      </div>
    );
  }

  const minutes = readingTime(article.content);
  const cat = inferCategory(article);
  const prev = index > 0 ? list[index - 1] : null;
  const next = index < list.length - 1 ? list[index + 1] : null;

  const handleBack = () => {
    const from = location.state?.from;
    if (from && from.startsWith("/news")) navigate(-1);
    else navigate("/news");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="news-detail-bg">
      <Container className="news-detail-wrap">
        <Row className="align-items-center mb-3 g-2">
          <Col xs="auto">
            <Button variant="outline-light" className="btn-auth d-inline-flex align-items-center gap-2" onClick={handleBack}>
              <FaChevronLeft /> Back to News
            </Button>
          </Col>
          <Col className="d-none d-md-block">
            <div className="crumbs">Home / News / <span>{article.title}</span></div>
          </Col>
          <Col xs="auto" className="ms-auto">
            <Button variant="outline-warning" className="btn-auth d-inline-flex align-items-center gap-2" onClick={() => shareArticle(article)}>
              <FaShareAlt /> Share
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="news-card">
              <div className="news-hero">
                <img src={article.image} alt={article.title} />
                <div className="news-hero-badges">
                  <Badge bg="" className="badge-glass">{cat}</Badge>
                  <Badge bg="" className="badge-glass">{minutes} min read</Badge>
                  <Badge bg="" className="badge-glass"><FaCommentAlt style={{ marginRight: 6 }} />{article.comments}</Badge>
                </div>
              </div>
              <Card.Body className="news-detail-body">
                <h1 className="news-detail-title">{article.title}</h1>
                <p className="news-detail-summary">{article.summary}</p>
                <div className="news-detail-content">{article.content}</div>

                <div className="prev-next">
                  <div className="nav-item">
                    {prev ? (
                      <Link className="arrow-link" to={`/news/${prev.id}`} state={{ from: "/news" }}>
                        <FaAngleLeft /> <span>{prev.title}</span>
                      </Link>
                    ) : <span className="disabled">Start of list</span>}
                  </div>
                  <div className="nav-item text-end">
                    {next ? (
                      <Link className="arrow-link" to={`/news/${next.id}`} state={{ from: "/news" }}>
                        <span>{next.title}</span> <FaAngleRight />
                      </Link>
                    ) : <span className="disabled">End of list</span>}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="sidebar-sticky">{/* wrapper sticky cho cột phải */}
              <Card className="mb-4 shadow-sm sidebar-card">
                <Card.Body>
                  <h5 className="fw-bold">📌 Related News</h5>
                  <ul className="related-list">
                    {list.filter((it) => it.id !== article.id).slice(0, 5).map((it) => (
                      <li key={it.id}>
                        <Link to={`/news/${it.id}`} state={{ from: "/news" }}>
                          <img src={it.image} alt={it.title} />
                          <span>{it.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm sidebar-card">
                <Card.Body>
                  <h5 className="fw-bold">👤 Author</h5>
                  <p className="muted">Written by <b>{article.author || "Admin"}</b></p>
                  <p className="muted small">{article.authorBio || "Professional writer, sharing sports updates daily."}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm sidebar-card">
                <Card.Body>
                  <h5 className="fw-bold">📊 Details</h5>
                  <p className="muted">Category: <b>{article.category || cat}</b></p>
                  <p className="muted">Date: <b>{article.date || "2025-09-18"}</b></p>
                  <p className="muted">Views: <b>{article.views || "1,000+"}</b></p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm sidebar-card">
                <Card.Body>
                  <h5 className="fw-bold">🏷 Tags</h5>
                  <div className="tags">
                    {(article.tags || ["Football", "Premier League"]).map((tag, i) => (
                      <span key={i} className="badge tag">{tag}</span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}
