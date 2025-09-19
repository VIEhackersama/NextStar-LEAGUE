import React, { useMemo } from "react";
import "../styles/playercard.css";
import "../styles/StarsPage.css";

const StatRow = ({ label, value }) => (
  <div className="player-stat-row">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const PlayerCard = ({ player }) => {
  if (!player) return null;

  const statMap = useMemo(() => {
    if (!player.stats || !Array.isArray(player.stats)) return {};
    return player.stats.reduce((acc, s) => {
      acc[s.code] = s.value; // ✅ sửa lại key cho đúng với PlayerResponse
      return acc;
    }, {});
  }, [player.stats]);

  return (
    <div
      className="player-card"
      role="article"
      aria-label={`Player ${player.fullName}`}
    >
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

        {/* Quốc gia + vị trí */}
        <div className="player-meta">
          <img
            src={player.countryFlag}
            alt={player.countryName}
            className="player-flag"
          />
          <span>{player.countryName}</span>
          <span>•</span>
          <span>{player.positionName}</span>
        </div>

        {/* CLB */}
        <div className="player-meta">
          <img
            src={player.clubIcon}
            alt={player.clubName}
            className="player-club-icon"
          />
          <span>{player.clubName}</span>
        </div>

        {/* Chỉ số chính */}
        <div className="player-attrs">
          <StatRow label="PAC" value={statMap.PAC ?? "-"} />
          <StatRow label="SHO" value={statMap.SHO ?? "-"} />
          <StatRow label="PAS" value={statMap.PAS ?? "-"} />
          <StatRow label="DRI" value={statMap.DRI ?? "-"} />
          <StatRow label="DEF" value={statMap.DEF ?? "-"} />
          <StatRow label="PHY" value={statMap.PHY ?? "-"} />
        </div>

        {/* Giá */}
        <div className="player-price">
          💰 {player.price ? player.price.toLocaleString() : "N/A"} €
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
