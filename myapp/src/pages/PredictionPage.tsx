import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  readPicks,
  savePick,
  clearAllPicks,
  isExpired,
  timeLeftText,
  PickValue,
} from "../services/prediction";
import { getAuth } from "../services/auth"; // <-- thêm
import matches from "../assets/data/match.json";
import "../styles/prediction.css";

type Match = {
  id: string;
  teamA: { name: string; img: string };
  teamB: { name: string; img: string };
  endAt: string; // ISO
};

export default function PredictionsPage() {
  const [picks, setPicks] = useState<Record<string, PickValue>>({});
  const [now, setNow] = useState(Date.now());
  const [auth, setAuth] = useState(getAuth()); // <-- thêm

  useEffect(() => {
    setPicks(readPicks());
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const list: Match[] = useMemo(() => (matches as Match[]) || [], []);

  function pick(id: string, v: PickValue, ended: boolean) {
    if (ended) return;
    savePick(id, v);
    setPicks(readPicks());
  }
  function resetAll() {
    clearAllPicks();
    setPicks({});
  }

  // =================== GUARD: yêu cầu đăng nhập ===================
  if (!auth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="pred-bg"
      >
        <Container className="pred-wrap">
          <Card
            className="pf-composer card shadow-sm" /* tái dùng style composer để đồng bộ */
          >
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h5
                  style={{ color: "#ffd34d", fontWeight: 700 }}
                  className="mb-1"
                >
                  Match Predictions
                </h5>
                <div className="muted">
                  You need to sign in to make predictions.
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button href="/login" variant="warning" className="btn-auth">
                  Sign in
                </Button>
                {/* <Button
                  href="/register"
                  variant="outline-light"
                  className="btn-auth"
                >
                  Create account
                </Button> */}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </motion.div>
    );
  }
  // ===============================================================

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pred-bg"
    >
      <Container className="pred-wrap">
        <div className="pred-header">
          <h2 className="pred-title">Match Predictions</h2>
          <div className="pred-actions">
            <Button
              variant="outline-light"
              className="btn-auth"
              onClick={resetAll}
            >
              Clear my picks
            </Button>
          </div>
        </div>

        <Row className="g-4">
          {list.map((m) => {
            const ended = isExpired(m.endAt);
            const left = timeLeftText(m.endAt);
            const myPick = picks[m.id];
            return (
              <Col key={m.id} xs={12} md={6} xl={4}>
                <Card
                  className={`pred-card shadow-sm ${ended ? "is-closed" : ""}`}
                >
                  <div className="pred-hero">
                    <div className="team">
                      <img src={m.teamA.img} alt={m.teamA.name} />
                      <div className="team-name">{m.teamA.name}</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <img src={m.teamB.img} alt={m.teamB.name} />
                      <div className="team-name">{m.teamB.name}</div>
                    </div>
                  </div>

                  <Card.Body className="pred-body">
                    <div className="pred-deadline">
                      <Badge bg="" className="badge-glass">
                        {ended ? "Closed" : "Ends in " + left}
                      </Badge>
                      <span className="muted">
                        {new Date(m.endAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="pred-buttons">
                      <Button
                        variant={myPick === "A" ? "warning" : "outline-light"}
                        className={`btn-auth pred-btn ${
                          myPick === "A" ? "picked" : ""
                        }`}
                        onClick={() => pick(m.id, "A", ended)}
                        disabled={ended}
                        title={`${m.teamA.name} win`}
                      >
                        {m.teamA.name}
                      </Button>
                      <Button
                        variant={myPick === "D" ? "warning" : "outline-light"}
                        className={`btn-auth pred-btn ${
                          myPick === "D" ? "picked" : ""
                        }`}
                        onClick={() => pick(m.id, "D", ended)}
                        disabled={ended}
                        title="Draw"
                      >
                        Draw
                      </Button>
                      <Button
                        variant={myPick === "B" ? "warning" : "outline-light"}
                        className={`btn-auth pred-btn ${
                          myPick === "B" ? "picked" : ""
                        }`}
                        onClick={() => pick(m.id, "B", ended)}
                        disabled={ended}
                        title={`${m.teamB.name} win`}
                      >
                        {m.teamB.name}
                      </Button>
                    </div>

                    <div className="pred-note">
                      {myPick ? (
                        <span>
                          Your pick:{" "}
                          <b>
                            {myPick === "A"
                              ? m.teamA.name
                              : myPick === "B"
                              ? m.teamB.name
                              : "Draw"}
                          </b>
                        </span>
                      ) : (
                        <span className="muted">
                          Choose your prediction before the deadline.
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </motion.div>
  );
}
