-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2022 at 07:06 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wfms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pho_no` bigint(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `img_path` varchar(50) NOT NULL DEFAULT 'admin.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `name`, `email`, `pho_no`, `password`, `address`, `img_path`) VALUES
('Harshitha_12', 'Harshitha N', 'harshitha@wfms.com', 7865439875, 'harshitha@123', 'Mysore', '/admin/Harshitha.jpg'),
('jeevan_12', 'Jeevan ', 'jeevan@wfms.com', 6578564356, 'jeevan@123', 'Mysore', 'admin/jeevan.jpg'),
('Manohar_12', 'Manohar S N', 'manohar@wfms.com', 9876543456, 'manohor@123', 'Mysore', 'admin/Manohar.jpg'),
('Manoj_14', 'Manoj', 'manoj@wfms.com', 9741626527, 'manoj14', 'Shimoga', 'admin/Manoj.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `SEND_ID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Phone` bigint(100) NOT NULL,
  `Email` varchar(100) DEFAULT 'Not Mentioned',
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `Quantity` int(50) NOT NULL,
  `Pincode` int(50) NOT NULL,
  `desc` text DEFAULT 'Not Mentioned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`SEND_ID`, `Name`, `Phone`, `Email`, `Date`, `Quantity`, `Pincode`, `desc`) VALUES
(18, 'Durga bavan', 9834483647, 'durbav@gmail.com', '2022-02-08 14:43:14', 56, 570016, 'veg'),
(19, 'Durga bavan', 9834483647, 'durbav@gmail.com', '2022-02-08 16:16:40', 70, 570016, 'veg'),
(20, 'Durga bavan', 9834483647, 'durbav@gmail.com', '2022-02-08 16:42:44', 56, 570016, 'veg'),
(21, 'Hotel athiti', 9147483647, 'athithi@gmail.com', '2022-02-08 18:19:34', 60, 577232, 'Non Veg'),
(22, 'Manoj M(Guest)', 9741626527, 'Not Mentioned', '2022-02-08 21:35:29', 67, 570016, 'veg'),
(23, 'Hotel athiti', 9147483647, 'athithi@gmail.com', '2022-02-08 21:37:11', 70, 577232, 'veg'),
(24, 'Manoj M(Guest)', 9741626527, 'Not Mentioned', '2022-02-08 21:43:23', 67, 570016, 'veg'),
(25, 'Manoj M(Guest)', 9741626527, 'Not Mentioned', '2022-02-08 21:43:35', 67, 570016, 'veg'),
(26, 'Manoj M(Guest)', 9741626527, 'Not Mentioned', '2022-02-08 21:43:44', 67, 570016, 'veg'),
(27, '5(Guest)', 5, 'Not Mentioned', '2022-02-09 14:10:03', 5, 5, '5\r\n'),
(28, 'Hotel athiti', 9147483647, 'athithi@gmail.com', '2022-02-09 16:33:22', 89, 577232, '0'),
(29, 'Hotel athiti', 9147483647, 'athithi@gmail.com', '2022-02-09 16:35:19', 89, 577232, '0'),
(30, '4(Guest)', 4, 'Not Mentioned', '2022-02-11 23:45:04', 5, 674, 'rice'),
(31, 'Durga Bavan', 7865434537, 'durbav@gmail.com', '2022-02-11 23:49:18', 89, 570016, 'veg\r\n'),
(32, 'Durga Bavan', 7865434537, 'durbav@gmail.com', '2022-02-11 23:49:51', 7, 570016, '7'),
(33, 'Manoj_14(Guest)', 7865456789, 'Not Mentioned', '2022-02-12 10:08:02', 89, 577231, 'veg  + non veg'),
(34, 'Durga bavan', 6789345678, 'durbav@gmail.com', '2022-03-04 18:40:02', 50, 570016, 'No Veg'),
(35, 'Manoj M(Guest)', 9741626527, 'Not Mentioned', '2022-03-17 14:22:15', 40, 570016, 'Veg'),
(36, 'Durga bavan', 6789345678, 'durbav@gmail.com', '2022-03-17 22:35:24', 67, 570016, 'biryani'),
(37, 'Durga bavan', 6789345678, 'durbav@gmail.com', '2022-03-18 20:27:46', 34, 570016, 'veg'),
(38, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-25 23:34:31', 56, 570016, 'veg'),
(39, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-25 23:34:41', 78, 570016, 'non-veg'),
(40, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-25 23:34:49', 10, 570016, 'biryani'),
(41, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-25 23:34:54', 56, 570016, 'asdcdes'),
(42, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-25 23:37:04', 67, 570016, 'veg'),
(43, 'Manoj M(Guest)', 8765456765, 'Not Mentioned', '2022-03-27 10:54:50', 78, 570016, 'Veg'),
(44, 'Athiti', 8746867654, 'athithi@gmail.com', '2022-03-27 11:11:38', 100, 577232, 'non veg'),
(45, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-27 20:34:13', 56, 570016, 'manoj m'),
(46, 'VVCE Boys Hostel', 7865434537, 'vvcebh@vvce.ac.in', '2022-03-27 21:02:39', 76, 570016, 'non-veg');

-- --------------------------------------------------------

--
-- Table structure for table `guestlogin`
--

CREATE TABLE `guestlogin` (
  `GUEST_ID` int(11) NOT NULL,
  `NAME` varchar(50) DEFAULT NULL,
  `NUMBER` int(15) DEFAULT NULL,
  `ADDRESS` varchar(50) DEFAULT NULL,
  `pincode` int(10) NOT NULL,
  `QUANTITY` int(10) DEFAULT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guestlogin`
