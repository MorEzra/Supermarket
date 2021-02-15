CREATE DATABASE  IF NOT EXISTS `supermarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total_price` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `cart_id_idx` (`cart_id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (62,6,5,15,25),(63,10,2,6,25),(64,11,2,2,25),(72,6,2,6,25),(74,2,3,9,27),(76,3,3,15,28),(83,2,1,3,29),(85,8,1,3,29),(86,7,1,2,29),(88,2,2,6,30),(89,3,2,10,30),(91,2,1,3,31),(92,10,5,15,32),(93,19,3,15,32),(95,3,3,15,34),(96,3,2,10,35),(97,6,2,6,36),(98,2,2,6,37),(99,2,2,6,38),(100,2,2,6,39),(101,6,3,9,39),(102,11,1,1,39),(103,3,2,10,40),(104,11,3,3,40),(105,12,4,4,40),(106,9,1,2,40),(108,4,2,10,41),(110,6,2,6,41),(112,2,2,6,43),(115,3,5,25,44),(116,4,2,10,44),(117,10,2,6,44),(118,9,1,2,44),(120,2,1,3,45),(122,4,1,5,47),(131,2,2,6,26),(132,4,2,10,26),(133,11,2,2,26),(135,2,2,6,48),(140,2,2,6,49),(142,3,2,10,49),(149,2,2,6,50),(151,9,1,2,50),(155,2,3,9,51),(156,2,2,6,52),(158,2,2,6,53),(159,4,2,10,53),(160,3,2,10,54),(162,3,2,10,55),(167,2,2,6,57),(170,13,2,14,58),(173,2,2,6,59),(175,5,5,15,60),(178,20,1,5,62),(179,3,1,5,62),(180,10,1,3,62),(187,2,2,6,64),(196,4,2,10,65),(199,9,2,4,67),(201,13,2,14,67);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creation_date` date NOT NULL,
  `is_open` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (25,203679428,'2021-01-04',0),(26,305167181,'2021-01-13',1),(27,203679428,'2021-01-14',0),(28,203679428,'2021-01-14',0),(29,203679428,'2021-01-14',0),(30,203679428,'2021-01-16',0),(31,203679428,'2021-01-16',0),(32,203679428,'2021-01-16',0),(33,203679428,'2021-01-16',0),(34,203679428,'2021-01-16',0),(35,203679428,'2021-01-16',0),(36,203679428,'2021-01-16',0),(37,203679428,'2021-01-16',0),(38,203679428,'2021-01-16',0),(39,203679428,'2021-01-16',0),(40,203679428,'2021-01-16',0),(41,203679428,'2021-01-16',0),(42,203679428,'2021-01-16',0),(43,203679428,'2021-01-16',0),(44,203679428,'2021-01-16',0),(45,203679428,'2021-01-16',0),(46,203679428,'2021-01-16',0),(47,203679428,'2021-01-16',0),(48,203679428,'2021-01-16',0),(49,203679428,'2021-01-16',0),(50,203679428,'2021-01-17',0),(51,203679428,'2021-01-18',0),(52,203679428,'2021-01-18',0),(53,203679428,'2021-01-18',0),(54,203679428,'2021-01-18',0),(55,203679428,'2021-01-18',0),(56,203679428,'2021-01-18',0),(57,203679428,'2021-01-18',0),(58,203679428,'2021-01-18',0),(59,203679428,'2021-01-20',0),(60,55494272,'2021-01-22',0),(61,55494272,'2021-01-22',1),(62,305135501,'2021-01-22',0),(63,51800027,'2021-01-22',1),(64,305135501,'2021-01-22',0),(65,203679428,'2021-01-25',0),(66,203679428,'2021-01-26',1),(67,112332123,'2021-01-26',0);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Cereal'),(3,'Diary'),(4,'Frozen'),(2,'Juice'),(1,'Snacks');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Haifa'),(2,'Pardes Hana'),(3,'Netanya'),(4,'Rosh HaAyin'),(5,'Hod Hasharon'),(6,'Kfar Saba'),(7,'Rishon LeTzion'),(8,'Ashdod'),(9,'Be\'er Sheva'),(10,'Eilat');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `total_price` int NOT NULL,
  `delivery_city_id` int NOT NULL,
  `delivery_street` varchar(15) NOT NULL,
  `delivery_date` date NOT NULL,
  `order_date` date NOT NULL,
  `credit_card_digits` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id_idx` (`cart_id`),
  KEY `user-id_idx` (`user_id`),
  KEY `city-id_idx` (`delivery_city_id`),
  CONSTRAINT `cart-id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `city-id` FOREIGN KEY (`delivery_city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `user-id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,203679428,25,50,5,'Shir Hashirim 4','2021-01-15','2021-01-14',1111),(3,203679428,27,18,5,'Shir Hashirim 4','2021-01-15','2021-01-14',1111),(4,203679428,28,24,2,'Shir Hashirim 4','2021-01-15','2021-01-14',2222),(5,203679428,29,14,5,'Shir Hashirim 4','2021-01-17','2021-01-16',1111),(6,203679428,30,19,6,'Shir Hashirim 4','2021-01-17','2021-01-16',1111),(7,203679428,31,9,3,'Shir Hashirim 4','2021-01-18','2021-01-16',2222),(8,203679428,32,30,5,'Shir Hashirim 4','2021-01-18','2021-01-16',2222),(9,203679428,33,15,5,'Shir Hashirim 4','2021-01-20','2021-01-16',5555),(10,203679428,34,15,5,'HaZayit 13','2021-01-20','2021-01-16',2341),(11,203679428,35,10,5,'HaZayit 13','2021-01-26','2021-01-16',1111),(12,203679428,36,6,5,'Shir Hashirim 4','2021-01-20','2021-01-16',2341),(13,203679428,37,6,5,'Shir Hashirim 4','2021-01-27','2021-01-16',1111),(14,203679428,38,6,4,'Shir Hashirim 4','2021-01-29','2021-01-16',2222),(15,203679428,39,16,5,'Shir Hashirim 4','2021-01-27','2021-01-16',1111),(16,203679428,40,19,3,'Shir Hashirim 4','2021-01-30','2021-01-16',2222),(17,203679428,41,22,5,'Shir Hashirim 4','2021-01-30','2021-01-16',2341),(18,203679428,42,3,4,'HaZayit 13','2021-01-22','2021-01-16',4456),(19,203679428,43,6,2,'HaZayit 13','2021-01-22','2021-01-16',4532),(20,203679428,44,49,5,'HaZayit 13','2021-01-25','2021-01-16',2222),(21,203679428,45,69,4,'HaZayit 13','2021-01-25','2021-01-16',2222),(22,203679428,46,6,5,'Shir Hashirim 4','2021-01-25','2021-01-16',3333),(23,203679428,47,5,4,'HaZayit 13','2021-01-26','2021-01-16',7533),(24,203679428,48,12,5,'Shir Hashirim 4','2021-01-27','2021-01-16',1111),(25,203679428,49,19,5,'HaZayit 13','2021-01-18','2021-01-17',1111),(26,203679428,50,14,5,'HaZayit 13','2021-01-22','2021-01-17',2664),(27,203679428,51,9,3,'HaZayit 13','2021-01-19','2021-01-18',2345),(28,203679428,52,12,3,'HaZayit 13','2021-01-19','2021-01-18',3456),(29,203679428,53,16,3,'HaZayit 13','2021-01-24','2021-01-18',5543),(30,203679428,54,10,5,'HaZayit 13','2021-01-28','2021-01-18',4532),(31,203679428,55,16,3,'HaZayit 13','2021-01-29','2021-01-18',7743),(32,203679428,56,6,5,'Shir Hashirim 4','2021-01-31','2021-01-18',4674),(33,203679428,57,6,2,'HaZayit 13','2021-01-28','2021-01-18',4532),(34,203679428,58,14,5,'HaZayit 13','2021-01-29','2021-01-19',6654),(35,55494272,60,21,4,'Shir Hashirim 4','2021-01-28','2021-01-22',2554),(36,203679428,59,6,5,'HaZayit 13','2021-01-24','2021-01-22',7234),(37,305135501,62,13,4,'Shir Hashirim 4','2021-01-26','2021-01-22',6774),(38,305135501,64,12,4,'Shir Hashirim 4','2021-02-03','2021-01-22',6666),(39,203679428,65,16,4,'HaZayit 13','2021-01-31','2021-01-26',5333),(40,112332123,67,18,3,'Shir Hashirim 4','2021-02-10','2021-01-26',4323);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Lays Cream & Onion',1,3,'1611157325499-snacks3.jpg'),(3,'Loacker Quadratiny Hazelnut',1,5,'1610904315977-snacks1.jpg'),(4,'Milka Biscuits',1,5,'1610904411930-snacks2.jpg'),(5,'Rita Guava',2,3,'1610904422542-juice1.jpg'),(6,'Rita Mango',2,3,'1610904428456-juice2.jpg'),(7,'Random Orange juice',2,2,'1610904436719-juice3.jpg'),(8,'Fanta Raspberry',2,3,'1610904442584-juice4.jpg'),(9,'Organic Valley lactose free milk',3,2,'1610904449615-diary1.jpg'),(10,'Oatly vanilla oatmilk',3,3,'1610904462121-diary4.jpg'),(11,'Norman\'s greek yogurt',3,1,'1610904472176-diary2.jpg'),(12,'Stonyfield Organic yogurt',3,1,'1610904479511-diary3.jpg'),(13,'Europes\' Best frozen berries Mix',4,7,'1610904486247-frozen1.jpg'),(14,'Fruits tropical fruits Mix',4,7,'1610904494304-frozen4.jpg'),(15,'Little Farm Organics veggies blend',4,5,'1610904500095-frozen2.jpg'),(16,'Birds Eye Broccoli',4,4,'1610904507184-frozen3.jpg'),(17,'Sante traditional museli',5,6,'1610904513832-cereal1.jpg'),(18,'Sante fruit museli',5,6,'1610904519417-cereal2.jpg'),(19,'Kelloggs\' Froot Loops',5,5,'1610904525591-cereal3.jpg'),(20,'Kelloggs\' Coco Pops',5,5,'1610904529984-cereal4.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `city_id` int NOT NULL,
  `street` varchar(45) NOT NULL,
  `user_type` varchar(10) NOT NULL DEFAULT 'Client',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`id`),
  KEY `city_id_idx` (`city_id`),
  CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12345678,'Oogi','Fletzet','oogf@gmail.com','e2d2af960ada70e65297bec6a535e705',1,'Sesame','Admin'),(51800027,'Hadassa','Ezra','hadassa@gmail.com','e2d2af960ada70e65297bec6a535e705',5,'Shir Hashirim 4','Client'),(55494272,'Arye','Ezra','aryeezra@gmail.com','e2d2af960ada70e65297bec6a535e705',4,'Shir Hashirim 4','Client'),(112332123,'test','two','test@gmail.com','e2d2af960ada70e65297bec6a535e705',3,'Shir Hashirim 4','Client'),(123432123,'Test','User','testUser@gmail.com','8155c61ac2e69a443cbcbc263a1dcf4b',3,'test street 5','Client'),(203679428,'Mor','Ezra','mor3311@gmail.com','e2d2af960ada70e65297bec6a535e705',2,'HaZayit 13','Client'),(305135501,'Dvir','Ezra','dvirezra@gmail.com','e2d2af960ada70e65297bec6a535e705',4,'Shir Hashirim 4','Client'),(305167181,'Chen','Ezra','chenushka3e@walla.com','8cd7b4fd7528824db97ce0eb34532ba8',5,'Shir Hashirim 4','Client');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-27 11:08:52
