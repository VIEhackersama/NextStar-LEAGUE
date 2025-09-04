import React from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { Trophy, People, Star } from "react-bootstrap-icons";

function Homepage() {
  const { premier_league_teams } = teamsData;

  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < premier_league_teams.length; i += chunkSize) {
    slides.push(premier_league_teams.slice(i, i + chunkSize));
  }

  return (
    <div className="homepage-container">
      <Container fluid>
        <Carousel interval={3000} indicators={true} controls={true}>
          {slides.map((group, idx) => (
            <Carousel.Item key={idx} className="custom-slide">
              <Container>
                <h2 className="text-center text-black mb-4 fw-bold">
          Welcome to NextStar League
        </h2>
                <Row className="justify-content-center">
                  {group.map((team) => (
                    <Col
                      key={team.id}
                      xs={6}
                      md={3}
                      className="d-flex flex-column align-items-center mb-3"
                    >
                      <Link to={`/team/${team.id}`} className="club-link">
                        <div className="club-logo-wrapper">
                          <img src={team.image} alt={team.name} />
                        </div>
                        <p className="club-name">{team.name}</p>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Premier League Info Section */}
        <h3 className="text-center text-white mt-5 mb-4 fw-bold">
          Premier League Information
        </h3>
        <Row className="g-4 px-3">
          <Col md={4}>
            <Link to="/history" className="text-decoration-none">
              <Card className="shadow-lg border-0 rounded-4 h-100 card-gradient">
                <Card.Body className="text-center">
                  <Trophy size={40} className="text-warning mb-3" />
                  <Card.Title className="fw-bold text-dark">Lịch sử</Card.Title>
                  <Card.Text className="text-muted">
                    Premier League thành lập năm 1992, là giải bóng đá hấp dẫn
                    nhất hành tinh.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Link to="/clubs" className="text-decoration-none">
              <Card className="shadow-lg border-0 rounded-4 h-100 card-gradient">
                <Card.Body className="text-center">
                  <People size={40} className="text-primary mb-3" />
                  <Card.Title className="fw-bold text-dark">
                    Đội bóng nổi bật
                  </Card.Title>
                  <Card.Text className="text-muted">
                    Manchester United, Liverpool, Chelsea, Arsenal, Man City...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Link to="/stars" className="text-decoration-none">
              <Card className="shadow-lg border-0 rounded-4 h-100 card-gradient">
                <Card.Body className="text-center">
                  <Star size={40} className="text-danger mb-3" />
                  <Card.Title className="fw-bold text-dark">Ngôi sao</Card.Title>
                  <Card.Text className="text-muted">
                    Erling Haaland, Mohamed Salah, Kevin De Bruyne, Bruno Fernandes...
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
