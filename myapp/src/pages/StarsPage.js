import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "../styles/StarsPage.css";

const premierLeagueStars = [
  {
    name: "Erling Haaland",
    club: "Manchester City",
    position: "Striker",
    highlights:
      "One of the most dangerous strikers in the world. Renowned for intelligent movement, explosive pace, and remarkable finishing. He broke the Premier League single-season record with 36 goals (2022/23).",
    image: "/image/haaland.webp",
  },
  {
    name: "Mohamed Salah",
    club: "Liverpool",
    position: "Right Winger",
    highlights:
      "Nicknamed the 'Egyptian King,' Salah is a Liverpool icon. Known for his pace, dribbling, and consistent goal scoring. He has won multiple Golden Boots and played a key role in Liverpool’s Premier League and Champions League triumphs.",
    image: "/image/salah.jpg",
  },
  {
    name: "Bruno Fernandes",
    club: "Manchester United",
    position: "Attacking Midfielder",
    highlights:
      "Manchester United’s chief creator and leader. Known for vision, creativity, and goals from midfield. Also noted for penalty-taking and big-game influence.",
    image: "/image/bruno.jpg",
  },
  {
    name: "Bukayo Saka",
    club: "Arsenal",
    position: "Right Winger",
    highlights:
      "Arsenal’s star and a Hale End academy graduate. Known for pace, dribbling, and goal threat. A key figure in Arsenal’s attack.",
    image: "/image/BukayoSaka.png",
  },
  {
    name: "Ollie Watkins",
    club: "Aston Villa",
    position: "Striker",
    highlights:
      "A prolific finisher and one of the league’s most dangerous strikers. His tireless work rate and clinical finishing are vital to Villa’s success.",
    image: "/image/OllieWatkins.png",
  },
  {
    name: "Justin Kluivert",
    club: "AFC Bournemouth",
    position: "Forward",
    highlights:
      "The Dutch forward is a fan favorite, known for blistering speed, fearless dribbling, and goals. Voted Junior Cherries Player of the Season.",
    image: "/image/JustinKluivert.png",
  },
  {
    name: "Bryan Mbeumo",
    club: "Brentford",
    position: "Forward",
    highlights:
      "A dynamic forward known for goal scoring and creativity. Consistently a key piece in Brentford’s attack.",
    image: "/image/BryanMbeumo.png",
  },
  {
    name: "Yankuba Minteh",
    club: "Brighton & Hove Albion",
    position: "Right Winger",
    highlights:
      "A highly promising young talent who has made a notable impact on the right flank. A rapid winger with big potential.",
    image: "/image/YankubaMinteh.png",
  },
  {
    name: "Cole Palmer",
    club: "Chelsea",
    position: "Attacking Midfielder",
    highlights:
      "A breakout talent who quickly became Chelsea’s most important player. Praised for composure, invention, and an outstanding goal return from midfield.",
    image: "/image/ColePalmer.png",
  },
  {
    name: "Daniel Muñoz",
    club: "Crystal Palace",
    position: "Defender",
    highlights:
      "Voted the club’s Player of the Season. The Colombian full-back is a constant starter, renowned for work rate and contributions at both ends.",
    image: "/image/DanielMuñoz.png",
  },
  {
    name: "Jordan Pickford",
    club: "Everton",
    position: "Goalkeeper",
    highlights:
      "A cornerstone for Everton, famed for crucial saves and leadership. Widely regarded as one of the Premier League’s top goalkeepers.",
    image: "/image/JordanPickford.png",
  },
  {
    name: "Raúl Jiménez",
    club: "Fulham",
    position: "Striker",
    highlights:
      "The team’s leading scorer in 2024/25. A reliable presence up front, spearheading the attack and delivering vital goals for Fulham.",
    image: "/image/RaúlJiménez.png",
  },
  {
    name: "Bruno Guimarães",
    club: "Newcastle United",
    position: "Midfielder",
    highlights:
      "The Brazilian midfielder is Newcastle’s engine—technically superb, tireless, and an excellent passer. Pivotal in both defense and attack.",
    image: "/image/BrunoGuimarães.png",
  },
  {
    name: "Nikola Milenković",
    club: "Nottingham Forest",
    position: "Defender",
    highlights:
      "Voted Nottingham Forest’s Player of the Season. The Serbian center-back is a commanding defensive presence, noted for aerial prowess and tackling.",
    image: "/image/NikolaMilenković.png",
  },
  {
    name: "Aaron Ramsdale",
    club: "Southampton",
    position: "Goalkeeper",
    highlights:
      "A reliable, authoritative goalkeeper who has proved himself at the highest level. A key pillar of Southampton’s defense.",
    image: "/image/AaronRamsdale.png",
  },
  {
    name: "Son Heung-min",
    club: "Tottenham Hotspur",
    position: "Forward",
    highlights:
      "Tottenham’s captain and talisman. A two-footed, versatile forward known for explosive speed, precise finishing, and consistent scoring.",
    image: "/image/SonHeung-min.png",
  },
  {
    name: "Jarrod Bowen",
    club: "West Ham United",
    position: "Right Winger",
    highlights:
      "An influential forward with a relentless work rate and a knack for clutch goals. Key to West Ham’s recent European success.",
    image: "/image/JarrodBowen.png",
  },
  {
    name: "Matheus Cunha",
    club: "Wolverhampton Wanderers",
    position: "Forward",
    highlights:
      "A dynamic forward spearheading Wolves’ attack. Known for powerful runs and accurate finishing—the team’s primary threat.",
    image: "/image/MatheusCunha.png",
  },
  {
    name: "Ross Barkley",
    club: "Luton Town",
    position: "Midfielder",
    highlights:
      "An experienced, creative midfielder who has become Luton’s midfield leader. His vision and technique are vital to their Premier League push.",
    image: "/image/RossBarkley.png",
  },
  {
    name: "Kieffer Moore",
    club: "Sheffield United",
    position: "Striker",
    highlights:
      "A powerful, seasoned striker. Strong in the air and a reliable scorer, providing a crucial attacking option for the Blades.",
    image: "/image/KiefferMoore.png",
  },
];

