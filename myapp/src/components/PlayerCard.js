// PlayerCard.jsx
import React, { useMemo } from "react";
import "../styles/playercard.css";
import "../styles/StarsPage.css";

const STAT_DESC = {
  PAC: "Pace: The speed of a player",
  SHO: "Shooting: The player’s shooting ability. ",
  PAS: "Passing:  A player’s passing ability.",
  DEF: "Defending: A player’s all-round defensive abilities, including tackling, heading and positioning",
  PHY: "Physical: A player’s overall physical attributes, including their strength",
};

const StatRow = ({ label, value }) => (
  <div
    className="player-stat-row stat-tip"
    data-tip={STAT_DESC[label] || "No description"}
    role="button"
    tabIndex={0}
    aria-label={`${label} is ${value}. ${STAT_DESC[label] || ""}`}
  >
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const PlayerCard = ({ player }) => {
  if (!player) return null;

  const statMap = useMemo(() => {
    if (!player.stats) return {};
    return player.stats.reduce((acc, s) => {
      acc[s.statCode] = s.statValue;
      return acc;
    }, {});
  }, [player.stats]);

  return (
    <div className="player-card" role="article" aria-label={`Player ${player.fullName}`}>
      <div className="player-card__header">
        <img
          src={player.imageUrl || "/players/placeholder.png"}
          alt={player.fullName}
          className="player-avatar"
          loading="lazy"
        />
        <div className="player-id">
          <div className="player-rating">{player.rating}</div>
          <div className="player-position">{player.positionCode}</div>
        </div>
      </div>

      <div className="player-card__body">
        <h3 className="player-name" title={player.fullName}>
          {player.fullName}
        </h3>

        <div className="player-meta">
          <img src={player.countryFlag} alt={player.countryName} className="player-avatar" />
          <span>{player.countryName}</span>
          <span>•</span>
          <span>{player.positionName}</span>
        </div>

        <div className="player-meta">
          <img src={player.clubIcon} alt={player.clubName} className="player-avatar" />
          <span>{player.clubName}</span>
        </div>

        <div className="player-attrs">
          <StatRow label="PAC" value={statMap.PAC ?? "-"} />
          <StatRow label="SHO" value={statMap.SHO ?? "-"} />
          <StatRow label="PAS" value={statMap.PAS ?? "-"} />
          <StatRow label="DEF" value={statMap.DEF ?? "-"} />
          <StatRow label="PHY" value={statMap.PHY ?? "-"} />
        </div>

        <div className="player-price-wrap">
          <button
            type="button"
            className="price-btn btn-authish"
            aria-label={`Price ${player.price.toLocaleString()} euros`}
          >
            <span className="coin">🪙</span>
            {player.price.toLocaleString()} €
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
