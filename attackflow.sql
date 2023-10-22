-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2023-10-22 10:48:34
-- 服务器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `attackflow`
--

-- --------------------------------------------------------

--
-- 表的结构 `annotations`
--

CREATE TABLE `annotations` (
  `id` int(11) NOT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `document` int(20) DEFAULT NULL,
  `document_no` varchar(100) DEFAULT NULL,
  `referenced_text` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `annotations`
--

INSERT INTO `annotations` (`id`, `tags`, `user`, `document`, `document_no`, `referenced_text`, `createdAt`, `updatedAt`) VALUES
(4, 'T1566.001,T1566.002', 16, 17, '20231018154829', 3, '2023-10-18 07:57:20', '2023-10-18 07:57:20'),
(5, 'T1566.008', 16, 18, '20231018154829', 4, '2023-10-18 08:00:07', '2023-10-18 08:00:07'),
(6, 'T1566.010', 16, 20, '20231022154521', 5, '2023-10-22 07:49:22', '2023-10-22 07:49:22'),
(7, 'T1566.008,T1566.009', 16, 21, '20231022154521', 6, '2023-10-22 07:52:13', '2023-10-22 07:52:13'),
(8, 'T1566.010', 16, 22, '20231022154521', 7, '2023-10-22 07:53:05', '2023-10-22 07:53:05'),
(9, 'T1566.008', 16, 23, '20231022154521', 8, '2023-10-22 07:53:31', '2023-10-22 07:53:31'),
(10, 'T1566.009', 16, 24, '20231022154521', 9, '2023-10-22 07:55:01', '2023-10-22 07:55:01'),
(11, 'T1566.009', 16, 25, '20231022154521', 10, '2023-10-22 07:55:56', '2023-10-22 07:55:56'),
(12, 'T1566.009', 16, 26, '20231022154521', 11, '2023-10-22 07:58:24', '2023-10-22 07:58:24'),
(13, 'T1566.009', 16, 27, '20231022154521', 12, '2023-10-22 08:14:32', '2023-10-22 08:14:32');

-- --------------------------------------------------------

--
-- 表的结构 `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `document_no` varchar(200) DEFAULT NULL,
  `document_name` varchar(256) DEFAULT NULL,
  `version_number` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `uploader_id` int(11) DEFAULT NULL,
  `is_accepted` tinyint(1) DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `documents`
--

INSERT INTO `documents` (`id`, `document_no`, `document_name`, `version_number`, `content`, `path`, `uploader_id`, `is_accepted`, `status`, `createdAt`, `updatedAt`) VALUES
(13, '20231018154829', '1697615307920-incident01.pdf', 1, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697615307920-incident01.pdf', 16, 1, 1, '2023-10-18 07:48:29', '2023-10-18 07:48:29'),
(17, '20231018154829', '1697615307920-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697615307920-incident01.pdf', 16, 1, 1, '2023-10-18 07:57:20', '2023-10-18 07:57:20'),
(18, '20231018154829', '1697615307920-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697615307920-incident01.pdf', 16, 1, 1, '2023-10-18 08:00:07', '2023-10-18 08:00:07'),
(19, '20231022154521', '1697960720032-incident01.pdf', 1, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 1, '2023-10-22 07:45:21', '2023-10-22 07:45:21'),
(20, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 1, '2023-10-22 07:49:22', '2023-10-22 08:46:32'),
(21, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 1, '2023-10-22 07:52:13', '2023-10-22 08:47:35'),
(22, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 2, '2023-10-22 07:53:05', '2023-10-22 08:47:37'),
(23, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 1, '2023-10-22 07:53:31', '2023-10-22 08:47:46'),
(24, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 2, '2023-10-22 07:55:01', '2023-10-22 08:47:49'),
(25, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 0, '2023-10-22 07:55:56', '2023-10-22 07:55:56'),
(26, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 0, '2023-10-22 07:58:24', '2023-10-22 07:58:24'),
(27, '20231022154521', '1697960720032-incident01.pdf', 2, NULL, 'C:\\Users\\13427\\Desktop\\学生项目\\attackflow_01(1)\\attackflow_01\\attackflow_backend\\routes\\uploadedFiles\\1697960720032-incident01.pdf', 16, 1, 0, '2023-10-22 08:14:32', '2023-10-22 08:14:32');

-- --------------------------------------------------------

--
-- 表的结构 `referenced_texts`
--

CREATE TABLE `referenced_texts` (
  `id` int(11) NOT NULL,
  `referenced_text` text DEFAULT NULL,
  `document` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `referenced_texts`
--

INSERT INTO `referenced_texts` (`id`, `referenced_text`, `document`, `createdAt`, `updatedAt`) VALUES
(3, 'our website monitoring system alarmed us with an abnormal \ndatabase query request. ', 17, '2023-10-18 07:57:20', '2023-10-18 07:57:20'),
(4, 'he  attacker  managed  to  bypass  our  security  measures  and  successfully  extracted \napproximately 100 user records from the user database', 18, '2023-10-18 08:00:07', '2023-10-18 08:00:07'),
(5, 'sis raised suspicions of malicious activity, which led \nus to conduct a thorough investigation. The investigation confirme', 20, '2023-10-22 07:49:22', '2023-10-22 07:49:22'),
(6, ' an input form on our website, aiming to access and \nextract user data stored in our database. ', 21, '2023-10-22 07:52:13', '2023-10-22 07:52:13'),
(7, ' on  their  accounts.  Additionally,  we  enhanced  our \nmonitoring system to facilitate quick', 22, '2023-10-22 07:53:05', '2023-10-22 07:53:05'),
(8, 't an attacker tried to exploit our system by \nsubmitting malicious SQL code through an input form on our website, aiming to access and \nextract user data stored in our database. \n ', 23, '2023-10-22 07:53:31', '2023-10-22 07:53:31'),
(9, 'ng system alarmed us with an abnormal \ndatabase query request. Our initial analysis raised suspicions of malicious activity, which led \nus to conduct a thorough investigation. The investigation confirmed that we were under a \nSQL injection attack. It was discovered that an attacker tri', 24, '2023-10-22 07:55:01', '2023-10-22 07:55:01'),
(10, 'ddresses, which posed a', 25, '2023-10-22 07:55:56', '2023-10-22 07:55:56'),
(11, 'ctivity, which led \nus to conduct a thorough investigation. The investigation confirmed that we were under a \nSQL injection attack. It was discovered that an attacker tried to exploit our system by', 26, '2023-10-22 07:58:24', '2023-10-22 07:58:24'),
(12, 'onfirmed that we were under a \nSQL injection attack. It was discovered that an attacker tried to exploit our s', 27, '2023-10-22 08:14:32', '2023-10-22 08:14:32');

-- --------------------------------------------------------

--
-- 表的结构 `tags`
--

CREATE TABLE `tags` (
  `id` int(20) NOT NULL,
  `type` int(10) DEFAULT 1,
  `name` varchar(200) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tags`
--

INSERT INTO `tags` (`id`, `type`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'T1566.001', 1, '2023-10-16 18:40:03', '2023-10-16 18:40:22'),
(2, 1, 'T1566.002', 1, '2023-10-16 18:40:03', '2023-10-16 18:40:22'),
(3, 1, 'T1566.003', 1, '2023-10-17 09:01:29', '2023-10-17 09:01:29'),
(4, 1, 'T1566.004', 1, '2023-10-17 09:02:18', '2023-10-17 09:02:18'),
(5, 1, 'T15662.005', 1, '2023-10-17 09:03:46', '2023-10-17 09:05:46'),
(6, 1, 'T1566.006', 1, '2023-10-17 09:06:54', '2023-10-17 09:06:54'),
(7, 1, 'T1566.007', 1, '2023-10-17 09:07:48', '2023-10-17 09:07:48'),
(8, 1, 'T1566.008', 1, '2023-10-17 09:08:45', '2023-10-17 09:08:45'),
(9, 1, 'T1566.009', 1, '2023-10-17 09:09:21', '2023-10-17 09:09:21'),
(10, 1, 'T1566.010', 1, '2023-10-17 09:10:09', '2023-10-17 09:10:09');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `account` varchar(200) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(2000) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(127) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `astatus` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `account`, `username`, `password`, `phone`, `email`, `is_admin`, `astatus`, `createdAt`, `updatedAt`) VALUES
(15, '18825110242', '', 'Aa123321', '18825110242', '13427512743@qq.com', 1, 1, '2023-10-16 06:44:33', '2023-10-19 06:41:25'),
(16, '18825110241', '', 'Aa123321', '18825110241', '13427512743@qq.com', 0, 1, '2023-10-16 06:44:33', '2023-10-17 08:06:11'),
(17, '18825110243', '', 'Aa123321', '18825110243', '13457512743@qq.com', 0, 2, '2023-10-16 06:44:33', '2023-10-17 08:06:22'),
(18, '18825110244', '', 'Aa123321', '18825110243', '13457512743@qq.com', 0, 2, '2023-10-16 06:44:33', '2023-10-17 08:06:22'),
(19, '18825110245', '', 'Aa123321', '18825110243', '13457512743@qq.com', 0, 1, '2023-10-16 06:44:33', '2023-10-17 08:17:58');

--
-- 转储表的索引
--

--
-- 表的索引 `annotations`
--
ALTER TABLE `annotations`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `referenced_texts`
--
ALTER TABLE `referenced_texts`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `annotations`
--
ALTER TABLE `annotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- 使用表AUTO_INCREMENT `referenced_texts`
--
ALTER TABLE `referenced_texts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
