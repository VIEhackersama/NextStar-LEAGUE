import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "../styles/StarsPage.css";

function StarsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="stars-page position-relative"
    >
      
      <div className="stars-hero" role="img" aria-label="Premier League Stars">
     
        <div className="stars-overlay" />
        
        <div className="stars-content">
          <Container className="py-5">
            <Row>
              <Col>
                <h2 className="fw-bold mb-4 text-center text-white">
                  Premier League Stars
                </h2>

                <Row className="g-4">
                  <Col md={4}>
                    <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                      <Card.Header className="bg-white border-0">
                        <picture>
                          <source
                            srcSet="image/haaland-small.webp 480w, image/haaland.webp 1200w"
                            sizes="(max-width: 768px) 480px, 33vw"
                          />
                          <Card.Img
                            variant="top"
                            src="image/haaland.webp"
                            alt="Erling Haaland"
                            className="rounded-top-4 card-top-img"
                          />
                        </picture>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>Erling Haaland</Card.Title>
                        <Card.Text>
                          <strong>Club:</strong> Manchester City <br />
                          <strong>Position:</strong> Striker <br />
                          <strong>Highlights:</strong> One of the most lethal
                          forwards in world football...
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                      <Card.Header className="bg-white border-0">
                        <picture>
                          <source
                            srcSet="image/salah-small.jpg 480w, image/salah.jpg 1200w"
                            sizes="(max-width: 768px) 480px, 33vw"
                          />
                          <Card.Img
                            variant="top"
                            src="image/salah.jpg"
                            alt="Mohamed Salah"
                            className="rounded-top-4 card-top-img"
                          />
                        </picture>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>Mohamed Salah</Card.Title>
                        <Card.Text>
                          <strong>Club:</strong> Liverpool <br />
                          <strong>Position:</strong> Right Winger <br />
                          <strong>Highlights:</strong> Nicknamed the "Egyptian
                          King," Salah is a Liverpool icon...
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                      <Card.Header className="bg-white border-0">
                        <picture>
                          <source
                            srcSet="image/bruno-small.jpg 480w, image/bruno.jpg 1200w"
                            sizes="(max-width: 768px) 480px, 33vw"
                          />
                          <Card.Img
                            variant="top"
                            src="image/bruno.jpg"
                            alt="Bruno Fernandes"
                            className="rounded-top-4 card-top-img"
                          />
                        </picture>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>Bruno Fernandes</Card.Title>
                        <Card.Text>
                          <strong>Club:</strong> Manchester United <br />
                          <strong>Position:</strong> Attacking Midfielder <br />
                          <strong>Highlights:</strong> The playmaker and leader...
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </motion.div>
  );
}

export default StarsPage;
