-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2025 at 05:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextstarleague`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `user_id`, `email`, `password_hash`, `created_at`, `is_admin`, `is_active`, `last_login`, `updated_at`) VALUES
(2, 1, 'admin@example.cum', '$2a$10$Dow1RLRM09I/TDX1O5x2GuSLE2YJixgQ0I8FdxvKNoAVy89gK2tW2', '2025-09-04 19:23:48', 1, 1, NULL, '2025-09-22 17:05:50'),
(5, 14, 'dongpham@example.com', '$2a$10$Z1uXFKSKQGy9HoNMYk8OJOtpXF36GsNJhgJGuIR.s5ua1xe75nfDa', '2025-09-18 22:01:48', 0, 1, '2025-09-18 22:02:30', NULL),
(6, 15, 'hai@gmail.com', '$2a$10$coSLUIgBbapj69g2rxhUE.ILsRTrZhEVxKqla.V8B40srS9DRQ1Wq', '2025-09-18 22:21:08', 0, 1, '2025-09-22 15:57:00', NULL),
(7, 16, 'haile@gmail.com', '$2a$10$L7v2hKEoaxMuHbFCgPnmM.EGYYBqyv95I2pmodVzy.vyGvqXJv.56', '2025-09-19 21:53:54', 0, 1, '2025-09-21 21:55:55', NULL),
(8, 17, 'dongphamhai@gmail.com', '$2a$10$GeWjZML.09EZPEGBM4cT8uPqKAhdlm7fuQeFT0rF802nhICtNHjga', '2025-09-21 15:57:26', 0, 1, '2025-09-22 11:51:15', NULL),
(9, 18, 'admin@example.com', '$2a$10$vPFddY6qhues89ICmvORueRrrw.oyjWoAgXs6j.7qmWa1BN2oEkly', '2025-09-22 17:06:38', 1, 1, '2025-09-26 20:21:56', '2025-09-22 17:06:53'),
(10, 19, 'huy3@gmail.com', '$2a$10$oHGyWRUL0xdZL.Caq6Zxh.Bod/J.OeK8apUeDvNxdoG4sYZMPPq8O', '2025-09-22 20:40:35', 0, 1, '2025-09-22 20:40:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `account_roles`
--

CREATE TABLE `account_roles` (
  `account_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_roles`
--

INSERT INTO `account_roles` (`account_id`, `role_id`) VALUES
(2, 1),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 1),
(10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `club_id` int(11) NOT NULL,
  `club_name` varchar(100) NOT NULL,
  `club_icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`club_id`, `club_name`, `club_icon`) VALUES
