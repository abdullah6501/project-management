-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_portfolio
-- ------------------------------------------------------
-- Server version	8.0.36

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectlist`
--

LOCK TABLES `projectlist` WRITE;
/*!40000 ALTER TABLE `projectlist` DISABLE KEYS */;
INSERT INTO `projectlist` VALUES (1,'Portfolio Management'),(2,'Inventory Management'),(3,'Attendance Management'),(4,'Usecase Management'),(5,'Talent Harbour Hub'),(7,'Gen AI Validation');
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
  `project_name` varchar(50) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `files` longblob,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Portfolio Management','1721373667548-tiny_wild_bird_searching_for_food_in_nature_6892037.mp4',NULL,'uploads\\1721373667548-tiny_wild_bird_searching_for_food_in_nature_6892037.mp4','mp4'),(2,'Portfolio Management','1721374072379-sample-5s.mp4',NULL,'uploads\\1721374072379-sample-5s.mp4','mp4'),(3,'Portfolio Management','1721374083766-pptexamples.ppt',NULL,'uploads\\1721374083766-pptexamples.ppt','ppt'),(4,'Portfolio Management','1721374097544-Leave Form.docx',NULL,'uploads\\1721374097544-Leave Form.docx','docx'),(5,'Portfolio Management','1721374108384-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721374108384-file_example_MP4_480_1_5MG.mp4','mp4'),(6,'Inventory Management','1721374132121-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721374132121-file_example_MP4_480_1_5MG.mp4','mp4'),(7,'Usecase Management','1721374134055-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721374134055-file_example_MP4_480_1_5MG.mp4','mp4'),(8,'Attendance Management','1721379983664-data genius.sql',NULL,'uploads\\1721379983664-data genius.sql','sql'),(9,'Attendance Management','1721379991245-blue.jpg',NULL,'uploads\\1721379991245-blue.jpg','jpg'),(10,'Attendance Management','1721380004690-sample-5s.mp4',NULL,'uploads\\1721380004690-sample-5s.mp4','mp4'),(11,'Attendance Management','1721380017358-1721298456904-pptexamples.ppt',NULL,'uploads\\1721380017358-1721298456904-pptexamples.ppt','ppt'),(12,'Talent Harbour Hub','1721380241673-sample-5s.mp4',NULL,'uploads\\1721380241673-sample-5s.mp4','mp4'),(13,'Portfolio Management','1721384882753-1721298083408-sample-5s.mp4',NULL,'uploads\\1721384882753-1721298083408-sample-5s.mp4','mp4'),(14,'Portfolio Management','1721385322156-pptexamples.ppt',NULL,'uploads\\1721385322156-pptexamples.ppt','ppt'),(15,'Inventory Management','1721393253997-pptexamples.ppt',NULL,'uploads\\1721393253997-pptexamples.ppt','ppt'),(16,'Gen AI Validation','1721394524293-pptexamples.ppt',NULL,'uploads\\1721394524293-pptexamples.ppt','ppt'),(17,'Gen AI Validation','1721394532360-1721298083408-sample-5s.mp4',NULL,'uploads\\1721394532360-1721298083408-sample-5s.mp4','mp4'),(18,'Portfolio Management','1721396752271-sample-5s.mp4',NULL,'uploads\\1721396752271-sample-5s.mp4','mp4'),(19,'Portfolio Management','1721396772583-Leave Form.docx',NULL,'uploads\\1721396772583-Leave Form.docx','docx'),(20,'Portfolio Management','1721396781568-blue.jpg',NULL,'uploads\\1721396781568-blue.jpg','jpg'),(21,'Portfolio Management','1721396791979-Leave Form.docx',NULL,'uploads\\1721396791979-Leave Form.docx','docx'),(22,'Portfolio Management','1721396825698-file_example_MP4_480_1_5MG.mp4',NULL,'uploads\\1721396825698-file_example_MP4_480_1_5MG.mp4','mp4');
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

-- Dump completed on 2024-07-20 12:03:29
