import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import data from "../assets/data/new.json";

function NewsDetailPage() {
  const { id } = useParams();
  const { news: newsData } = data;

  const news = newsData.find((n) => n.id === parseInt(id));

  if (!news) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h3 style={{ color: "#dc3545" }}>❌ This article does not exist!</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gap: "20px",
        }}
      >
        {/* Cột trái - Related News + Author */}
        <div>
          <Card className="mb-4 shadow-sm" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <h5 className="fw-bold">📌 Related News</h5>
              <ul style={{ paddingLeft: "20px", marginTop: "15px" }}>
                {newsData
                  .filter((item) => item.id !== news.id) // bỏ bài hiện tại
                  .slice(0, 3) // lấy 3 bài liên quan
                  .map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/news/${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <h5 className="fw-bold">👤 Author</h5>
              <p style={{ marginTop: "10px", color: "#6c757d" }}>
                Written by <b>{news.author || "Admin"}</b>
              </p>
              <p className="small">
                {news.authorBio ||
                  "Professional writer, sharing sports updates daily."}
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Cột giữa - Nội dung chính */}
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <img
              src={news.image}
              alt={news.title}
              style={{
                maxWidth: "100%",
                borderRadius: "15px",
                marginBottom: "30px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="fw-bold mb-3">{news.title}</h2>
            <p style={{ color: "#6c757d" }}>💬 {news.comments} comments</p>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "#343a40",
                whiteSpace: "pre-line",
              }}
            >
              {news.content}
            </p>

            <Link to="/">
              <Button
                variant="primary"
                className="mt-4"
                style={{ padding: "10px 20px", borderRadius: "10px" }}
              >
                ⬅ Back
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Cột phải - Details + Tags */}
        <div>
          <Card className="mb-4 shadow-sm" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <h5 className="fw-bold">📊 Details</h5>
              <p style={{ marginTop: "10px" }}>
                Category: <b>{news.category || "Sports"}</b>
              </p>
              <p>Date: <b>{news.date || "2025-09-18"}</b></p>
              <p>Views: <b>{news.views || "1,000+"}</b></p>
            </Card.Body>
          </Card>

          <Card className="shadow-sm" style={{ borderRadius: "15px" }}>
            <Card.Body>
              <h5 className="fw-bold">🏷 Tags</h5>
              <div style={{ marginTop: "10px" }}>
                {(news.tags || ["Football", "Premier League"]).map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary me-2 mb-2"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default NewsDetailPage;
