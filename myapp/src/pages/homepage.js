import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import "../styles/home.css";
import { Link } from "react-router-dom";

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
                <h3 className="slide-title">Premier League Clubs</h3>
                <Row className="justify-content-center">
                  {group.map((team) => (
                    <Col
                      key={team.id}
                      xs={6}
                      md={3}
                      className="d-flex flex-column align-items-center mb-4"
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
      </Container>
    </div>
  );
}

export default Homepage;
