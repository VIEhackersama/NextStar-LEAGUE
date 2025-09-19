import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";
import { getAuth } from "../services/auth";

const API_URL = "http://localhost:8080/api/players";
const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const auth = getAuth();
                const token = auth?.token;

                const res = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPlayers(res.data);
            } catch (err) {
                console.error("Lỗi fetch players:", err);
                setError("Không thể tải dữ liệu cầu thủ");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="player-grid">
            {players.length > 0 ? (
                players.map((p) => <PlayerCard key={p.playerId} player={p} />)
            ) : (
                <p>Không có cầu thủ nào.</p>
            )}
        </div>
    );
};

export default PlayerList;
