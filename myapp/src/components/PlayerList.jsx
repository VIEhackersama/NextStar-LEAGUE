import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";
import { getAuth } from "../services/auth";
import { motion } from "framer-motion";
import { Button, Card } from "react-bootstrap";

const PlayerList = ({ clubId }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useState(getAuth());

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const auth = getAuth();
                const token = auth?.token;
                const url = clubId
                    ? `http://localhost:8080/api/clubs/${clubId}/players`
                    : `http://localhost:8080/api/players`;

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPlayers(res.data);
            } catch (err) {
                console.error("Featch error:", err);
                setError("Cannot load the list");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [clubId]);

    if (loading) return <p>Loading...</p>;

    if (!auth) {
        return (
            <motion.div className="container" initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <Card className="pf-composer card shadow-sm mb-4">
                    <Card.Body>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h5
                                    className="mb-1"
                                    style={{ color: "#ffd34d", fontWeight: 700 }}
                                >
                                    Explore your favorite players easy and fast, with an account!
                                </h5>
                                <div className="help">You need to sign in to post.</div>
                            </div>
                            <Button className="btn-auth" variant="warning" href="/login">
                                Sign in
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </motion.div>
        );
    }
    return (
        <div className="player-grid">
            {players.length > 0 ? (
                players.map((p) => <PlayerCard key={p.playerid} player={p} />)
            ) : (
                <p>Không có cầu thủ nào.</p>
            )}
        </div>
    );
};

export default PlayerList;
