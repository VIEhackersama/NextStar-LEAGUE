import React from "react";
import PlayerList from "../components/PlayerList"; 
import '../styles/playercard.css'
const PlayersPage = () => {
    return (
        <div className="players-page container">
            <h2 className="pf-title text-center">
                Get instant access to deep and detailed information!<br></br> Now with only one account!
            </h2>
            <PlayerList />
        </div>
    );
};

export default PlayersPage;