--

INSERT INTO `guestlogin` (`GUEST_ID`, `NAME`, `NUMBER`, `ADDRESS`, `pincode`, `QUANTITY`, `DESCRIPTION`) VALUES
(37, '8', 8, '8', 8, 8, ''),
(38, '8', 8, '8', 8, 8, ''),
(39, '8', 8, '8', 8, 8, ''),
(40, '8', 8, '8', 8, 8, ''),
(41, '8', 8, '8', 8, 8, ''),
(42, 'Manoj M', 2147483647, 'jeasv', 98398, 98, ''),
(43, 'Manoj M', 2147483647, 'jeasv', 98398, 98, ''),
(44, 'Manoj M', 2147483647, 'jeasv', 98398, 98, ''),
(45, 'Manoj M', 2147483647, 'ldsb', 890987, 87, ''),
(46, 'Manoj M', 2147483647, 'ldsb', 890987, 87, ''),
(47, 'Manoj M', 2147483647, 'ldsb', 890987, 87, ''),
(48, '7', 7, '7', 7, 7, '7'),
(49, '777', 7, '7', 7, 7, '7'),
(50, '9', 9, '9', 9, 9, '9'),
(51, '8', 8, '8', 8, 8, '8'),
(52, '7', 7, '7', 7, 7, '7'),
(53, '2', 2, '2', 2, 2, '2'),
(54, '@', 2, '2', 2, 2, '2'),
(55, 'Manoj M(Guest)', 2147483647, 'Mysure', 570016, 70, 'non-veg'),
(56, 'Manoj M(Guest)', 2147483647, 'Mysore', 570016, 67, 'veg'),
(57, 'Manoj M(Guest)', 2147483647, 'Mysore', 570016, 67, 'veg'),
(58, 'Manoj M(Guest)', 2147483647, 'Mysore', 570016, 67, 'veg'),
(59, 'Manoj M(Guest)', 2147483647, 'Mysore', 570016, 67, 'veg'),
(60, '5(Guest)', 5, '5', 5, 5, '5\r\n'),
(61, '4(Guest)', 4, '4', 674, 5, 'rice'),
(62, 'Manoj_14(Guest)', 2147483647, 'Shimoga', 577231, 89, 'veg  + non veg'),
(63, 'Manoj M(Guest)', 2147483647, 'Mysure', 570016, 40, 'Veg'),
(64, 'Manoj M(Guest)', 2147483647, 'Mysore', 570016, 78, 'Veg');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `order_no` int(50) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `ngo_uid` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`order_no`, `date`, `ngo_uid`) VALUES
(24, '2022-02-08', 'NGO01'),
(28, '2022-02-09', NULL),
(32, '2022-02-11', NULL),
(34, '2022-03-05', 'NGO01'),
(35, '2022-03-17', 'NGO01'),
(36, '2022-03-20', 'NGO01'),
(37, '2022-03-20', 'NGO01'),
(38, '2022-03-25', 'NGO02'),
(39, '2022-03-25', 'NGO02'),
(40, '2022-03-25', 'NGO02'),
(41, '2022-03-25', NULL),
(42, '2022-03-27', NULL),
(43, '2022-03-27', 'NGO02'),
(44, '2022-03-27', 'NGO02');

-- --------------------------------------------------------

--
-- Table structure for table `ngo`
--

