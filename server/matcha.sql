-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 02, 2020 at 08:07 AM
-- Server version: 8.0.17
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(65) DEFAULT NULL,
  `firstName` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lastName` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isVerified` smallint(6) DEFAULT '0',
  `sex` enum('male','female') DEFAULT NULL,
  `preferences` enum('male','female','male and female') DEFAULT NULL,
  `biography` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `firstName`, `lastName`, `email`, `password`, `isVerified`, `sex`, `preferences`, `biography`) VALUES
(92, 'newuser', 'John', 'Doe', 'john@gmail.com', 'password', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userActivationUuid`
--

CREATE TABLE `userActivationUuid` (
  `userId` int(11) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userSession`
--

CREATE TABLE `userSession` (
  `userId` int(11) NOT NULL,
  `uuid` varchar(100) NOT NULL,
  `expire` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_uindex` (`email`),
  ADD UNIQUE KEY `user_username_uindex` (`username`);

--
-- Indexes for table `userActivationUuid`
--
ALTER TABLE `userActivationUuid`
  ADD KEY `user_activation_uuid_users_id_fk` (`userId`);

--
-- Indexes for table `userSession`
--
ALTER TABLE `userSession`
  ADD KEY `user_session_user_id_fk` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userActivationUuid`
--
ALTER TABLE `userActivationUuid`
  ADD CONSTRAINT `user_activation_uuid_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userSession`
--
ALTER TABLE `userSession`
  ADD CONSTRAINT `user_session_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
