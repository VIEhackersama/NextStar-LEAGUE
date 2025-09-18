import React from "react";

const StatRow = ({ label, value }) => (
  <div className="player-stat-row">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const PlayerCard = ({ player }) => {
  const { name, number, position, age, nationality, image, stats } = player || {};

  return (
    <div className="player-card" role="article" aria-label={`Player ${name}`}>
      <div className="player-card__header">
        <img
          src={image || "/players/placeholder.png"}
          alt={name}
          className="player-avatar"
          loading="lazy"
        />
        <div className="player-id">
          <div className="player-number">#{number}</div>
          <div className="player-position">{position}</div>
        </div>
      </div>

      <div className="player-card__body">
        <h3 className="player-name" title={name}>{name}</h3>
        <div className="player-meta">
          <span>{nationality || "International"}</span>
          <span>•</span>
          <span>Age {age}</span>
        </div>

        {/* Chỉ số tổng quan */}
        <div className="player-stats-grid">
          <StatRow label="Apps" value={stats?.apps ?? 0} />
          <StatRow label="G" value={stats?.goals ?? 0} />
          <StatRow label="A" value={stats?.assists ?? 0} />
          <StatRow label="Rating" value={stats?.rating ?? "-"} />
        </div>

        {/* Thuộc tính FIFA-style */}
        <div className="player-attrs">
          <StatRow label="PAC" value={stats?.pace ?? "-"} />
          <StatRow label="SHO" value={stats?.shooting ?? "-"} />
          <StatRow label="PAS" value={stats?.passing ?? "-"} />
          <StatRow label="DRI" value={stats?.dribbling ?? "-"} />
          <StatRow label="DEF" value={stats?.defending ?? "-"} />
          <StatRow label="PHY" value={stats?.physical ?? "-"} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
