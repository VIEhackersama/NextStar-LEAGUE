import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

function HistoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <img
        src="image/history2.png"
        alt="Premier League History"
        className="w-100 mb-4"
      />
      <Container className="py-5">
        <Row>
          <Col>
            <h2 className="fw-bold mb-4 text-center">History of Premier League</h2>
            <Card className="shadow-lg border-0 p-4 rounded-4">
              <Card.Body>
                <p>
                  The Premier League is a professional association football league in England and the highest level of the English football league system. Contested by 20 clubs, it operates on a system of promotion and relegation with the English Football League (EFL). Seasons usually run from August to May, with each team playing 38 matches: two against each other team, one home and one away.[1] Most games are played on weekend afternoons, with occasional weekday evening fixtures.[2] The competition was founded as the FA Premier League on 20 February 1992, following the decision of clubs from the First Division (the top tier since 1888) to break away from the English Football League. Teams are still promoted and relegated to and from the EFL Championship each season. The Premier League is a corporation managed by a chief executive, with member clubs as shareholders.[3] The Premier League takes advantage of a £5 billion domestic television rights deal, with Sky and BT Group broadcasting 128 and 32 games, respectively.[4][5] This will rise to £6.7 billion from 2025 to 2029.[6] In the 2022–2025 cycle, the Premier League earned a record £5.6 billion from international rights.[7] As of 2023–24, Premier League clubs received central payments totalling £2.8 billion, with additional solidarity payments made to relegated EFL clubs.[8] The Premier League is the most-watched sports league in the world, broadcast in 212 territories to 643 million homes, with a potential TV audience of 4.7 billion people.[9][10] As of the 2024–25 season, the Premier League has the highest average and aggregate match attendance of any association football league in the world, at 40,421 per game.[11][12] Most stadiums operate close to full capacity.[13] The Premier League is currently ranked first in the UEFA coefficient rankings based on performances in European competitions over the past five seasons, ahead of Italy's Serie A.[14] The English top-flight has produced the second-highest number of European Cup / UEFA Champions League titles, with a record six English clubs having won fifteen European cups in total.[15] Fifty-one clubs have competed in the Premier League since its inception in 1992: 49 from England and two from Wales. Seven have won the title: Manchester United (13), Manchester City (8), Chelsea (5), Arsenal (3), Liverpool (2), Blackburn Rovers (1) and Leicester City (1).[16] Only six clubs have played in every season to date: Arsenal, Chelsea, Everton, Liverpool, Manchester United, and Tottenham Hotspur.[17] History
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default HistoryPage;