-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 05:05 PM
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
-- Database: `aviate_holidays`
--

-- --------------------------------------------------------

--
-- Table structure for table `adults`
--

CREATE TABLE `adults` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adults`
--

INSERT INTO `adults` (`id`, `bookingId`, `name`, `email`, `country`, `number`) VALUES
(1, 1, 'Md Sabbir Ahammed', 'mdsa134867@gmail.com', 'Bangladesh', '01610585100'),
(2, 1, 'Saki', 'mdsahid134867@gmail.com', 'Bangladesh', '1321141789');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `detailId` int(11) DEFAULT NULL,
  `packageName` varchar(255) DEFAULT NULL,
  `packageDetails` text DEFAULT NULL,
  `dateOfTravel` date DEFAULT NULL,
  `noOfTravelers` int(11) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `payment` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `detailId`, `packageName`, `packageDetails`, `dateOfTravel`, `noOfTravelers`, `userEmail`, `payment`) VALUES
(1, 3, 'sylhet', 'first', '2024-07-30', 3, 'mdsa134867@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `children`
--

CREATE TABLE `children` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `children`
--

INSERT INTO `children` (`id`, `bookingId`, `name`, `age`, `country`) VALUES
(1, 1, 'Saki', 14, 'Bangladesh');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `Id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`Id`, `userId`, `Name`, `Email`, `Message`) VALUES
(1, 1, 'Md Sabbir Ahammed', 'mdsa134867@gmail.com', 'is it working ?'),
(4, 1, 'sdafdsa', 'dsasa', 'das'),
(5, 1, 'Sakib1348', 'mdsahid134867@gmail.com', 'fdfsd');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'Bangladesh'),
(3, 'India');

-- --------------------------------------------------------

--
-- Table structure for table `countrydetails`
--

CREATE TABLE `countrydetails` (
  `id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countrydetails`
--

INSERT INTO `countrydetails` (`id`, `country`, `title`, `description`, `price`, `image`) VALUES
(3, 'Bangladesh', 'sylhet', 'first', 550.00, '1721068185463-gettyimages-499205750-612x612.jpg'),
(4, 'Bangladesh', 'dhaka', '2nd', 1000.00, '1721068059744-gettyimages-825020012-612x612.jpg'),
(5, 'Bangladesh', 'rajshahi', '3rd', 2500.00, '1721070869581-gettyimages-475438994-612x612.jpg'),
(6, 'Bangladesh', 'chitagong', '2 night stay', 2500.00, '1721197003177-gettyimages-489348944-612x612.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `exclusions`
--

CREATE TABLE `exclusions` (
  `id` int(11) NOT NULL,
  `exclusion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exclusions`
--

INSERT INTO `exclusions` (`id`, `exclusion`) VALUES
(1, 'LUNCH & DINNER'),
(2, 'PERSONAL EXPENSE'),
(3, 'ADDITIONAL TOUR');

-- --------------------------------------------------------

--
-- Table structure for table `inclusions`
--

CREATE TABLE `inclusions` (
  `ID` int(11) NOT NULL,
  `Inclusion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inclusions`
--

INSERT INTO `inclusions` (`ID`, `Inclusion`) VALUES
(1, 'AIR TICEKT'),
(2, 'AIRPORT TRANSFER');

-- --------------------------------------------------------

--
-- Table structure for table `package_details`
--

CREATE TABLE `package_details` (
  `id` int(11) NOT NULL,
  `detail_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `itinerary` text DEFAULT NULL,
  `images` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_details`
--

INSERT INTO `package_details` (`id`, `detail_id`, `description`, `itinerary`, `images`) VALUES
(4, 3, 'description', '[{\"day\":\"\",\"description\":\"day1\"}]', '[\"gettyimages-84497346-612x612.jpg\",\"gettyimages-489348944-612x612.jpg\",\"gettyimages-499205750-612x612.jpg\",\"gettyimages-475438994-612x612.jpg\",\"gettyimages-1750375044-612x612.jpg\"]'),
(5, 4, 'fsds', '[{\"day\":\"\",\"description\":\"fdss\"}]', '[\"gettyimages-84497346-612x612.jpg\",\"gettyimages-489348944-612x612.jpg\",\"gettyimages-499205750-612x612.jpg\",\"gettyimages-475438994-612x612.jpg\",\"gettyimages-1750375044-612x612.jpg\"]'),
(8, 5, 'rajshahi', '[{\"day\":\"\",\"description\":\"day 1\"}]', '[\"gettyimages-489348944-612x612.jpg\",\"gettyimages-1231729961-612x612.jpg\",\"gettyimages-499205750-612x612.jpg\",\"gettyimages-1319983757-612x612.jpg\",\"gettyimages-1750375044-612x612.jpg\"]'),
(10, 6, 'fsdfsd', '[{\"day\":\"\",\"description\":\"sdfs\"}]', '[\"gettyimages-489348944-612x612.jpg\",\"gettyimages-1231729961-612x612.jpg\",\"gettyimages-825020012-612x612.jpg\",\"gettyimages-499205750-612x612.jpg\",\"gettyimages-84497346-612x612.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `tour_details`
--

CREATE TABLE `tour_details` (
  `id` int(11) NOT NULL,
  `terms` varchar(1000) DEFAULT 'none',
  `cancellation_policy` varchar(1000) DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_details`
--

INSERT INTO `tour_details` (`id`, `terms`, `cancellation_policy`) VALUES
(6, 'User must be valid.', 'no'),
(8, 'none', 'policy\'s'),
(9, 'none', 'user cant leave without any information , they have to let us know about their activity.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `otp` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `address`, `password_hash`, `created_at`, `otp`) VALUES
(1, 'Md Sabbir Ahammed', 'mdsa134867@gmail.com', 'Rajshahi', '$2b$10$K7AW/.1b3K6v6ITDLnPNWuf.4.d3oWlu/.5BT.TDwcxr9nYi3WeHi', '2024-07-14 13:00:30', NULL),
(3, 'User', 'saahammed134867@gmail.com', 'Rajshahi', '$2b$10$Sc/rhylst2se39Uk8irafOjV0lmpi.kq1i7HbChbnHE2SWjUjUPji', '2024-07-22 04:52:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adults`
--
ALTER TABLE `adults`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `detailId` (`detailId`);

--
-- Indexes for table `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countrydetails`
--
ALTER TABLE `countrydetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exclusions`
--
ALTER TABLE `exclusions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inclusions`
--
ALTER TABLE `inclusions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `package_details`
--
ALTER TABLE `package_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_id` (`detail_id`);

--
-- Indexes for table `tour_details`
--
ALTER TABLE `tour_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adults`
--
ALTER TABLE `adults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `children`
--
ALTER TABLE `children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `countrydetails`
--
ALTER TABLE `countrydetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exclusions`
--
ALTER TABLE `exclusions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inclusions`
--
ALTER TABLE `inclusions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `package_details`
--
ALTER TABLE `package_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tour_details`
--
ALTER TABLE `tour_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD CONSTRAINT `contact_form_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `package_details`
--
ALTER TABLE `package_details`
  ADD CONSTRAINT `package_details_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `countrydetails` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
