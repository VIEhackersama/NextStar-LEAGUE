// src/pages/PostFeed.tsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { getAuth } from "../services/auth";
import { FaCommentAlt } from "react-icons/fa";
import "../styles/postfeed.css";
import PostComposer from "../components/PostComposer";

interface Post {
  postId: number;
  title: string;
  fullText: string;
  imageUrl: string;
  createdAt: string;
  username: string;
}

const wordsPerMin = 200;
const readingTime = (text: string) =>
  Math.max(
    1,
    Math.round((text?.trim().split(/\s+/).length || 0) / wordsPerMin)
  );

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const token = auth?.token;
    axios
      .get<Post[]>("http://localhost:8080/post/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  function handleCreated(dtoLike: Post) {
    setPosts((prev) => [dtoLike, ...prev]);
    setExpanded(dtoLike.postId); 
  }

  const items = useMemo(
    () =>
      posts.map((p) => ({
        ...p,
        minutes: readingTime(p.fullText),
        dateText: new Date(p.createdAt).toLocaleDateString(),
        excerpt:
          p.fullText.length > 180
            ? p.fullText.slice(0, 180).trim() + "…"
            : p.fullText,
      })),
    [posts]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="pf-bg"
    >
      <Container className="pf-wrap">
        <h2 className="pf-title text-center">
          Share your thought on favorite players!<br></br> With feed, everyone
          has the right of judgement, love and admire
        </h2>
        <PostComposer onCreated={handleCreated} />
        <Row className="g-4">
          {items.map((post) => (
            <Col key={post.postId} xs={12} md={6}>
              <Card className="pf-card shadow-sm">
                {post.imageUrl && (
                  <div className="pf-hero">
                    <img src={post.imageUrl} alt={post.title} />
                    <div className="pf-hero-gradient" />
                    <div className="pf-hero-badges">
                      {/* <Badge bg="" className="badge-glass">
                        {post.minutes} min read
                      </Badge> */}
                      <Badge bg="" className="badge-glass">
                        <FaCommentAlt style={{ marginRight: 6 }} />0
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Body */}
                <Card.Body className="pf-body">
                  <h3 className="pf-card-title">{post.title}</h3>
                  <div className="pf-meta">
                    <span className="pf-author">by {post.username}</span>
                    <span className="pf-dot">•</span>
                    <span className="pf-date">{post.dateText}</span>
                  </div>

                  <p className="pf-text">
                    {expanded === post.postId ? post.fullText : post.excerpt}
                  </p>

                  {post.fullText.length > 180 && (
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="btn-auth pf-more"
                      onClick={() =>
                        setExpanded(
                          expanded === post.postId ? null : post.postId
                        )
                      }
                    >
                      {expanded === post.postId ? "Show less" : "Read more"}
                    </Button>
                  )}
                </Card.Body>

                <div className="pf-actions">
                  <Button size="sm" className="btn-auth" variant="warning">
                    ↑ Upvote
                  </Button>
                  <Button
                    size="sm"
                    className="btn-auth"
                    variant="outline-light"
                  >
                    ↓ Downvote
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
};

export default PostFeed;
