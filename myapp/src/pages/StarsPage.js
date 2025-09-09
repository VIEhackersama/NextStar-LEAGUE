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
      "Một trong những tiền đạo nguy hiểm nhất thế giới. Nổi tiếng với khả năng định vị thông minh, tốc độ bùng nổ và kỹ năng dứt điểm đáng kinh ngạc. Haaland đã phá kỷ lục ghi 36 bàn trong một mùa giải Premier League (2022/23).",
    image: "/image/haaland.webp",
  },
  {
    name: "Mohamed Salah",
    club: "Liverpool",
    position: "Right Winger",
    highlights:
      "Được mệnh danh là 'Vua Ai Cập', Salah là một biểu tượng của Liverpool. Nổi tiếng với tốc độ, kỹ năng rê dắt và khả năng ghi bàn ổn định. Anh đã giành nhiều Chiếc giày vàng và đóng vai trò quan trọng trong các chiến thắng tại Premier League và Champions League của Liverpool.",
    image: "/image/salah.jpg",
  },
  {
    name: "Bruno Fernandes",
    club: "Manchester United",
    position: "Attacking Midfielder",
    highlights:
      "Nhà kiến tạo và thủ lĩnh của Manchester United. Nổi tiếng với tầm nhìn, sự sáng tạo và khả năng ghi bàn từ tuyến giữa. Fernandes cũng nổi tiếng với kỹ năng sút phạt đền và tầm ảnh hưởng lớn trong các trận đấu lớn.",
    image: "/image/bruno.jpg",
  },
  {
    name: "Bukayo Saka",
    club: "Arsenal",
    position: "Right Winger",
    highlights:
      "Ngôi sao của Arsenal và là sản phẩm của học viện đào tạo trẻ. Nổi tiếng với tốc độ, kỹ năng rê dắt và khả năng ghi bàn. Một nhân tố chủ chốt trong hàng công của Arsenal.",
    image: "/image/BukayoSaka.png",
  },
  {
    name: "Ollie Watkins",
    club: "Aston Villa",
    position: "Striker",
    highlights:
      "Một chân sút cừ khôi và là một trong những tiền đạo nguy hiểm nhất giải đấu. Tinh thần làm việc không mệt mỏi và khả năng dứt điểm lạnh lùng của anh rất quan trọng đối với thành công của Villa.",
    image: "/image/OllieWatkins.png",
  },
  {
    name: "Justin Kluivert",
    club: "AFC Bournemouth",
    position: "Forward",
    highlights:
      "Tiền đạo người Hà Lan là cầu thủ được người hâm mộ yêu thích, nổi tiếng với tốc độ, kỹ năng rê dắt không biết sợ và khả năng ghi bàn. Anh đã được bình chọn là Cầu thủ xuất sắc nhất mùa giải của Junior Cherries.",
    image: "/image/JustinKluivert.png",
  },
  {
    name: "Bryan Mbeumo",
    club: "Brentford",
    position: "Forward",
    highlights:
      "Mbeumo là một tiền đạo năng động, nổi tiếng với khả năng ghi bàn và lối chơi sáng tạo. Anh luôn là một cầu thủ chủ chốt trong hàng công của Brentford.",
    image: "/image/BryanMbeumo.png",
  },
  {
    name: "Yankuba Minteh",
    club: "Brighton & Hove Albion",
    position: "Right Winger",
    highlights:
      "Một tài năng trẻ đầy hứa hẹn, đã tạo ra ảnh hưởng đáng kể ở cánh phải. Minteh là một cầu thủ chạy cánh có tốc độ cao và tiềm năng lớn.",
    image: "/image/YankubaMinteh.png",
  },
  {
    name: "Cole Palmer",
    club: "Chelsea",
    position: "Attacking Midfielder",
    highlights:
      "Một tài năng nổi bật, nhanh chóng trở thành cầu thủ quan trọng nhất của Chelsea. Palmer nổi tiếng với sự điềm tĩnh, sáng tạo và khả năng ghi bàn đáng kinh ngạc từ tuyến giữa.",
    image: "/image/ColePalmer.png",
  },
  {
    name: "Daniel Muñoz",
    club: "Crystal Palace",
    position: "Defender",
    highlights:
      "Được bình chọn là Cầu thủ xuất sắc nhất mùa giải của câu lạc bộ. Hậu vệ người Colombia luôn có mặt trong đội hình chính, nổi tiếng với tinh thần làm việc và đóng góp đáng kể ở cả hàng thủ và hàng công.",
    image: "/image/DanielMuñoz.png",
  },
  {
    name: "Jordan Pickford",
    club: "Everton",
    position: "Goalkeeper",
    highlights:
      "Một nhân tố chủ chốt của Everton, nổi tiếng với những pha cứu thua quan trọng và vai trò thủ lĩnh. Anh được coi là một trong những thủ môn xuất sắc nhất Premier League.",
    image: "/image/JordanPickford.png",
  },
  {
    name: "Raúl Jiménez",
    club: "Fulham",
    position: "Striker",
    highlights:
      "Chân sút hàng đầu của đội trong mùa giải 2024/25. Jiménez là một sự hiện diện đáng tin cậy trên hàng công, dẫn dắt hàng tiền đạo và mang lại những bàn thắng quan trọng cho Fulham.",
    image: "/image/RaúlJiménez.png",
  },
  {
    name: "Bruno Guimarães",
    club: "Newcastle United",
    position: "Midfielder",
    highlights:
      "Tiền vệ người Brazil là 'động cơ' của Newcastle. Một cầu thủ có kỹ thuật xuất sắc, tinh thần làm việc cao và khả năng chuyền bóng tuyệt vời. Anh đóng vai trò then chốt trong cả phòng ngự và tấn công.",
    image: "/image/BrunoGuimarães.png",
  },
  {
    name: "Nikola Milenković",
    club: "Nottingham Forest",
    position: "Defender",
    highlights:
      "Được bình chọn là Cầu thủ xuất sắc nhất mùa giải của Nottingham Forest. Hậu vệ người Serbia là một sự hiện diện đầy uy quyền trong phòng ngự, nổi tiếng với khả năng không chiến và cản phá.",
    image: "/image/NikolaMilenković.png",
  },
  {
    name: "Aaron Ramsdale",
    club: "Southampton",
    position: "Goalkeeper",
    highlights:
      "Một thủ môn đáng tin cậy và có uy lực, đã chứng minh được phẩm chất của mình ở đẳng cấp cao nhất. Anh là một nhân tố chủ chốt trong hàng phòng ngự của Southampton.",
    image: "/image/AaronRamsdale.png",
  },
  {
    name: "Son Heung-min",
    club: "Tottenham Hotspur",
    position: "Forward",
    highlights:
      "Đội trưởng và là bùa hộ mệnh của Tottenham. Son là một cầu thủ đa năng, sử dụng cả hai chân, nổi tiếng với tốc độ bùng nổ, khả năng dứt điểm chuẩn xác và ghi bàn ổn định.",
    image: "/image/SonHeung-min.png",
  },
  {
    name: "Jarrod Bowen",
    club: "West Ham United",
    position: "Right Winger",
    highlights:
      "Một tiền đạo có tầm ảnh hưởng với tinh thần làm việc đáng nể và khả năng ghi những bàn thắng quan trọng. Anh đóng vai trò then chốt trong thành công gần đây của West Ham tại đấu trường châu Âu.",
    image: "/image/JarrodBowen.png",
  },
  {
    name: "Matheus Cunha",
    club: "Wolverhampton Wanderers",
    position: "Forward",
    highlights:
      "Một tiền đạo năng động dẫn dắt hàng công của Wolves. Cunha nổi tiếng với những pha chạy chỗ mạnh mẽ và dứt điểm chính xác, là mối đe dọa tấn công chính của đội.",
    image: "/image/MatheusCunha.png",
  },
  {
    name: "Ross Barkley",
    club: "Luton Town",
    position: "Midfielder",
    highlights:
      "Một tiền vệ giàu kinh nghiệm và sáng tạo, đã trở thành thủ lĩnh hàng tiền vệ của Luton. Tầm nhìn và kỹ thuật của anh rất quan trọng đối với đội bóng ở Premier League.",
    image: "/image/RossBarkley.png",
  },
  {
    name: "Kieffer Moore",
    club: "Sheffield United",
    position: "Striker",
    highlights:
      "Một tiền đạo mạnh mẽ và giàu kinh nghiệm. Moore là một cầu thủ có thể hình tốt, nổi tiếng với khả năng không chiến và ghi bàn, tạo ra một lựa chọn tấn công quan trọng cho The Blades.",
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
                        React.createElement("strong", null, "Câu lạc bộ:"),
                        ` ${player.club}`,
                        React.createElement("br"),
                        React.createElement("strong", null, "Vị trí:"),
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