import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import teamsData from "../assets/data/Premier.json";
import PlayerCard from "../components/PlayerCard";
import "../styles/TeamDetail.css";

const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  // lấy thông tin đội từ JSON
  const team = teamsData.premier_league_teams.find(
    (t) => t.id === parseInt(teamId)
  );

  // state cho dữ liệu cầu thủ từ API
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch API lấy cầu thủ theo teamId
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/teams/${teamId}/players`
        );
        if (!res.ok) {
          throw new Error("Lỗi khi tải dữ liệu cầu thủ");
        }
        const data = await res.json();
        setPlayers(data); // API trả về List<PlayerResponse>
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  if (!team) {
    return (
      <Container className="not-found">
        Club information not found.
      </Container>
    );
  }

  return (
    <div className="team-detail-page">
      <div className="background-image-container"></div>

      {/* ====== THÔNG TIN ĐỘI ====== */}
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

      {/* ====== DANH SÁCH CẦU THỦ ====== */}
      <section className="players-section-outer">
        <div className="players-width">
          <h2 className="players-title">ĐỘI HÌNH & CHỈ SỐ</h2>

          {loading ? (
            <div className="players-empty">
              <Spinner animation="border" /> Đang tải dữ liệu cầu thủ...
            </div>
          ) : players.length === 0 ? (
            <div className="players-empty">
              Đang cập nhật dữ liệu cầu thủ cho {team.name}.
            </div>
          ) : (
            <div className="players-grid" role="list">
              {players.map((p) => (
                <PlayerCard key={p.playerId} player={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== NÚT QUAY LẠI ====== */}
      <Container className="team-detail-container">
        <div className="button-container">
          <Button onClick={() => navigate(-1)} className="back-button">
            ⬅ Go back
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TeamDetail;