CREATE TABLE `ngo` (
  `Name` varchar(50) NOT NULL,
  `ngo_unique_id` varchar(50) NOT NULL,
  `ngo_address` varchar(100) NOT NULL,
  `ngo_pincode` int(10) NOT NULL,
  `ngo_email` varchar(50) NOT NULL,
  `ngo_phone` bigint(20) NOT NULL,
  `ngo_password` varchar(50) NOT NULL DEFAULT 'ngo@123'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ngo`
--

INSERT INTO `ngo` (`Name`, `ngo_unique_id`, `ngo_address`, `ngo_pincode`, `ngo_email`, `ngo_phone`, `ngo_password`) VALUES
('NGO1', 'NGO01', 'Mysore', 570016, 'ngo1@gmail.com', 7865456785, 'ngo123'),
('NGO2', 'NGO02', 'Shimoga', 577432, 'ngo2@gmail.com', 7865454345, 'ngo@123');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ordered_Date` datetime NOT NULL DEFAULT current_timestamp(),
  `order_no` int(50) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Waiting for Admin',
  `aproved_admin` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ordered_Date`, `order_no`, `status`, `aproved_admin`) VALUES
('2022-02-08 14:43:14', 18, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 16:16:40', 19, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 16:42:44', 20, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 18:19:34', 21, 'Acceped by NGO', 'Manohar_12'),
('2022-02-08 21:35:29', 22, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 21:37:11', 23, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 21:43:23', 24, 'Acceped by NGO', 'Manoj_14'),
('2022-02-08 21:43:35', 25, 'Rejected', 'Manoj_14'),
('2022-02-08 21:43:44', 26, 'Rejected', 'Manoj_14'),
('2022-02-09 14:10:03', 27, 'Rejected', 'Harshitha_12'),
('2022-02-09 16:33:22', 28, 'Rejected', 'Manoj_14'),
('2022-02-09 16:35:19', 29, 'Acceped by NGO', 'Manoj_14'),
('2022-02-11 23:45:04', 30, 'Acceped by NGO', 'Manoj_14'),
('2022-02-11 23:49:18', 31, 'Acceped by NGO', 'Manoj_14'),
('2022-02-11 23:49:51', 32, 'Rejected', 'Manoj_14'),
('2022-02-12 10:08:02', 33, 'Acceped by NGO', 'Manoj_14'),
('2022-03-04 18:40:02', 34, 'Acceped by NGO', 'Manoj_14'),
('2022-03-17 14:22:15', 35, 'Acceped by NGO', 'Manoj_14'),
('2022-03-17 22:35:25', 36, 'Acceped by NGO', 'Manoj_14'),
('2022-03-18 20:27:46', 37, 'Acceped by NGO', 'Manoj_14'),
('2022-03-25 23:34:31', 38, 'Acceped by NGO', 'Manoj_14'),
('2022-03-25 23:34:41', 39, 'Acceped by NGO', 'Manoj_14'),
('2022-03-25 23:34:49', 40, 'Acceped by NGO', 'Manoj_14'),
('2022-03-25 23:34:54', 41, 'Rejected', 'Manoj_14'),
('2022-03-25 23:37:04', 42, 'Rejected', 'Manoj_14'),
('2022-03-27 10:54:50', 43, 'Acceped by NGO', 'Manoj_14'),
('2022-03-27 11:11:38', 44, 'Acceped by NGO', 'Manoj_14'),
('2022-03-27 20:34:13', 45, 'Expried', NULL),
('2022-03-27 21:02:39', 46, 'Waiting for Admin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `rest_name` varchar(50) NOT NULL,
  `rest_email` varchar(50) NOT NULL,
  `rest_phone` bigint(100) NOT NULL,
  `rest_loc` varchar(50) NOT NULL,
  `rest_pin` int(50) NOT NULL,
  `rest_password` varchar(50) NOT NULL DEFAULT 'rest@123'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`rest_name`, `rest_email`, `rest_phone`, `rest_loc`, `rest_pin`, `rest_password`) VALUES
('Athiti', 'athithi@gmail.com', 8746867654, 'Shimoga', 577232, 'rest'),
('Durga bavan', 'durbav@gmail.com', 6789345678, 'Mysure', 570016, 'rest@123'),
('VVCE Boys Hostel', 'vvcebh@vvce.ac.in', 7865434537, 'Mysore', 570016, 'vvcebh@123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`) USING BTREE;

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`SEND_ID`);

--
-- Indexes for table `guestlogin`
--
ALTER TABLE `guestlogin`
  ADD PRIMARY KEY (`GUEST_ID`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`order_no`),
  ADD KEY `ngo_uid` (`ngo_uid`);

--
-- Indexes for table `ngo`
--
ALTER TABLE `ngo`
  ADD PRIMARY KEY (`ngo_unique_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_no`),
  ADD KEY `aproved_admin` (`aproved_admin`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`rest_email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `SEND_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `guestlogin`
--
ALTER TABLE `guestlogin`
  MODIFY `GUEST_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_no` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_2` FOREIGN KEY (`ngo_uid`) REFERENCES `ngo` (`ngo_unique_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_ibfk_3` FOREIGN KEY (`order_no`) REFERENCES `donors` (`SEND_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_no`) REFERENCES `donors` (`SEND_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`aproved_admin`) REFERENCES `admin` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `auto_status_up` ON SCHEDULE EVERY 20 SECOND STARTS '2022-03-27 20:28:25' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE orders SET status = "Expried" WHERE STATUS = "Waiting for Admin"
AND orders.ordered_Date < CURRENT_DATE$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
