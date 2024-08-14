-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: proport
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projectlist`
--

DROP TABLE IF EXISTS `projectlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectlist` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectlist`
--

LOCK TABLES `projectlist` WRITE;
/*!40000 ALTER TABLE `projectlist` DISABLE KEYS */;
INSERT INTO `projectlist` VALUES (1,'Portfolio Management'),(2,'Inventory Management'),(3,'Attendance Management'),(4,'Usecase Management'),(5,'Talent Harbour Hub'),(7,'Gen AI Validation'),(10,'Helllllloooooooo'),(11,'Test Folder'),(12,'dfdsfdklsafdklafjas'),(13,'1'),(14,'2'),(15,'3');
/*!40000 ALTER TABLE `projectlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `files` longblob,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Portfolio Management','1721484381392-1721481513987-techstack.xlsx',NULL,'uploads\\1721484381392-1721481513987-techstack.xlsx',NULL,'docs'),(2,'Portfolio Management','1721484381387-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721484381387-file_example_MP4_480_1_5MG.mp4',NULL,'videos'),(3,'Portfolio Management','1721484381425-proport.sql',NULL,'uploads\\1721484381425-proport.sql',NULL,'misc'),(4,'Helllllloooooooo','1721542094478-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721542094478-file_example_MP4_480_1_5MG.mp4',NULL,'videos'),(5,'Helllllloooooooo','1721542094487-SampleVideo_1280x720_5mb.flv',NULL,'uploads\\1721542094487-SampleVideo_1280x720_5mb.flv',NULL,'videos'),(6,'Helllllloooooooo','1721542094474-3209828-uhd_3840_2160_25fps.mp4',NULL,'uploads\\1721542094474-3209828-uhd_3840_2160_25fps.mp4',NULL,'videos'),(7,'Helllllloooooooo','1721542919694-1721481513987-techstack.xlsx',NULL,'uploads\\1721542919694-1721481513987-techstack.xlsx',NULL,'docs'),(8,'Helllllloooooooo','1721542919697-think twice code once.jpg',NULL,'uploads\\1721542919697-think twice code once.jpg',NULL,'misc'),(9,'Test Folder','1721628618233-doc-icon.png',NULL,'uploads\\1721628618233-doc-icon.png',NULL,'docs'),(10,'Test Folder','1721628618244-1721542919694-1721481513987-techstack.xlsx',NULL,'uploads\\1721628618244-1721542919694-1721481513987-techstack.xlsx',NULL,'misc'),(11,'Test Folder','1721628618225-SampleVideo_1280x720_5mb.flv',NULL,'uploads\\1721628618225-SampleVideo_1280x720_5mb.flv',NULL,'videos'),(12,'Test Folder','1721628678756-SampleVideo_1280x720_2mb.flv',NULL,'uploads\\1721628678756-SampleVideo_1280x720_2mb.flv',NULL,'videos'),(13,'Test Folder','1721628735729-3209828-uhd_3840_2160_25fps.mp4',NULL,'uploads\\1721628735729-3209828-uhd_3840_2160_25fps.mp4',NULL,'videos'),(14,'Test Folder','1721628953144-11.01.2024_13.47.39_REC.mp4',NULL,'uploads\\1721628953144-11.01.2024_13.47.39_REC.mp4',NULL,'videos'),(15,'Test Folder','1721629015286-1721542919694-1721481513987-techstack.xlsx',NULL,'uploads\\1721629015286-1721542919694-1721481513987-techstack.xlsx',NULL,'docs');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22 12:33:15
