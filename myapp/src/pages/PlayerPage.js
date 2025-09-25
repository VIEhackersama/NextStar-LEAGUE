import React from "react";
import PlayerList from "../components/PlayerList";
import '../styles/playercard.css'
const PlayersPage = () => {
    return (
        <div className="clubs-bg">
            <div className="players-page container">
                <h2 className="pf-title text-center">
                    Get instant access to deep and detailed information!<br></br> Now within the website!
                </h2>
                <PlayerList />
            </div></div>
    );
};

export default PlayersPage;
