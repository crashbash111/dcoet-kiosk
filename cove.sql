-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2019 at 06:40 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cove`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Birds', 'New Zealand has a multitude of birds both ground-dwelling and nest-building.', NULL, NULL),
(2, 'Pests', 'Pests are creatures that harm New Zealand\'s fragile eco system.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image_name`, `alt`, `page_id`, `created_at`, `updated_at`) VALUES
(1, 'pink1_1563775805png', NULL, 36, '2019-07-21 18:10:05', '2019-07-21 18:10:05'),
(2, 'pink1_1563775886.png', NULL, 37, '2019-07-21 18:11:26', '2019-07-21 18:11:26'),
(3, 'cyan1_1563776132.png', NULL, 38, '2019-07-21 18:15:32', '2019-07-21 18:15:32'),
(4, 'cyan1_1563776211.png', NULL, 39, '2019-07-21 18:16:51', '2019-07-21 18:16:51'),
(5, 'cyan1_1563776275.png', NULL, 40, '2019-07-21 18:17:55', '2019-07-21 18:17:55'),
(6, 'cyan1_1563776377.png', NULL, 41, '2019-07-21 18:19:37', '2019-07-21 18:19:37'),
(7, 'cyan1_1563776416.png', NULL, 42, '2019-07-21 18:20:16', '2019-07-21 18:20:16'),
(8, 'cyan1_1563776455.png', NULL, 43, '2019-07-21 18:20:55', '2019-07-21 18:20:55'),
(9, 'cyan1_1563776494.png', NULL, 44, '2019-07-21 18:21:34', '2019-07-21 18:21:34'),
(10, 'cyan1_1563776506.png', NULL, 45, '2019-07-21 18:21:46', '2019-07-21 18:21:46'),
(11, '1200312Weka1_1563777200.jpg', NULL, 46, '2019-07-21 18:33:20', '2019-07-21 18:33:20'),
(12, 'sit_car_1563777586.jpg', NULL, 47, '2019-07-21 18:39:46', '2019-07-21 18:39:46'),
(13, 'tui-1_1563785074.jpg', NULL, 48, '2019-07-21 20:44:34', '2019-07-21 20:44:34'),
(14, '5a4613ddd099a2ad03f9c994_1563829280.png', NULL, 49, '2019-07-22 09:01:20', '2019-07-22 09:01:20'),
(15, '2000px-Red_star.svg - Copy_1563829280.png', NULL, 49, '2019-07-22 09:01:20', '2019-07-22 09:01:20'),
(16, '300px-Deep_cove2560_1563829280.jpg', NULL, 49, '2019-07-22 09:01:20', '2019-07-22 09:01:20'),
(17, '1200312Weka1_1563829280.jpg', NULL, 49, '2019-07-22 09:01:20', '2019-07-22 09:01:20'),
(18, '1541958054699_1563926274.jpg', NULL, 50, '2019-07-23 11:57:54', '2019-07-23 11:57:54'),
(19, 'NZBO_GreatSpottedKiwi_MD_0697_1563926274.jpg', NULL, 50, '2019-07-23 11:57:54', '2019-07-23 11:57:54'),
(20, 'southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920_1563926274.jpg', NULL, 50, '2019-07-23 11:57:54', '2019-07-23 11:57:54'),
(21, 'tmg-article_tall_1563926274.jpg', NULL, 50, '2019-07-23 11:57:54', '2019-07-23 11:57:54'),
(22, 'minden_90710440_1563926429.jpg', NULL, 51, '2019-07-23 12:00:29', '2019-07-23 12:00:29'),
(23, 'Kakapo_DvW2007_1563926429.jpg', NULL, 51, '2019-07-23 12:00:29', '2019-07-23 12:00:29'),
(24, 'download_1563926430.jpg', NULL, 51, '2019-07-23 12:00:30', '2019-07-23 12:00:30'),
(25, 'stella-the-kakapo-codfish-1600_1563926430.jpg', NULL, 51, '2019-07-23 12:00:30', '2019-07-23 12:00:30');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_07_16_043834_create_pages_table', 1),
(4, '2019_07_19_062920_create_categories_table', 2),
(5, '2019_07_19_063446_add_category_id_to_pages_table', 3),
(7, '2019_07_22_043722_create_images_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `heading`, `text`, `created_at`, `updated_at`, `category_id`) VALUES
(50, 'Kiwi', 'Kiwi are ratites. The closest relatives to kiwi today is the elephant bird from Madagascar. They are also related to emus and cassowaries of Australia, and the extinct moa of New Zealand.', '2019-07-23 11:57:54', '2019-07-23 11:57:54', 1),
(51, 'Kakapo', 'The kakapo is a large, nocturnal, flightless, lek-breeding parrot – a real oddity. It is also critically endangered, and the focus of considerable conservation attention. Before humans arrived it was common throughout New Zealand’s forests, but predation by introduced mammals brought it to the brink of extinction - a low point of about 50 birds only in the mid 1990s. The transfer of the whole population to predator-free islands and intensive intervention in every stage of its life has led to a steady increase in numbers.', '2019-07-23 12:00:29', '2019-07-23 12:00:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
