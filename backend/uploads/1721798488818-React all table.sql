-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: pulse
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `approles`
--

DROP TABLE IF EXISTS `approles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approles` (
  `RoleId` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approles`
--

LOCK TABLES `approles` WRITE;
/*!40000 ALTER TABLE `approles` DISABLE KEYS */;
INSERT INTO `approles` VALUES (1,'ADMIN',1,'2024-03-28 23:15:52'),(2,'EMPLOYEE',1,'2024-03-28 23:15:52');
/*!40000 ALTER TABLE `approles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appuser`
--

DROP TABLE IF EXISTS `appuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appuser` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(500) NOT NULL,
  `Password` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsFirstLogin` tinyint(1) NOT NULL DEFAULT '1',
  `RoleId` int NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `appuser_approles_FK_idx` (`RoleId`),
  CONSTRAINT `appuser_approles_FK` FOREIGN KEY (`RoleId`) REFERENCES `approles` (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appuser`
--

LOCK TABLES `appuser` WRITE;
/*!40000 ALTER TABLE `appuser` DISABLE KEYS */;
INSERT INTO `appuser` VALUES (5,'rishiselvan0@gmail.com','$2a$10$W5fkLn0YkbmIMucIjmMq/ORyEkv88FBdRQ7iNukZCHux6A1tfIvtC',1,'2024-04-18 11:28:00',0,1),(6,'thirumavalan@devpozent.com','$2a$10$PdXap3amY71d7PXIL4XTQ.noB/eaBfSa7oI9SYqHQ9E.v6bgeS6vi',1,'2024-04-18 13:32:53',0,1),(7,'abdullahsm0111@gmail.com','$2a$10$nTtWHYSBhRKbgHmwx5D9QOtjVAP/VROwNBrWb16upDMP3TZ91s2uG',1,'2024-04-18 16:00:10',0,2),(8,'admin@gmail.com','$2a$10$0IYmuJlBSvtf4CsIooDUkeUsjwx3fq6TMiYxMZivXJporiuf9p0RW',1,'2024-04-23 18:59:08',0,1),(9,'nandhini@gmail.com','$2a$10$mYwzjyvDcG5dV7R36EEc9.GEf.EfVXwQo7P6zMTelR23/OB1.u6Z2',1,'2024-04-24 13:17:22',0,2),(10,'Jana@gmail.com','$2a$10$axBE.7QrBO.28vcm229OG.wI2tIZ14tT5htxTwL48wLHauzU0R0qa',1,'2024-04-24 19:31:25',0,2),(11,'manoj@gmail.com','$2a$10$pyl/JTSZs9YRI2BRiRGgmOawGWzhf.pXNZimzbCk4Rq7SQu5RaO4W',1,'2024-04-25 09:14:03',0,2),(12,'somusundaram@gmail.com','$2a$10$i0BKc6AVV9yd3t9z73IUtOqfWS7z/pcBaSUp4WqiG0emx4NaPIG6y',1,'2024-04-25 10:09:14',0,2),(13,'aravinth@gmail.com','$2a$10$/1Ct4tMzMUlVoxC1I.l6Ce80O3d91w7QCyliytCJE3C9xfq/FTUNK',1,'2024-04-28 09:54:57',0,2);
/*!40000 ALTER TABLE `appuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_info`
--

DROP TABLE IF EXISTS `project_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_info` (
  `Projectid` varchar(7) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Email` varchar(300) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Team` varchar(500) DEFAULT NULL,
  `Startdate` date DEFAULT NULL,
  `Deadline` date DEFAULT NULL,
  `Tools` varchar(300) DEFAULT NULL,
  `Files` blob,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_info`
--

LOCK TABLES `project_info` WRITE;
/*!40000 ALTER TABLE `project_info` DISABLE KEYS */;
INSERT INTO `project_info` VALUES ('PROJ101','Portfolio','abdullahsm0111@gmail.com','manage portfolio of employee','Thirumavalavan,rishi','2024-04-04','2024-04-14','React JS','',0),('PROJ102','Attendance management','Jana@gmail.com','manage the attendance in efficient way','Jana,Abdullah','2024-04-09','2024-04-20','Angular','',0),('PROJ103','sql query generator','manoj@gmail.com','this module search our sql query in database and give','manoj','2024-04-10','2024-04-19','LLM,GEN AI',_binary '[object Object]',0),('PROJ104','Avatar','somusundaram@gmail.com','Avatar can speak answer based on our question','somu,karthik','2024-04-09','2024-04-20','Gen AI','',0),('PROJ105','Dart','rohith@gmail.com','data preproccessing','Rohith','2024-04-16','2024-04-18','LLM,ML','',0),('PROJ106','sdmVKl<ds','ASC,A/<c','A;VZ>Xa?>SV','Thiru,Nandhini,Jana','2024-04-16','2024-04-05','AKLFKSL;A','',0),('PROJ107','AALDKA;LKDA','DMLAK;LAM','JCHSJKHKLWJCS','Nandhini,Rishi,Jana,Manoj','2024-04-10','2024-04-06','CKHCJHWJKC','',0),('PROJ108','mams,fma.,sc','ff/s,/F,/.SD,F',';F;A,F;/AF','Thiru,Jana,Nandhini','2024-04-16','2024-04-04','/DMQMdw','',0),('PROJ109','sql query','aravinth@gmail.com','query generator','Thiru,Manoj,Jana,Nandhini','2024-04-10','2024-04-11','React JS','',0),('PROJ110','Porfolio','abdullahsm0111@gmail.com','gathering employee data','Thiru,Jana,Nandhini','2024-04-23','2024-04-11','Angular','',0),('PROJ111','Usecase management system','rishiselvan0@gmail.com','maintain and manage employee details in eficient way','Thiru,Nandhini,Rishi','2024-04-08','2024-04-12','React','',0),('PROJ112','jdkjaldsjaklda','manoj@gmail.com','kdjakldsmda','Jana,Thiru,Rishi','2024-04-03','2024-04-04','Node','',0),('PROJ113','asddm,.SD','manoj@gmail.com','A,,dDd','Thiru,Nandhini','2024-04-18','2024-04-08','REACT','',0),('PROJ114','SKklak','manoj@gmail.com','KASM.kal;k','Rishi,Thiru,Jana','2024-04-19','2024-04-10','REACT','',0);
/*!40000 ALTER TABLE `project_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_info_seq`
--

DROP TABLE IF EXISTS `project_info_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_info_seq` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_info_seq`
--

LOCK TABLES `project_info_seq` WRITE;
/*!40000 ALTER TABLE `project_info_seq` DISABLE KEYS */;
INSERT INTO `project_info_seq` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14);
/*!40000 ALTER TABLE `project_info_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskdetails`
--

DROP TABLE IF EXISTS `taskdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskdetails` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Date` varchar(200) DEFAULT NULL,
  `Dailytask` varchar(500) DEFAULT NULL,
  `Email` varchar(400) DEFAULT NULL,
  KEY `taskdetails_ibfk_1` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskdetails`
--

LOCK TABLES `taskdetails` WRITE;
/*!40000 ALTER TABLE `taskdetails` DISABLE KEYS */;
INSERT INTO `taskdetails` VALUES (1,'2024-04-25 13:16:08','creating ml pipeline',NULL),(2,'2024-04-26 11:16:31','',NULL),(3,'2024-04-26 11:24:07','',NULL),(4,'2024-04-26 11:25:43','',NULL),(5,'2024-04-26 11:28:51','',NULL),(6,'2024-04-26 11:29:58','',NULL),(7,'2024-04-26 11:30:08','',NULL),(8,'2024-04-26 11:30:55','',NULL),(9,'2024-04-26 11:37:22','',NULL),(10,'2024-04-26 11:38:43','task',NULL),(11,'2024-04-26 11:39:10','task',NULL),(12,'2024-04-26 11:43:43','daily task',NULL),(13,'2024-04-26 11:45:01','daily task',NULL),(14,'2024-04-26 11:48:13','task','somusundaram@gmail.com'),(15,'2024-04-26 11:49:16','i completed my task','abdullahsm0111@gmail.com'),(16,'2024-04-26 11:51:16','i completed today task','rohith@gmail.com'),(17,'2024-04-26 12:16:31','tadk',NULL),(18,'2024-04-26 12:28:19','aygJHD','rohith@gmail.com'),(19,'2024-04-28 05:29:36','task',NULL),(20,'2024-04-28 05:32:14','task',NULL),(21,'2024-04-28 05:37:33','task','manoj@gmail.com'),(22,'2024-04-28 05:42:12','Today i completed task','abdullahsm0111@gmail.com'),(23,'2024-04-29 04:07:10','today i completed ui page','rishiselvan0@gmail.com'),(24,'2024-04-29 04:31:17','hii','manoj@gmail.com'),(25,'2024-04-30 07:39:16','today implementing task details fetching using admin','rishiselvan0@gmail.com');
/*!40000 ALTER TABLE `taskdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_table`
--

DROP TABLE IF EXISTS `time_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Userid` varchar(45) DEFAULT NULL,
  `Date` varchar(40) DEFAULT NULL,
  `Time` varchar(40) DEFAULT NULL,
  `Activity_type` varchar(45) DEFAULT NULL,
  `Comments` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_table`
--

LOCK TABLES `time_table` WRITE;
/*!40000 ALTER TABLE `time_table` DISABLE KEYS */;
INSERT INTO `time_table` VALUES (1,'nandhini@gmail.com','4/14/2024','05:14:17','login',NULL),(2,'nandhini@gmail.com','4/14/2024','05:14:17','breakin',NULL),(3,'nandhini@gmail.com','4/14/2024','05:14:22','breakout',NULL),(4,'nandhini@gmail.com','4/14/2024','05:14:22','logout',NULL),(5,'nandhini@gmail.com','4/14/2024','05:25:57','login',NULL),(6,'nandhini@gmail.com','4/14/2024','05:25:58','breakout',NULL),(7,'nandhini@gmail.com','4/14/2024','05:26:01','logout',NULL),(8,'nandhini@gmail.com','4/14/2024','05:28:22','login',NULL),(9,'nandhini@gmail.com','4/14/2024','05:28:25','logout',NULL),(10,'nandhini@gmail.com','4/14/2024','05:28:27','breakin',NULL),(11,'nandhini@gmail.com','4/15/2024','07:28:51','login',NULL),(12,'nandhini@gmail.com','4/15/2024','07:28:58','login',NULL),(13,'nandhini@gmail.com','4/15/2024','09:59:55','login',NULL);
/*!40000 ALTER TABLE `time_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 12:02:15
