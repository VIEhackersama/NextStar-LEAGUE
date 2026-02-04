import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaClock, FaCommentAlt } from "react-icons/fa";
import { ArrowRight, XCircle } from "react-bootstrap-icons";

/** ước lượng thời gian đọc: 200wpm */
const readingTime = (text) =>
  Math.max(1, Math.round((text?.split(/\s+/).length || 120) / 200));

export default function QuickView({ show, onHide, item }) {
  if (!item) return null;

  const minutes = readingTime(item.content || item.summary || "");

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      scrollable
      size="lg"
      className="quick-modal"
      backdropClassName="quick-backdrop"
      restoreFocus
    >
      <Modal.Header closeButton closeVariant="white" className="quick-header">
        <Modal.Title className="quick-title">{item.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="quick-body">
        {/* HERO */}
        <div className="quick-hero elevated">
          <img src={item.image} alt={item.title} />
          <span className="img-overlay" />
          <div className="quick-badges">
            <Badge bg="" className="quick-badge">
              <FaClock style={{ marginRight: 6 }} />
              {minutes} min
            </Badge>
            <Badge bg="" className="quick-badge">
              <FaCommentAlt style={{ marginRight: 6 }} />
              {item.comments ?? 0}
            </Badge>
          </div>
        </div>

        {/* TEXT */}
        <p className="quick-summary">{item.summary}</p>
        <div className="quick-content">{item.content}</div>
      </Modal.Body>

      <Modal.Footer className="quick-footer">
        <div className="quick-actions">
          <Button
            variant="outline-light"
            className="ns-btn ns-btn-ghost"
            onClick={onHide}
          >
            <XCircle className="icon" /> Close
          </Button>

          <Button
            as={Link}
            to={`/news/${item.id}`}
            state={{ from: "/news" }}
            variant="warning"
            className="ns-btn ns-btn-primary"
            onClick={onHide}
          >
            Read full article <ArrowRight className="icon" />
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
