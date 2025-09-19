import React from "react";
import PlayerList from "../components/PlayerList"; 
import '../styles/playercard.css'
const PlayersPage = () => {
    return (
        <div className="players-page container">
            <h1 className="page-title">The super stars</h1>
            <PlayerList />
        </div>
    );
};

export default PlayersPage;
