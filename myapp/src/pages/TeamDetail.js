
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
   <div className="team-detail-page">
     <div className="background-image-container"></div>
     <Container className="team-detail-container">
       <div className="content-wrapper">
         <div className="logo-section">
           <img
             src={team.image}
             alt={team.name}
             className="team-logo-large"
           />
         </div>
         <div className="info-section">
           <h1 className="team-detail-name">{team.name}</h1>
           <div className="info-list">
             <div className="info-item">
               <strong>Tên viết tắt:</strong>
               <span>{team.shortName}</span>
             </div>
             <div className="info-item">
               <strong>Sân vận động:</strong>
               <span>{team.stadium}</span>
             </div>
             <div className="info-item">
               <strong>Thành lập:</strong>
               <span>{team.founded}</span>
             </div>
             <div className="info-item">
               <strong>Quốc gia:</strong>
               <span>{team.country}</span>
             </div>
           </div>
         </div>
       </div>
       <div className="button-container">
         <Button onClick={() => navigate(-1)} className="back-button">
           Quay lại
         </Button>
       </div>
     </Container>
   </div>
 );
};

export default TeamDetail;