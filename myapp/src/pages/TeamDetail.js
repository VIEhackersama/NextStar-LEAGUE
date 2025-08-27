
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
  return <Container className="not-found">Không tìm thấy thông tin câu lạc bộ.</Container>;
 }

 return (
  <Container className="team-detail-container">
   <div className="detail-card">
    <img 
     src={team.image} 
     alt={team.name} 
     className="team-logo-large" 
    />
    <h1 className="team-detail-name">{team.name}</h1>
    <p><strong>Tên viết tắt:</strong> {team.shortName}</p>
    <p><strong>Sân vận động:</strong> {team.stadium}</p>
    <p><strong>Thành lập:</strong> {team.founded}</p>
    <p><strong>Quốc gia:</strong> {team.country}</p>
   </div>
   <Button 
    onClick={() => navigate(-1)} 
    className="back-button"
   >
    Quay lại
   </Button>
  </Container>
 );
};

export default TeamDetail;