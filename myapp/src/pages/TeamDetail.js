import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import PlayerList from "../components/PlayerList";
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

      {/* ====== PHẦN THÔNG TIN ĐỘI ====== */}
      <Container className="team-detail-container">
        <div className="content-wrapper">
          <h1 className="team-detail-name">{team.name}</h1>

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
                  <strong>Short Name:</strong> <span>{team.shortName}</span>
                </div>
                <div className="info-item">
                  <strong>Stadium:</strong> <span>{team.stadium}</span>
                </div>
                <div className="info-item">
                  <strong>Founded:</strong> <span>{team.founded}</span>
                </div>
                <div className="info-item">
                  <strong>Country:</strong> <span>{team.country}</span>
                </div>
              </div>
            </div>
          </div>

          {team.history && (
            <div className="history-section">
              <h2>HISTORY</h2>
              <p>{team.history}</p>
            </div>
          )}
        </div>
      </Container>

      {/* ====== PHẦN CẦU THỦ ====== */}
      <section className="players-section-outer">
        <div className="players-width">
          <h2 className="players-title">ĐỘI HÌNH & CHỈ SỐ</h2>
          <PlayerList clubId={teamId} />
        </div>
      </section>

      {/* Nút quay lại */}
      <Container className="team-detail-container">
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
