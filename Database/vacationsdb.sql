-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2022 at 02:30 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacation_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `messageId` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`messageId`, `name`, `email`, `subject`, `message`) VALUES
(2, 'omri', 'omri@fmail.com', 'asasasa', 'askjasjal'),
(3, 'qwe', 'qwe@gmail.com', 'hiaohdw', 'wqdqwd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
('06d98677-33d4-4b32-a58f-24482c51a82f', 'nir', 'itzhari', 'admin1', 'b1e62628cf3726a3c113ddce27100e88f76ba9396e6f191bf7ab902dab695d41837dbbf9ed645b265f526a26a877f87a88cfb309b479925286cd40e11d1d4c01', 'Admin'),
('7e975d54-941d-451b-a780-5ba6fc36c320', 'yogev', 'yogev', 'yogev123', '75d66633a7c180fdef6442e99121e8b7789cc02915e2bd9e4c6648a70c3aee0a494677be0127f14b14b7794b7cd17d98cd4ae26477b778f7848070c387c4d025', 'User'),
('aa8c21fd-5078-45e5-a37e-2d362dd667d0', 'guy', 'tsairi', 'guy123', '79800db0dc474df5ecb77c0bccae991be70770ea0f3c8138392d24582106bfa482a5f0acb88088ab7c28fe12960f974b5d1a7e9092a687faa66f486ce2cf09de', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `description`, `fromDate`, `toDate`, `price`, `imageName`) VALUES
('3e5769ad-405d-4ef1-971c-d0d84f9c2571', 'Istanbul', 'Istanbul is a transcontinental city, straddling the Bosphorus strait in northwestern Turkey between the Sea of Marmara and the Black Sea. Founded on the Sarayburnu promontory around 660 BC as Byzantium, the city now known as Istanbul developed to become one of the most significant cities in history.', '2022-11-08', '2022-11-12', 480, '21a6359e-851a-49aa-90e8-fea7f717a5d1.jpg'),
('43eb3de8-91ac-4fac-b5f4-10b267790888', 'London', 'Exploring the world-class British Museum, seeing a musical in the West End theater district, touring the Tower of London and gorging on fish and chips or a Sunday roast at a local pub are all part of the London bucket list experience. However, London\'s high hotel prices can make travelers with tight budgets cringe. To save some money, book your accommodations far in advance or consider reserving a vacation rental', '2022-09-13', '2022-09-23', 669, '038f7fce-8c2c-4270-a5fd-94195635135b.jpg'),
('460af270-9bc2-4b85-ae28-7acc84d9ee35', 'Mykonos', 'Welcome to Greece\'s most famous cosmopolitan island, a whitewashed paradise in the heart of the Cyclades. According to mythology, Mykonos was formed from the petrified bodies of giants killed by Hercules. ... Mykonos is known for its dry, windy climate, sandy beaches and world famous nightlife!', '2022-05-09', '2022-05-12', 399, 'c64d4748-db02-4553-a098-c95c6c112149.jpg'),
('5603a40d-123e-4569-a5e7-a916a17ec0fa', 'Berlin', 'Berlin, the capital city of Germany, is renowned for its exceptional range of landmarks, vibrant cultural scene and way of life that\'s somehow all go yet relaxed. In fact, the city is best known for its striking contrasts. Historical buildings stand alongside modern architecture as the past and present intermingle.', '2022-12-21', '2022-12-25', 554, '7acf8d8c-7cb8-4c3b-afdb-06d8d5d4042f.jpg'),
('921e90aa-3dd8-4652-ad33-5f3968cc447b', 'Lisbon', 'Lisbon, Portuguese Lisboa, city, port, capital of Portugal, and the centre of the Lisbon metropolitan area. ... Lisbon owes its historical prominence to its natural harbour, one of the most beautiful in the world. Area city, 33 square miles (85 square km).', '2022-09-13', '2022-09-16', 460, '69c63653-21d4-4150-bdd8-e74c4e073993.jpg'),
('a0a710a7-5c05-46c7-b6f1-de06f1f308d3', 'Tokyo', 'Tokyo, formerly (until 1868) Edo, city and capital of Tokyo to (metropolis) and of Japan. It is located at the head of Tokyo Bay on the Pacific coast of central Honshu. It is the focus of the vast metropolitan area often called Greater Tokyo, the largest urban and industrial agglomeration in Japan.', '2022-07-01', '2022-07-05', 799, '9615c5b6-3330-4a10-9e94-ebad8e402236.jpg'),
('c1dcd7d6-7532-4cc0-a0eb-4d37f9121727', 'Athens', 'Athens was made for history buffs and architecture aficionados thanks to it housing the world-renowned Acropolis and Ancient Agora. However, there\'s more to Athens than its historical sites. The Greek capital\'s laid-back lifestyle and incredible food attract the masses just as much as its famous attractions do. As you tour around, be sure to stroll through the historical neighborhood of Plaka, where you\'ll find restaurants, cafes, whitewashed homes and charming shops.', '2022-06-02', '2022-06-05', 360, 'beb9db66-eaa5-493c-b9dc-1c537ce7d099.jpg'),
('db19e906-9757-4555-be94-73fc11dfc8be', 'Barcelona', 'Barcelona, Spain\'s diverse architecture sets the city apart from other European destinations. Antoni Gaudí\'s Park Güell and Basilica de la Sagrada Família are beyond impressive, as are Palau de la Música Catalana and the many medieval buildings in the Gothic Quarter. When you tire of taking in the city\'s stunning architecture, relax on La Barceloneta beach, sample a smattering of tasty local tapas at Boqueria Market or sip sangria along Las Ramblas', '2022-08-20', '2022-08-24', 599, '5b2a7036-4403-4310-8612-731b4fb5dc3d.jpg'),
('f514520a-fd5d-4052-a304-294246e13186', 'Rome', 'Rome is a can\'t-miss spot on your trip to Europe. The aroma of fresh Italian cooking wafts through the alleys, and historical sights stand proudly at every turn. No visit to Italy\'s capital would be complete without checking out the Colosseum, the Roman Forum, St. Peter\'s Basilica, the Sistine Chapel and the awe-inspiring Trevi Fountain. If you have additional time, venture beyond the main attractions to Trastevere and the Spanish Steps.', '2022-08-01', '2022-08-05', 515, 'd28064eb-3f4e-4423-b46f-e76b1fd05830.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacation_id` (`vacation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messageId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `messageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
