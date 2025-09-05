import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

function StarsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="position-relative text-center"
    >
      
      <img
        src="image/stars.webp"
        alt="Premier League Stars"
        className="w-100 vh-100 object-fit-cover opacity-75"
      />

      <div className="py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="fw-bold mb-4 text-center text-white">
                Premier League Stars
              </h2>
              <Row className="g-4">
                
                <Col md={4}>
                  <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                    <Card.Header className="bg-white border-0">
                      <Card.Img
                        variant="top"
                        src="image/haaland.webp"
                        alt="Erling Haaland"
                        className="rounded-top-4"
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Erling Haaland</Card.Title>
                      <Card.Text>
                        <strong>Club:</strong> Manchester City <br />
                        <strong>Position:</strong> Striker <br />
                        <strong>Highlights:</strong> One of the most lethal
                        forwards in world football. Known for his intelligent
                        positioning, explosive speed, and incredible finishing
                        ability. Haaland broke the record for most goals in a
                        single Premier League season with 36 goals (2022/23).
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                
                <Col md={4}>
                  <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                    <Card.Header className="bg-white border-0">
                      <Card.Img
                        variant="top"
                        src="image/salah.jpg"
                        alt="Mohamed Salah"
                        className="rounded-top-4"
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Mohamed Salah</Card.Title>
                      <Card.Text>
                        <strong>Club:</strong> Liverpool <br />
                        <strong>Position:</strong> Right Winger <br />
                        <strong>Highlights:</strong> Nicknamed the "Egyptian
                        King," Salah is a Liverpool icon. Famous for his pace,
                        dribbling skills, and goal-scoring consistency. He has
                        won multiple Golden Boots and played a key role in
                        Liverpool’s Premier League and Champions League triumphs.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                
                <Col md={4}>
                  <Card className="shadow-lg border-0 rounded-4 h-100 text-center">
                    <Card.Header className="bg-white border-0">
                      <Card.Img
                        variant="top"
                        src="image/bruno.jpg"
                        alt="Bruno Fernandes"
                        className="rounded-top-4"
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Bruno Fernandes</Card.Title>
                      <Card.Text>
                        <strong>Club:</strong> Manchester United <br />
                        <strong>Position:</strong> Attacking Midfielder <br />
                        <strong>Highlights:</strong> The playmaker and leader of
                        Manchester United. Known for his vision, creativity, and
                        ability to score from midfield. Fernandes is also
                        renowned for his penalty-taking skills and impact in big
                        matches since joining United in 2020.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </motion.div>
  );
}

export default StarsPage;
