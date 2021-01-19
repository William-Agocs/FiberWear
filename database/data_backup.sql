DROP user 'root'@'%';
FLUSH PRIVILEGES;
CREATE USER 'root'@'%' IDENTIFIED BY '9fe0f919743cd92b';
GRANT ALL PRIVILEGES ON * . * TO 'root'@'%';

CREATE SCHEMA `myapp` DEFAULT CHARACTER SET utf8;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `base_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `base_db`;

-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: base_db
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `challenge_drink_data`
--

DROP TABLE IF EXISTS `challenge_drink_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenge_drink_data` (
  `drink_index` int(11) NOT NULL AUTO_INCREMENT,
  `drink_name` varchar(255) NOT NULL,
  PRIMARY KEY (`drink_index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_drink_data`
--

LOCK TABLES `challenge_drink_data` WRITE;
/*!40000 ALTER TABLE `challenge_drink_data` DISABLE KEYS */;
INSERT INTO `challenge_drink_data` VALUES (1,'Drink 1'),(2,'Drink 2'),(3,'Drink 3'),(4,'Drink 4'),(5,'Drink 5'),(6,'Drink 6');
/*!40000 ALTER TABLE `challenge_drink_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_unique_data`
--

DROP TABLE IF EXISTS `challenge_unique_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenge_unique_data` (
  `data_index` int(11) NOT NULL AUTO_INCREMENT,
  `descriptor` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`data_index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_unique_data`
--

LOCK TABLES `challenge_unique_data` WRITE;
/*!40000 ALTER TABLE `challenge_unique_data` DISABLE KEYS */;
INSERT INTO `challenge_unique_data` VALUES (1,'challenge_start_time','2020-12-29 20:24:20');
/*!40000 ALTER TABLE `challenge_unique_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_user_data`
--

DROP TABLE IF EXISTS `challenge_user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenge_user_data` (
  `user_index` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_drink_order` varchar(255) NOT NULL,
  `number_of_drinks_finished` int(11) NOT NULL DEFAULT '0',
  `finish_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_index`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_user_data`
--

LOCK TABLES `challenge_user_data` WRITE;
/*!40000 ALTER TABLE `challenge_user_data` DISABLE KEYS */;
INSERT INTO `challenge_user_data` VALUES (1,'Cameron','1_2_3_4_5_6_',7,'2020-12-30 02:43:00'),(2,'Duncan','1_2_3_4_5_6_',7,'2020-12-30 03:11:40'),(3,'Jake','1_2_3_4_5_6_',4,'2020-12-30 04:52:00'),(4,'Jeremy','1_2_3_4_5_6_',5,'2020-12-30 04:52:00'),(5,'Joe','1_2_3_4_5_6_',7,'2020-12-30 03:02:40'),(6,'Liam','1_2_3_4_5_6_',7,'2020-12-30 03:10:02'),(7,'William','1_2_3_4_5_6_',7,'2020-12-30 02:21:00'),(8,'Zach','1_2_3_4_5_6_',5,'2020-12-30 04:51:00');
/*!40000 ALTER TABLE `challenge_user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_user_drink_data`
--

DROP TABLE IF EXISTS `challenge_user_drink_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenge_user_drink_data` (
  `entry_index` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `drink_id` enum('1','2','3','4','5','6') NOT NULL,
  `drink_name` varchar(255) NOT NULL,
  PRIMARY KEY (`entry_index`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_user_drink_data`
--

