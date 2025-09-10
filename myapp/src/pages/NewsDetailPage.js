import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import data from "../assets/data/new.json";
import "../styles/new.css"; 

function NewsDetailPage() {
  const { id } = useParams();

  
  const { news: newsData, standings } = data;

  const news = newsData.find((n) => n.id === parseInt(id));

  if (!news) {
    return (
      <Container className="py-5 text-center">
        <h3>❌ This article does not exist!</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="py-5">
        <Card className="shadow-sm">
        
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card.Img variant="top" src={news.image} alt={news.title} />
          </motion.div>

          <Card.Body>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card.Title className="fw-bold ">{news.title}</Card.Title>
              <Card.Text className="text-muted small mb-3">
                💬 {news.comments} comments
              </Card.Text>
              <Card.Text className="fs-5">{news.content}</Card.Text>

              <Link to="/">
                <Button variant="primary" className="mt-3">
                  ⬅ Back
                </Button>
              </Link>
            </motion.div>
          </Card.Body>
        </Card>

        
       
      </Container>
    </motion.div>
  );
}

export default NewsDetailPage;