function StarsPage() {
  return React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "stars-page position-relative text-center",
    },
    React.createElement("img", {
      src: "myapp/public/image/arsenal.png",
      alt: "Premier League Stars",
      className: "stars-bg w-100 vh-100 object-fit-cover",
    }),
    React.createElement(
      "div",
      { className: "py-5 stars-content-overlay" },
      React.createElement(
        Container,
        null,
        React.createElement(
          Row,
          null,
          React.createElement(
            Col,
            null,
            React.createElement(
              "h2",
              {
                className: "fw-bold mb-5 text-center text-white text-shadow-lg",
              },
              "Premier League Stars ✨"
            ),
            React.createElement(
              Row,
              { className: "g-4" },
              premierLeagueStars.map((player, index) =>
                React.createElement(
                  Col,
                  { key: index, sm: 6, md: 4, lg: 3 },
                  React.createElement(
                    Card,
                    { className: "star-card shadow-lg border-0 rounded-4 h-100" },
                    React.createElement(
                      Card.Header,
                      { className: "bg-white border-0 p-0" },
                      React.createElement(Card.Img, {
                        variant: "top",
                        src: player.image,
                        alt: player.name,
                        className: "rounded-top-4 player-image",
                      })
                    ),
                    React.createElement(
                      Card.Body,
                      {
                        className:
                          "p-4 d-flex flex-column align-items-center justify-content-center",
                      },
                      React.createElement(
                        Card.Title,
                        { className: "fw-bold mb-1" },
                        player.name
                      ),
                      React.createElement(
                        Card.Text,
                        { className: "mb-2" },
                        React.createElement("strong", null, "Club:"),
                        ` ${player.club}`,
                        React.createElement("br"),
                        React.createElement("strong", null, "Position:"),
                        ` ${player.position}`
                      ),
                      React.createElement(
                        "p",
                        { className: "card-highlights" },
                        player.highlights
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

export default StarsPage;