import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import data from "../assets/data/new.json";
import "../styles/new.css"; // chứa CSS custom nếu cần

function NewsPage() {
  return (
    <div className="news-container">
      <Container fluid>
        <Row>
          
          <Col md={8}>
            <h2 className="fw-bold mb-4 text-white">Latest Premier League News</h2>
            <Row className="g-4">
              {data.news.map((news) => (
                <Col md={6} key={news.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Card className="h-100 shadow-sm border-0 news-card">
                      <Link
                        to={`/news/${news.id}`}
                        className="text-decoration-none text-light"
                      >
                        <Card.Img variant="top" src={news.image} />
                        <Card.Body>
                          <Card.Title className="fw-bold">{news.title}</Card.Title>
                          <Card.Text>
                            <strong>{news.summary}</strong>
                          </Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Bảng xếp hạng bên phải */}
          <Col md={4}>
            <h3 className="fw-bold mb-3 text-center text-white">
              Premier League Standings
            </h3>
            <Card className="shadow-sm border-0 news-card">
              <Table striped bordered hover responsive size="sm" className="standings-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Club</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {data.standings.map((team) => (
                    <tr key={team.rank}>
                      <td>{team.rank}</td>
                      <td>{team.club}</td>
                      <td>{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewsPage;