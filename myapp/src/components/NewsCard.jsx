import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFire, FaBookmark, FaRegBookmark, FaCommentAlt, FaShareAlt } from "react-icons/fa";

const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);
const readingTime = (text) => Math.max(1, Math.round((text?.split(/\s+/).length || 120) / 200));

function shareNews(item) {
  if (navigator.share) {
    navigator.share({ title: item.title, text: item.summary, url: window.location.origin + `/news/${item.id}` }).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(window.location.origin + `/news/${item.id}`);
    alert("Link copied to clipboard");
  }
}

// cat suy luận nhẹ
const inferCategory = (n) => {
  const s = `${n.title} ${n.content}`.toLowerCase();
  if (/transfer|sign|joins|contract|loan|fee|window/.test(s)) return "Transfers";
  if (/manager|sack|boss|coach/.test(s)) return "Managers";
  if (/stadium|capacity|facility|infrastructure/.test(s)) return "Club";
  if (/record|ballon|award|milestone/.test(s)) return "Records";
  return "General";
};

export default function NewsCard({ item, onQuickView, isBookmarked, toggleBookmark, category, linkState }) {
  const minutes = readingTime(item.content);
  const cat = category || inferCategory(item);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }}>
      <Card className="news-card h-100">
        <div className="news-thumb-wrap">
          <img className="news-thumb" src={item.image} alt={item.title} loading="lazy" />
          <div className="news-thumb-badges">
            <Badge bg="" className="badge-glass"><FaFire size={12} /> Top</Badge>
            <Badge bg="" className="badge-glass secondary">{cat}</Badge>
          </div>
          <button
            type="button"
            className="bookmark-btn"
            aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
            title={isBookmarked ? "Remove bookmark" : "Save bookmark"}
            onClick={(e) => { e.preventDefault(); toggleBookmark(item.id); }}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <Card.Body>
          <Card.Title className="news-title">{item.title}</Card.Title>
          <Card.Text className="news-summary">{item.summary}</Card.Text>

          <div className="news-meta">
            <span>{minutes} min read</span>
            <span><FaCommentAlt style={{ marginRight: 6 }} />{formatCount(item.comments)}</span>
            <button type="button" className="share-btn" onClick={() => shareNews(item)}><FaShareAlt /></button>
          </div>

          <div className="news-actions">
            <Button
              as={Link}
              to={`/news/${item.id}`}
              state={linkState || { from: "/news" }}
              size="sm"
              variant="outline-warning"
              className="btn-auth"
            >
              Read more
            </Button>
            <Button size="sm" variant="outline-light" onClick={() => onQuickView(item)}>
              Quick view
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
