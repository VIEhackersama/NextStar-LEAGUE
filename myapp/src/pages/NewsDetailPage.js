import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import data from "../assets/data/new.json";
import '../styles/sidebar.css'
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
        background: "linear-gradient(135deg, #080314ff, #130524ff)", // xanh biển -> tím
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(23, 21, 21, 0.95)", // nền trắng bán trong suốt
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header hình ảnh + tiêu đề */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <img
            src={news.image}
            alt={news.title}
            style={{
              maxWidth: "100%",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          />
          <h2 className="fw-bold mb-2" style={{ color: "#9098e1ff" }}>
            {news.title}
          </h2>
          <p style={{ color: "#6c757d" }}>💬 {news.comments} comments</p>
        </motion.div>

        {/* Nội dung + Sidebar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr", // nội dung rộng hơn
            gap: "30px",
          }}
        >
          {/* Nội dung chính */}
          <div>
            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: "1.8",
                color: "#eaeff4ff", 
                textAlign: "justify", // dàn đều 2 bên
                whiteSpace: "pre-line",
              }}
            >
              {news.content}
            </p>
            <Link to="/">
              <Button
                variant="primary"
                className="mt-4"
                style={{
                  padding: "10px 25px",
                  borderRadius: "10px",
                  background: "#1d0556ff",
                  border: "none",
                }}
              >
                ⬅ Back
              </Button>
            </Link>
          </div>

          {/* Sidebar gồm Related + Author + Details + Tags */}
          <div>
            <Card className="mb-4 shadow-sm sidebar-card" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 className="fw-bold">📌 Related News</h5>
                <ul style={{ paddingLeft: "20px", marginTop: "15px" }}>
                  {newsData
                    .filter((item) => item.id !== news.id)
                    .slice(0, 3)
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

            <Card className="mb-4 shadow-sm sidebar-card" style={{ borderRadius: "15px" }}>
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

            <Card className="mb-4 shadow-sm sidebar-card" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <h5 className="fw-bold">📊 Details</h5>
                <p>Category: <b>{news.category || "Sports"}</b></p>
                <p>Date: <b>{news.date || "2025-09-18"}</b></p>
                <p>Views: <b>{news.views || "1,000+"}</b></p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm sidebar-card" style={{ borderRadius: "15px" }}>
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
      </div>
    </motion.div>
  );
}

export default NewsDetailPage;