(1, 'Chelsea', 'https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.svg.png'),
(2, 'Aston Villa', 'https://upload.wikimedia.org/wikipedia/vi/f/f4/Aston_Villa_FC_new_crest.png'),
(3, 'Bournemouth', 'https://upload.wikimedia.org/wikipedia/vi/5/53/AFC_Bournemouth_%282013%29.png'),
(4, 'Manchester United', 'https://upload.wikimedia.org/wikipedia/vi/a/a1/Man_Utd_FC_.svg'),
(5, 'Brighton & Hove Albion', 'https://upload.wikimedia.org/wikipedia/vi/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png'),
(6, 'Arsenal', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1021px-Arsenal_FC.svg.png'),
(7, 'Crystal Palace', '/image/crystalpalace.png'),
(8, 'Everton', '/image/everton.png'),
(9, 'Fulham', '/image/fullham.png'),
(10, 'Liverpool', '/image/liverpool.png'),
(11, 'Manchester City', 'https://upload.wikimedia.org/wikipedia/vi/thumb/1/1d/Manchester_City_FC_logo.svg/1200px-Manchester_City_FC_logo.svg.png'),
(12, 'Brentford', '/image/brentford.png'),
(13, 'Newcastle United', '/image/newcastle.png'),
(14, 'Nottingham Forest', '/image/nottinghamforest.png'),
(15, 'Southampton', '/image/southampton.png'),
(16, 'Tottenham Hotspur', '/image/tottenham.png'),
(17, 'West Ham United', '/image/westham.png'),
(18, 'Wolverhampton Wanderers', '/image/wolverhampton.png'),
(19, 'Luton Town', '/image/lutontown.png'),
(20, 'Sheffield United', '/image/sheffield.png');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `country_name` varchar(100) NOT NULL,
  `country_flag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`country_id`, `country_name`, `country_flag`) VALUES
(1, 'Argentina', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png'),
(2, 'Portugal', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Flag_of_Portugal_%28official%29.svg/1200px-Flag_of_Portugal_%28official%29.svg.png'),
(3, 'Brazil', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png'),
(4, 'France', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/2560px-Flag_of_France.svg.png'),
(5, 'Germany', 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'),
(6, 'England', 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg'),
(7, 'Norway', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg'),
(8, 'Ukraine', 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg'),
(9, 'Netherlands', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg'),
(10, 'Ghana', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg'),
(11, 'Belgium', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg'),
(12, 'Spain', 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `full_name` text NOT NULL,
  `email` text NOT NULL,
  `topic` text DEFAULT NULL,
  `club` text DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ownership`
--

CREATE TABLE `ownership` (
  `user_id` int(11) NOT NULL,
  `result` int(11) NOT NULL,
  `club_id_1` int(11) DEFAULT NULL,
  `club_id_2` int(11) DEFAULT NULL,
  `acquired_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `rating` tinyint(4) NOT NULL CHECK (`rating` between 1 and 99),
  `position_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` bigint(20) NOT NULL CHECK (`price` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `full_name`, `rating`, `position_id`, `country_id`, `club_id`, `image_url`, `price`) VALUES
(7, 'David Raya', 85, 1, 7, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/RAYA_Headshot_web_njztl3wr.png?h=ad73a5fe&auto=webp&itok=V2bdCOQy', 40000000),
(8, 'Ben White', 84, 2, 6, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/B.WHITE_Headshot_web_xdbqzl78.png?h=ad73a5fe&auto=webp&itok=lrzd6M8v', 50000000),
(9, 'William Saliba', 86, 3, 4, 6, 'https://www.arsenal.com/sites/default/files/styles/desktop_16x9/public/images/SALIBA_Headshot_web_khl9z1vw.png?h=ad73a5fe&auto=webp&itok=Kd_KpCDt', 95000000),
(10, 'Gabriel Magalhães', 85, 3, 3, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/MAGALHAES_Headshot_web_uhkgt913.png?h=ad73a5fe&auto=webp&itok=AbpWH11U', 65000000),
(11, 'Oleksandr Zinchenko', 82, 2, 9, 6, 'https://cdn-img.zerozero.pt/img/jogadores/new/45/50/364550_oleksandr_zinchenko_20240817003516.png', 40000000),
(12, 'Declan Rice', 87, 6, 6, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/RICE_Headshot_web_ml5vq29g.png?h=ad73a5fe&auto=webp&itok=1rh28pbj', 115000000),
(13, 'Martin Ødegaard', 87, 7, 8, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/ODEGAARD_Headshot_web_z0tram3m.png?h=ad73a5fe&auto=webp&itok=Of2W460g', 110000000),
(14, 'Kai Havertz', 84, 7, 5, 6, 'https://www.arsenal.com/sites/default/files/styles/desktop_16x9/public/images/HAVERTZ_Headshot_web_frc1i8l3.png?h=ad73a5fe&auto=webp&itok=hfUPOwsm', 60000000),
(15, 'Bukayo Saka', 88, 8, 6, 6, 'https://static.bongda24h.vn/medias/original/2025/08/18/bukayo-saka-1808110503.jpg', 120000000),
(16, 'Gabriel Jesus', 85, 5, 3, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/JESUS_Headshot_web_wtybpitx.png?h=ad73a5fe&auto=webp&itok=J0w-h-r3', 90000000),
(17, 'Gabriel Martinelli', 86, 9, 3, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/MARTINELLI_Headshot_web_l7r7lao5.png?h=ad73a5fe&auto=webp&itok=bG9wuCBS', 95000000),
(18, 'Jurrien Timber', 82, 2, 10, 6, 'https://static.bongda24h.vn/medias/original/2025/08/18/jurrien-timber-1808091049.jpg', 35000000),
(19, 'Thomas Partey', 84, 6, 11, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoaIEsfIuQ96rcL5DI9XEO-eAXO2hTyV6sQ&s', 30000000),
(20, 'Leandro Trossard', 83, 9, 12, 6, 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/TROSSARD_Headshot_web_c75bgy21.png?h=ad73a5fe&auto=webp&itok=J1hTQkiH', 35000000),
(21, 'Altay Bayındır', 83, 1, 9, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463986/1-Altay-Bayindir1751365341057.png', 8000000),
(22, 'Tom Heaton', 78, 1, 10, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjcauRSpvR-LXS-D39WUKkIWpa2rwiCkUEBg&s', 200000),
(23, 'Senne Lammens', 80, 1, 7, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/207/1494871/SL-PlayerProfle-Cutout1756802312073.png', 18100000),
(24, 'Diogo Dalot', 82, 6, 2, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463996/20-Diogo-Dalot1751370735578.png', 30000000),
(25, 'Noussair Mazraoui', 81, 6, 12, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463989/3-Noussair-Mazraoui1751367211444.png', 25000000),
(26, 'Matthijs de Ligt', 88, 8, 3, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463990/4-Matthijs-DeLigt1751367748460.png', 38000000),
(27, 'Harry Maguire', 83, 8, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463991/5-Harry-Maguire1751368300280.png', 13000000),
(28, 'Lisandro Martínez', 84, 8, 5, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463992/6-Lisandro-Martinez1751369212439.png', 40000000),
(29, 'Luke Shaw', 85, 7, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463997/23-Luke-Shaw1751371146122.png', 25000000),
(30, 'Tyrell Malacia', 82, 7, 6, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1463993/12-Tyrell-Malacia1751369635171.png', 20000000),
(31, 'Rhys Bennett', 78, 8, 10, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREVh_2CXKd020uOoI9SmmpUVO_9mruf5DlTQ&s', 5000000),
(32, 'Casemiro', 87, 9, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464003/18-Casemiro1751376486567.png', 45000000),
(33, 'Bruno Fernandes', 88, 11, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464002/8-Bruno-Fernandes1751376414332.png', 60000000),
(34, 'Mason Mount', 86, 10, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464001/7-Mason-Mount1751376324854.png', 50000000),
(35, 'Manuel Ugarte', 85, 9, 12, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464004/25-Manuel-Ugarte1751376544180.png', 45000000),
(36, 'Kobbie Mainoo', 80, 10, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464005/37-Kobbie-Mainoo1751376603962.png', 10000000),
(37, 'Matheus Cunha', 86, 4, 10, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQck0OwQZpRKXnpvlqJ7sAsf3P_GNRRM7qYxg&s', 62500000),
(38, 'Bryan Mbeumo', 85, 4, 12, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/99/1467343/BM-PlayerProfle-Cutout1753177567514.png', 65000000),
(39, 'Benjamin Šeško', 87, 5, 3, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdKLWs2XZUOz5QBTQ8CMY9Z9KGgCz6llH95A&s', 66300000),
(40, 'Joshua Zirkzee', 84, 5, 10, 4, 'https://assets.manutd.com/AssetPicker/images/0/0/22/86/1464010/11-Joshua-Zirkzee1751380664807.png', 35000000),
(41, 'Amad Diallo', 83, 12, 10, 4, 'https://img.a.transfermarkt.technology/portrait/big/536835-1747857754.jpg?lm=1', 25000000),
(42, 'Donnaruma', 88, 1, 7, 11, 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/9/1/donnarumma-ky-5-nam-voi-man-city-luong-cao-ngat-nguong-1910.jpg?width=0&s=chPSFBgKJsDnV4vh9h8ojQ', 50000000),
(43, 'Kyle Walker', 84, 6, 6, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0_89Lhb7N_jp9LW_H1C8RPqZT498KjhfYg&s', 55000000),
(44, 'Ruben Dias', 89, 8, 4, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtxuaRj3G5QG9Oxq8cA8LKH51G-S7_akp_KA&s', 100000000),
(45, 'Joao Cancelo', 87, 7, 5, 11, 'https://img.uefa.com/imgml/TP/players/2014/2025/cutoff/250024746.webp', 90000000),
(46, 'Kevin De Bruyne', 91, 10, 9, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCTkdAHJDa68B5DpJzOEDpZIPJ_e3b9J4SyA&s', 120000000),
(47, 'Phil Foden', 88, 11, 6, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gW519T6M0fZ2TQPRM6FYFt3hks_T6kI7iw&s', 110000000),
(48, 'Erling Haaland', 92, 5, 10, 11, 'https://www.mancity.com/meta/media/5ikhkaqk/erling-haaland.png', 150000000);

-- --------------------------------------------------------

--
-- Table structure for table `player_stats`
--

CREATE TABLE `player_stats` (
  `player_id` int(11) NOT NULL,
  `stat_type_id` int(11) NOT NULL,
  `stat_value` tinyint(4) NOT NULL CHECK (`stat_value` between 1 and 99)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_stats`
--

INSERT INTO `player_stats` (`player_id`, `stat_type_id`, `stat_value`) VALUES
(7, 1, 50),
(7, 2, 20),
(7, 3, 60),
(7, 4, 85),
(7, 5, 75),
(8, 1, 70),
(8, 2, 65),
(8, 3, 70),
(8, 4, 78),
(8, 5, 72),
(9, 1, 72),
(9, 2, 60),
(9, 3, 68),
(9, 4, 82),
(9, 5, 77),
(10, 1, 70),
(10, 2, 58),
(10, 3, 65),
(10, 4, 80),
(10, 5, 75),
(11, 1, 75),
(11, 2, 72),
(11, 3, 80),
(11, 4, 70),
(11, 5, 68),
(12, 1, 74),
(12, 2, 70),
(12, 3, 78),
(12, 4, 80),
(12, 5, 85),
(13, 1, 76),
(13, 2, 82),
(13, 3, 88),
(13, 4, 60),
(13, 5, 70),
(14, 1, 78),
(14, 2, 81),
(14, 3, 84),
(14, 4, 65),
(14, 5, 72),
(15, 1, 88),
(15, 2, 85),
(15, 3, 86),
(15, 4, 70),
(15, 5, 80),
(16, 1, 90),
(16, 2, 84),
(16, 3, 82),
(16, 4, 60),
(16, 5, 75),
(17, 1, 88),
(17, 2, 86),
(17, 3, 80),
(17, 4, 62),
(17, 5, 78),
(18, 1, 76),
(18, 2, 65),
(18, 3, 70),
(18, 4, 80),
(18, 5, 72),
(19, 1, 70),
(19, 2, 68),
(19, 3, 75),
(19, 4, 78),
(19, 5, 80),
(20, 1, 80),
(20, 2, 82),
(20, 3, 84),
(20, 4, 65),
(20, 5, 72),
(42, 1, 50),
(42, 2, 20),
(42, 3, 40),
(42, 4, 30),
(42, 5, 60),
(43, 1, 88),
(43, 2, 70),
(43, 3, 75),
(43, 4, 65),
(43, 5, 80),
(44, 1, 70),
(44, 2, 65),
(44, 3, 70),
(44, 4, 90),
(44, 5, 85),
(45, 1, 85),
(45, 2, 75),
(45, 3, 85),
(45, 4, 70),
(45, 5, 80),
(46, 1, 75),
(46, 2, 88),
(46, 3, 92),
(46, 4, 60),
(46, 5, 75),
(47, 1, 82),
(47, 2, 85),
(47, 3, 88),
(47, 4, 55),
(47, 5, 70),
(48, 1, 85),
(48, 2, 93),
(48, 3, 80),
(48, 4, 50),
(48, 5, 85);

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL,
  `position_code` varchar(10) NOT NULL,
  `position_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `position_code`, `position_name`) VALUES
(1, 'GK', 'Goalkeeper'),
(2, 'DF', 'Defender'),
(3, 'MF', 'Midfielder'),
(4, 'FW', 'Forward'),
(5, 'ST', 'Striker'),
(6, 'RB', 'Right Back'),
(7, 'LB', 'Left Back'),
(8, 'CB', 'Centre Back'),
(9, 'CDM', 'Defensive Midfielder'),
(10, 'CM', 'Central Midfielder'),
(11, 'CAM', 'Attacking Midfielder'),
(12, 'RW', 'Right Winger'),
(13, 'LW', 'Left Winger');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `full_text` text NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `full_text`, `image_url`, `account_id`, `created_at`) VALUES
(2, 'Bài viết đầu tiên', 'Đây là nội dung chi tiết bài viết đầu tiên.', 'https://www.aljazeera.com/wp-content/uploads/2024/05/2024-03-31T170712Z_871775858_UP1EK3V1BJZ7E_RTRMADP_3_SOCCER-ENGLAND-MCI-ARS-REPORT-1716111441.jpg?resize=730%2C410&quality=80', 6, '2025-09-21 08:28:41'),
(3, 'Mu eating sht xdddd', 'No comment bro', 'https://file3.qdnd.vn/data/images/0/2024/10/25/upload_2071/mu-1.jpg', 6, '2025-09-21 09:06:40'),
(5, 'Wait did you guys see that?', '0-3 BRO LMAOOOO', 'https://cdn.tienphong.vn/images/a6bf4f60924201126af6849ca45a3980388d3f305fb2b584271ce9dccb251e8b22f500ef9a2785f52b7f046a19fa2da3d815e265bdb936097401a503b86b32b3714ef85a15986e12ec866c53661a093d/man-utd-man-city-957.jpg', 9, '2025-09-22 03:58:21'),
(6, 'manchester united 2-1 chelsea', 'Grey skies, pouring rain, and a maddening red card for Robert Sánchez inside of five minutes blew up any ideas we might have had about how this game might play out. In response, Enzo Maresca chose to take off not only Estêvão but Pedro Neto as well, switching to a toothless 5-3-1, which managed to hold out for less than 10 minutes before conceding.\n\nCole Palmer added injury to insult by limping off just after 20 minutes, appearing to aggravate his groin concern. He was replaced by a midfielder instead of another attacker. Then we made a royal mess of some set piece defending to let United double their lead anyway.\n\nCasemiro collected a second yellow to get sent off just prior to half-time, but Chelsea’s response to that bit of fortune was not quite as positive as we might have hoped. Still, we did briefly have the ball in the back of the net before that goal was rightly ruled out for a clear offside on Fofana on the corner.\nMaresca finally shifted his tactics into a slightly more attacking shape for the final 25-30 minutes, though it took another set piece to find a breakthrough, with Trevoh Chalobah heading in. Unfortunately, the comeback would fall short in the final 10 minutes.\n\nFrom disaster to dismay to disappointment. Burn this game.\n\nJust a couple changes from midweek in the starting lineup, with Fofana and Estêvão getting the nods ahead of Tosin and Gusto\nNo minutes for Garnacho or Gittens or Guiu despite trailing the entire game\nFirst time in Premier League history that a team make (panic into) three substitutions in the first half\nIf you can make sense of Maresca’s subs … you might be Maresca himself\nSecond earliest red card in Chelsea history\nStill winless at Old Trafford in the league since 2013\nNext up: away at fourth division Lincoln City in the League Cup third round on Tuesday\nKTBFFH', 'https://platform.weaintgotnohistory.sbnation.com/wp-content/uploads/sites/178/2025/09/gettyimages-2235933032.jpg?quality=90&strip=all&crop=0%2C0.16693591814755%2C100%2C99.666128163705&w=2400', 9, '2025-09-22 14:01:39'),
(7, 'manchester city 1-1 arsenal', 'Gabriel Martinelli came off the bench to score a superb injury-time equaliser and claim a point against Manchester City.\n\nIn a first half of few clearcut chances, Erling Haaland had slid home the opener inside ten minutes - a goal that came out of nothing for the visitors. \n\nWe created more in the second half, with Eberechi Eze and Leandro Trossard having shots blocked, but time looked to be running out until Martinelli’s superb late lob. \n\nHe raced onto an Eze ball over the top before lifting his shot over Gianluigi Donnarumma and under the bar to earn a share of the spoils.\nCity strike FIRST\nWe had enjoyed just under 80 per cent of the possession in the opening 10 minutes, but it counted for nothing when the visitors took the lead with their first attack of the game. \n\nThere seemed to be no trouble at all when we had the ball inside the City half, but all of a sudden Halaand won possession and sprung a counter attack. \n\nTijjani Reijnders raced away and slipped in the overlapping Haaland for the Norwegian to stroke into the corner. \n\nIt was the first goal we had conceded from open play all season. City’s next chance came when Mikel Merino was tackled just outside his own area, the ball was moved along to Reijnders, but his shot trickled through to David Raya.', 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/GettyImages-2236594455%20Cropped_g9yo7iqv.jpg?h=22c3ebec&auto=webp&itok=C0DDvtW6', 9, '2025-09-22 14:03:41');

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `privilege_id` int(11) NOT NULL,
  `privilege_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `privileges`
--

INSERT INTO `privileges` (`privilege_id`, `privilege_name`) VALUES
(1, 'READ_PRIVILEGE'),
(2, 'WRITE_PRIVILEGE');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `role_privileges`
--

CREATE TABLE `role_privileges` (
  `role_id` int(11) NOT NULL,
  `privilege_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_privileges`
--

INSERT INTO `role_privileges` (`role_id`, `privilege_id`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stat_types`
--

CREATE TABLE `stat_types` (
  `stat_type_id` int(11) NOT NULL,
  `stat_code` varchar(30) NOT NULL,
  `stat_name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stat_types`
--

INSERT INTO `stat_types` (`stat_type_id`, `stat_code`, `stat_name`) VALUES
(1, 'PAC', 'Pace'),
(2, 'SHO', 'Shooting'),
(3, 'PAS', 'Passing'),
(4, 'DEF', 'Defending'),
(5, 'PHY', 'Physical');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`) VALUES
(1, 'admin_user'),
(2, 'dongpham'),
(14, 'dongphamhaha'),
(17, 'HAIDONG'),
(15, 'HHHHH'),
(19, 'huy3@gmail.com'),
(3, 'huyle'),
(16, 'huylewtf'),
(18, 'True Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_account_user` (`user_id`);

--
-- Indexes for table `account_roles`
--
ALTER TABLE `account_roles`
  ADD PRIMARY KEY (`account_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`club_id`),
  ADD UNIQUE KEY `club_name` (`club_name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD UNIQUE KEY `country_name` (`country_name`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_feedback_account` (`account_id`);

--
-- Indexes for table `ownership`
--
ALTER TABLE `ownership`
  ADD PRIMARY KEY (`user_id`,`result`),
  ADD KEY `fk_owner_player` (`result`),
  ADD KEY `fk_ownership_club1` (`club_id_1`),
  ADD KEY `fk_ownership_club2` (`club_id_2`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `fk_players_pos` (`position_id`),
  ADD KEY `fk_players_ctry` (`country_id`),
  ADD KEY `fk_players_club` (`club_id`),
  ADD KEY `ix_players_name` (`full_name`),
  ADD KEY `ix_players_rating` (`rating`);

--
-- Indexes for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD PRIMARY KEY (`player_id`,`stat_type_id`),
  ADD KEY `fk_pstats_stattype` (`stat_type_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD UNIQUE KEY `position_code` (`position_code`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `fk_posts_account` (`account_id`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`privilege_id`),
  ADD UNIQUE KEY `privilege_name` (`privilege_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `role_privileges`
--
ALTER TABLE `role_privileges`
  ADD PRIMARY KEY (`role_id`,`privilege_id`),
  ADD KEY `privilege_id` (`privilege_id`);

--
-- Indexes for table `stat_types`
--
ALTER TABLE `stat_types`
  ADD PRIMARY KEY (`stat_type_id`),
  ADD UNIQUE KEY `stat_code` (`stat_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `club_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stat_types`
--
ALTER TABLE `stat_types`
  MODIFY `stat_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `fk_account_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `account_roles`
--
ALTER TABLE `account_roles`
  ADD CONSTRAINT `account_roles_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  ADD CONSTRAINT `account_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `fk_feedback_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ownership`
--
ALTER TABLE `ownership`
  ADD CONSTRAINT `fk_owner_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ownership_club1` FOREIGN KEY (`club_id_1`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ownership_club2` FOREIGN KEY (`club_id_2`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `fk_players_club` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`),
  ADD CONSTRAINT `fk_players_ctry` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`),
  ADD CONSTRAINT `fk_players_pos` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`);

--
-- Constraints for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD CONSTRAINT `fk_pstats_player` FOREIGN KEY (`player_id`) REFERENCES `players` (`player_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pstats_stattype` FOREIGN KEY (`stat_type_id`) REFERENCES `stat_types` (`stat_type_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Constraints for table `role_privileges`
--
ALTER TABLE `role_privileges`
  ADD CONSTRAINT `role_privileges_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `role_privileges_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`privilege_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
