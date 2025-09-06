import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import "../styles/TeamDetail.css";

const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const team = teamsData.premier_league_teams.find(
    (t) => t.id === parseInt(teamId)
  );

  if (!team) {
    return (
      <Container className="not-found">Club information not found.</Container>
    );
  }

  return (
    <div className="team-detail-page">
      <div className="background-image-container"></div>
      <Container className="team-detail-container">
        <div className="content-wrapper">
          {/* Club name at the top, centered */}
          <h1 className="team-detail-name">{team.name}</h1>
          {/* Logo and 4 details on a single horizontal line */}
          <div className="info-top-section">
            <div className="logo-section">
              <img
                src={team.image}
                alt={team.name}
                className="team-logo-large"
              />
            </div>
            <div className="info-section">
              <div className="info-list">
                <div className="info-item">
                  <strong>Short Name:</strong>
                  <span>{team.shortName}</span>
                </div>
                <div className="info-item">
                  <strong>Stadium:</strong>
                  <span>{team.stadium}</span>
                </div>
                <div className="info-item">
                  <strong>Founded:</strong>
                  <span>{team.founded}</span>
                </div>
                <div className="info-item">
                  <strong>Country:</strong>
                  <span>{team.country}</span>
                </div>
              </div>
            </div>
          </div>
          {/* History section at the bottom, centered */}
          {team.history && (
            <div className="history-section">
              <h2>History</h2>
              <p>{team.history}</p>
            </div>
          )}
        </div>
        <div className="button-container">
          <Button onClick={() => navigate(-1)} className="back-button">
            Go back
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TeamDetail;