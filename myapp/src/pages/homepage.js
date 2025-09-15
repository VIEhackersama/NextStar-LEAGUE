import React, { useState } from "react";
import { Carousel, Container, Row, Col, Card, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import teamsData from "../assets/data/Premier.json";
import "../styles/home.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Homepage() {
  const [search, setSearch] = useState("");

  const filteredTeams = teamsData.premier_league_teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const members = [
  {
    id: 1,
    name: "Le Nhat Huy",
    role: "Leader",
    img: "/image/huy.jpg",
    fb: "https://facebook.com/lenhathuy",
    ig: "https://instagram.com/lenhathuy",
    tw: "https://twitter.com/lenhathuy",
    desc: "Responsible for managing the project, assigning tasks, and ensuring the team meets deadlines.",
  },
  {
    id: 2,
    name: "Nguyen Minh Ha",
    role: "Frontend Developer",
    img: "/image/minhha.jpg",
    fb: "https://facebook.com/nguyenminhha",
    ig: "https://instagram.com/nguyenminhha",
    tw: "https://twitter.com/nguyenminhha",
    desc: "Focused on building user interfaces, creating responsive layouts, and handling client-side logic.",
  },
  {
    id: 3,
    name: "Pham Hai Dong",
    role: "Backend Developer",
    img: "/image/dongpham.jpg",
    fb: "https://facebook.com/phamhai.dong",
    ig: "https://instagram.com/phamhai.dong",
    tw: "https://twitter.com/phamhai.dong",
    desc: "Works on server-side logic, database management, and building secure APIs for the system.",
  },
];

  return (
    <motion.div
      className="homepage-bg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      
      <Carousel fade interval={2500}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/new3.webp"
            alt="Premier League"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/background.avif"
            alt="Clubs"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      
      <Container className="py-5">
        <Form.Control
          type="text"
          placeholder="🔍 Search for a club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 shadow search-bar"
        />

        <Row className="g-4">
          {filteredTeams.map((club, index) => (
            <Col md={4} lg={3} key={club.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Link to={`/team/${club.id}`} style={{ textDecoration: "none" }}>
                  <Card className="club-card h-100 text-center">
                    <Card.Img
                      variant="top"
                      src={club.image}
                      alt={club.name}
                      style={{
                        height: "160px",
                        objectFit: "contain",
                        padding: "20px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="club-title">{club.name}</Card.Title>
                      <Card.Text className="club-info">
                        🏟 {club.stadium} <br />
                        📅 Founded: {club.founded} <br />
                        🌍 {club.country}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      
     <Container fluid className="py-5 homepage-bg">
  <h2 className="text-center mb-5 fw-bold">👥 Our Team Members</h2>
  {members.map((member, index) => (
    <Row
      key={member.id}
      className="justify-content-center mb-4"
    >
      <Col md={10}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="member-card shadow-lg d-flex flex-row align-items-center p-3 w-100">
            <div style={{ flex: "0 0 150px" }}>
              <Card.Img
                src={member.img}
                alt={member.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            </div>

            
            <Card.Body className="ms-4">
  <Card.Title className="fw-bold text-dark fs-4">{member.name}</Card.Title>
  <Card.Text className="text-muted fs-6 mb-1">{member.role}</Card.Text>
  <Card.Text className="text-dark fs-6 mb-3">{member.desc}</Card.Text>

 
  <div className="d-flex gap-3">
    <a href={member.fb} target="_blank" rel="noopener noreferrer" className="social-icon fb">
      <FaFacebook size={24} />
    </a>
    <a href={member.ig} target="_blank" rel="noopener noreferrer" className="social-icon ig">
      <FaInstagram size={24} />
    </a>
    <a href={member.tw} target="_blank" rel="noopener noreferrer" className="social-icon tw">
      <FaTwitter size={24} />
    </a>
  </div>
</Card.Body>

          </Card>
        </motion.div>
      </Col>
    </Row>
  ))}
</Container>
    </motion.div>
  );
}

export default Homepage;