LOCK TABLES `challenge_user_drink_data` WRITE;
/*!40000 ALTER TABLE `challenge_user_drink_data` DISABLE KEYS */;
INSERT INTO `challenge_user_drink_data` VALUES (49,1,'Cameron','1','Porter'),(50,1,'Cameron','2','Last Duel'),(51,1,'Cameron','3','Squirrel'),(52,1,'Cameron','4','Perth IPA'),(53,1,'Cameron','5','Muskoka'),(54,1,'Cameron','6','Belgian Moon'),(55,2,'Duncan','1','Organic'),(56,2,'Duncan','2','Banquet'),(57,2,'Duncan','3','Amber'),(58,2,'Duncan','4','Detour'),(59,2,'Duncan','5','Peanut Butter'),(60,2,'Duncan','6','Lemonade'),(61,3,'Jake','1','Mad Tom'),(62,3,'Jake','2','Detour'),(63,3,'Jake','3','Moose'),(64,3,'Jake','4','Big Rig'),(65,3,'Jake','5','1855'),(66,3,'Jake','6','Vimy Creek'),(67,4,'Jeremy','1','Kitch'),(68,4,'Jeremy','2','Denmark'),(69,4,'Jeremy','3','Trussle'),(70,4,'Jeremy','4','Muskoka'),(71,4,'Jeremy','5','Hop City'),(72,4,'Jeremy','6','Stout'),(73,5,'Joe','1','Wood Howie'),(74,5,'Joe','2','Faxe'),(75,5,'Joe','3','Lezajsk'),(76,5,'Joe','4','Talabogie'),(77,5,'Joe','5','Smith Wilks'),(78,5,'Joe','6','Guinness'),(79,6,'Liam','1','Russian Imp'),(80,6,'Liam','2','Tennants'),(81,6,'Liam','3','Faxe'),(82,6,'Liam','4','Choc Thun'),(83,6,'Liam','5','Keller'),(84,6,'Liam','6','Dab'),(85,7,'William','1','Guinness'),(86,7,'William','2','Mad Tom'),(87,7,'William','3','Creemore'),(88,7,'William','4','Lug Tread'),(89,7,'William','5','Farmers'),(90,7,'William','6','Millstreet'),(91,8,'Zach','1','Stranger'),(92,8,'Zach','2','Broadhead'),(93,8,'Zach','3','Barking'),(94,8,'Zach','4','Hell or High'),(95,8,'Zach','5','Detour'),(96,8,'Zach','6','Shocktop');
/*!40000 ALTER TABLE `challenge_user_drink_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_data`
--

DROP TABLE IF EXISTS `group_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_data` (
  `group_index` int(11) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(255) NOT NULL,
  `group_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itad_user_data`
--

DROP TABLE IF EXISTS `itad_user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itad_user_data` (
  `user_index` int(11) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(255) NOT NULL,
  `type_of_account` int(11) NOT NULL DEFAULT '1',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone_number` varchar(255) DEFAULT NULL,
  `user_fax_number` varchar(255) DEFAULT NULL,
  `profile_picture_file_path` varchar(255) DEFAULT NULL,
  `user_token` varchar(255) DEFAULT NULL,
  `account_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_index`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itad_user_data`
--

LOCK TABLES `itad_user_data` WRITE;
/*!40000 ALTER TABLE `itad_user_data` DISABLE KEYS */;
INSERT INTO `itad_user_data` VALUES (1,'testing',1,'jeremylevasseur','password','Jeremy','Levasseur','jeremy.levasseur@carleton.ca','','','https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','2020-11-16 16:59:11'),(2,'testing',1,'jeremytest4','password',NULL,NULL,'jeremy.levasseur@carleton.ca',NULL,NULL,'https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteXRlc3Q0In0.mX9uR9BnYmEz5apy5Pt8txQIzxOuV3OrINWzM3FJhL8','2020-11-30 12:38:48'),(3,'testing',1,'jeremylevasseurt1','password',NULL,NULL,'jeremy.levasseur@carleton.ca',NULL,NULL,'https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1cnQxIn0.nahILGY7cUahExofFBU6KSB7pXk-JUuuBNQcu8wJD3U','2020-12-01 13:04:18');
/*!40000 ALTER TABLE `itad_user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itad_user_session_data`
--

DROP TABLE IF EXISTS `itad_user_session_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itad_user_session_data` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_jwt_token` varchar(255) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  `session_deadline` varchar(255) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `user_jwt_token` (`user_jwt_token`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itad_user_session_data`
--

LOCK TABLES `itad_user_session_data` WRITE;
/*!40000 ALTER TABLE `itad_user_session_data` DISABLE KEYS */;
INSERT INTO `itad_user_session_data` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','Lk9pV9LKKgGLteHsavzfMA==','1610727111123'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1cnQxIn0.nahILGY7cUahExofFBU6KSB7pXk-JUuuBNQcu8wJD3U','bpQdp7uNs2x2ria+dZslaA==','1606849469509'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhbGxQcmVzZW50YXRpb25Vc2VyIn0.AT10QqvSbYVr9pwnh9T7LO4IM3uc2KliXMaT82U1ULY','vT0c5nPHkwEu07i6P6qrnA==','1606849550245');
/*!40000 ALTER TABLE `itad_user_session_data` ENABLE KEYS */;
UNLOCK TABLES;
