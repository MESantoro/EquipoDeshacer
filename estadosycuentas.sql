CREATE DATABASE  IF NOT EXISTS `estadosycuentas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `estadosycuentas`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: estadosycuentas
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cli` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `cli_estado` enum('O','X') NOT NULL DEFAULT 'O',
  `cue_estado` enum('Pagado','Adeuda','Parcial') DEFAULT 'Pagado',
  PRIMARY KEY (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Carlos','Benitez','aca cerca','carlos@gmail.com','X','Pagado'),(2,'Tito','Marsh','ahi a la vuelta','tito@gmail.com','X','Pagado'),(3,'Rosa','Tosa','mas cerca que Tito','rosa@dmail.com','O','Pagado');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta_estado`
--

DROP TABLE IF EXISTS `cuenta_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_estado` (
  `id_cue` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `cue_estado` enum('Pagado','Adeuda') DEFAULT 'Pagado',
  PRIMARY KEY (`id_cue`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_estado`
--

LOCK TABLES `cuenta_estado` WRITE;
/*!40000 ALTER TABLE `cuenta_estado` DISABLE KEYS */;
INSERT INTO `cuenta_estado` VALUES (1,'Anduvo Bien Ahora1','Pagado'),(9,'3 cuenta','Adeuda'),(11,'5 cuenta','Pagado'),(12,'Otra cuenta de prueba','Adeuda');
/*!40000 ALTER TABLE `cuenta_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pago` (
  `id_pag` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` enum('O','X') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_pag`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
INSERT INTO `forma_pago` VALUES (1,'Efectivo','O'),(2,'Mercado Pago','O'),(3,'T. Bancaria','O'),(4,'Cheque','X'),(5,'Otros','X');
/*!40000 ALTER TABLE `forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `id_his` int NOT NULL AUTO_INCREMENT,
  `accion` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `tabla` varchar(255) NOT NULL,
  `aterior_reg` json NOT NULL,
  `nuevo_reg` json NOT NULL,
  `marca_tiempo` timestamp(6) NOT NULL,
  PRIMARY KEY (`id_his`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `href` varchar(45) NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Clientes','/cliente',1),(2,'Cuentas y Estados','/cuenta_estado',1),(3,'Formas de Pago','/forma_pago',1),(4,'Productos','/productos',1),(5,'Tipo de Productos','/tipo_producto',1),(6,'Productos','/productos',2),(7,'Tipo de Productos','/tipo_producto',2),(8,'Productos','/productos',3),(10,'Usuarios','/usuarios',1),(11,'Roles','/roles',1),(12,'Ubicaciones','/ubicaciones',1);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_pro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` enum('O','X') DEFAULT 'O',
  PRIMARY KEY (`id_pro`),
  CONSTRAINT `fk_productos_forma_pago` FOREIGN KEY (`id_pro`) REFERENCES `forma_pago` (`id_pag`),
  CONSTRAINT `fk_productos_tipo_productos` FOREIGN KEY (`id_pro`) REFERENCES `tipo_producto` (`id_tip`),
  CONSTRAINT `fk_productos_ubicaciones` FOREIGN KEY (`id_pro`) REFERENCES `ubicaciones` (`id_ubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Paletas','O'),(2,'Helados','O');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` enum('O','X') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','O'),(2,'Test','O'),(3,'Prueba','O');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_producto`
--

DROP TABLE IF EXISTS `tipo_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_producto` (
  `id_tip` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` enum('O','X') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_tip`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_producto`
--

LOCK TABLES `tipo_producto` WRITE;
/*!40000 ALTER TABLE `tipo_producto` DISABLE KEYS */;
INSERT INTO `tipo_producto` VALUES (1,'Caja de Helados1','O'),(2,'Balde','O');
/*!40000 ALTER TABLE `tipo_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicaciones` (
  `id_ubicacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` enum('O','X') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_ubicacion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (1,'Pozo Prueba Mejorado2','O'),(2,'Frezzer','X'),(3,'Heladera','O'),(4,'Pozo Lindo y nuevo','X');
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` int NOT NULL,
  `user` varchar(45) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `id_rol` int NOT NULL,
  `estado` enum('O','X') NOT NULL DEFAULT 'O',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Pablo','Pomar',12123456,'ppomar','ppomar','ppomar@gmail.com',1,'O'),(2,'Nestor','Mieres',12123456,'nmieres','nmieres','nmieresgmail.com',2,'O'),(3,'Vanessa','Baldi',12123456,'vbaldi','vbaldi','vbaldigmail.com',3,'O'),(4,'Martin','Santoro',12123456,'msantoro','msantoro','msantorogmail.com',1,'O'),(5,'toto','tito',12123345,'Mes','$2b$10$zC4J.Gm84CBnD2Twd3alXeu4i1PbYbds6GMqKN0Ib0gHEW2FkP1jW','loco@gmail.com',1,'O'),(6,'Martín','Santoro',29138683,'Tin','$2b$10$Yy9zlV2idreltYVZg.oDPepR/AFnc4f.jmzlZZjPrjNDwLo9x2NJS','loco@gmail.com',1,'O'),(7,'VALE','Franco',34852352,'vfrank','$2b$10$hSTok50RaQVo3W1aDDHra.8Z.dtOyxgyDW53JslaLiemsb0NrTNJa','VDDVD@gmail.com',1,'O'),(8,'','',29138683,'Marco','$2b$10$qMaLqyGI/Dg4Mc3MPZUlReKAtxg9dZncEXB/v3xMGqRdYqjO8o4c2','hh@gmail.com',1,'O'),(9,'','',29138683,'Prueba','$2b$10$8wjN3.P4oMrj9.y4RnD19OZao4AxxSeMKepDCeQm5lt/MZSXTideO','',1,'O'),(10,'Martín','Santoro',29138683,'Uno','$2b$10$M9WwTDGt2DOpED3dpc7yiO87RQ1EvA3m2UU8DoYPPUNNcd4IBoT1a','martinsantoro81@gmail.com',1,'O'),(11,'La Pantera','Pocho',12123456,'Mio','$2b$10$2t0.Hyuys6DXaSTxWexmn.vtCnEa8BRo5TWHhvMBIY5FaiBhk80oq','loco@gmail.com',1,'O'),(12,'Mas que Nuevo','Nuevo',12354678,'Nuevo','$2b$10$cXPUqPZcj9sSt8BPpuTbtOgS4dd9sqQZ81pzvRnOpq./C1PcC5cc.','VDDVD@gmail.com',1,'O');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'estadosycuentas'
--

--
-- Dumping routines for database 'estadosycuentas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 17:40:35
