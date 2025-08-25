import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import "../styles/home.css"; 

function Homepage() {
  const { premier_league_teams } = teamsData;

  
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < premier_league_teams.length; i += chunkSize) {
    slides.push(premier_league_teams.slice(i, i + chunkSize));
  }

  return (
    <Container className="homepage-container">
      <h2 className="homepage-title">Premier League Clubs</h2>

      <Carousel interval={3000} indicators controls>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className="justify-content-center">
              {group.map((team) => (
                <Col
                  key={team.id}
                  xs={6}
                  md={3}
                  className="d-flex flex-column align-items-center mb-4"
                >
                  <div className="club-logo-wrapper">
                    <img src={team.image} alt={team.name} />
                  </div>
                  <p className="club-name">{team.name}</p>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Homepage;
