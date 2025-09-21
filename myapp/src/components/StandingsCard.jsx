import React from "react";
import { Card, Table } from "react-bootstrap";

export default function StandingsCard({ standings }) {
  return (
    <Card className="standings-card">
      <div className="standings-header">Premier League Standings</div>
      <div className="standings-scroll">
        <Table hover responsive size="sm" className="standings-table mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Club</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.rank}>
                <td>{team.rank}</td>
                <td>{team.club}</td>
                <td><strong>{team.points}</strong></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
