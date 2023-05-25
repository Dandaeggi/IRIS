-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: j8b102.p.ssafy.io    Database: iris
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `user_entity`
--

DROP TABLE IF EXISTS `user_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `settings` varchar(10000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4xad1enskw4j1t2866f7sodrx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entity`
--

LOCK TABLES `user_entity` WRITE;
/*!40000 ALTER TABLE `user_entity` DISABLE KEYS */;
INSERT INTO `user_entity` VALUES (63,'dlrtls12345@naver.com','kimjusung','$2a$10$O6kcIXTWv68XxpU/pu3CTO1ogY/jr2SVZxVIkwQqfh20lfQaCyGWe','{\"settings\":{\"user\":\"\",\"irisname\":\"자비스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:\\\\WindowsSystem32\\\\calc.exe\",\"그림판\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"메모장\":\"C:\\\\Windows\\\\System32\\\\notepad.exe\",\"제어판\":\"C:\\\\Windows\\\\System32\\\\control\",\"유튜브\":\"explorer https:\\\\\\\\www.youtube.com\\\\\",\"구글\":\"explorer https:\\\\\\\\www.google.com\\\\\"},\"search\":\"explorer “https:\\\\\\\\www.google.com\\\\search?q=”\"},\"custom\":{\"open\":{\"크롬\":\"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\",\"반디집\":\"C:\\\\Program Files\\\\Bandizip\\\\Bandizip.exe\",\"네이버\":\"explorer https://www.naver.com/\",\"삼성\":\"explorer https://swexpertacademy.com/main/main.do\",\"주성\":\"explorer https://chat.openai.com/chat\"}},\"combine\":{\"아침\":{\"open\":[[\"네이버\",\"explorer https://www.naver.com/\"],[\"삼성\",\"explorer https://swexpertacademy.com/main/main.do\"]]}}}}'),(64,'test@test.com','dd','$2a$10$coYvtUeBbAm47LHVrH1oCOSiRQ9PGuNM5wkPfMCwD2.eii9IDBNfu','{\"settings\":{\"user\":\"\",\"irisname\":\"자비스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:/WindowsSystem32/calc.exe\",\"그림판\":\"C:/Windows/System32/mspaint.exe\",\"메모장\":\"C:/Windows/System32/notepad.exe\",\"제어판\":\"C:/Windows/System32/control\",\"유튜브\":\"explorer https://www.youtube.com/\",\"구글\":\"explorer https://www.google.com/\"},\"search\":\"explorer “https://www.google.com/search?q=”\"},\"custom\":{\"open\":{\"자료\":\"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\iris_logos.pptx\",\"네이버\":\"explorer https://www.naver.com\",\"싸피\":\"explorer https://edu.ssafy.com/comm/login/SecurityLoginForm.do\",\"해외 축구\":\"explorer https://sports.news.naver.com/wfootball/index\",\"출석\":\"explorer https://edu.ssafy.com/comm/login/SecurityLoginForm.do\",\"카톡\":\"C:\\\\Program Files (x86)\\\\Kakao\\\\KakaoTalk\\\\KakaoTalk.exe\",\"jnhnjj\":\"C:\\\\Program Files\\\\JetBrains\\\\PyCharm Community Edition 2020.3.5\\\\bin\\\\pycharm64.exe\",\"ddd\":\"C:\\\\Users\\\\SSAFY\\\\AppData\\\\Roaming\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Visual Studio Code\\\\Visual Studio Code.lnk\"}},\"combine\":{\"아침\":{\"open\":[[\"네이버\",\"explorer https://www.naver.com\"],[\"ddd\",\"C:\\\\Users\\\\SSAFY\\\\AppData\\\\Roaming\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Visual Studio Code\\\\Visual Studio Code.lnk\"]]}}}}'),(65,'test1@naver.com','테스트용12','$2a$10$ThucuUJd2Aklox.LDxXoHuVgXt2UXVH4LZmSXQtpqKmdfRWIi..CK','{\"settings\":{\"user\":\"\",\"irisname\":\"자비스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:\\\\WindowsSystem32\\\\calc.exe\",\"그림판\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"메모장\":\"C:\\\\Windows\\\\System32\\\\notepad.exe\",\"제어판\":\"C:\\\\Windows\\\\System32\\\\control\",\"유튜브\":\"explorer https:\\\\\\\\www.youtube.com\\\\\",\"구글\":\"explorer https:\\\\\\\\www.google.com\\\\\"},\"search\":\"explorer “https:\\\\\\\\www.google.com\\\\search?q=”\"},\"custom\":{\"open\":{\"제이\":\"C:\\\\Program Files\\\\JetBrains\\\\IntelliJ IDEA Community Edition 2022.3.1\\\\bin\\\\idea64.exe\",\"백준\":\"explorer https://www.acmicpc.net/\"}},\"combine\":{\"알고리즘\":{\"open\":[[\"제이\",\"C:\\\\Program Files\\\\JetBrains\\\\IntelliJ IDEA Community Edition 2022.3.1\\\\bin\\\\idea64.exe\"],[\"백준\",\"explorer https://www.acmicpc.net/\"]]}}}}'),(66,'test2@test.com','ㅎㅇㅎㅇ','$2a$10$5qcOhU4FIRAUbQJLzMWvPuCtH7grSYXXj7Y6D5vI3U.6h0Zpuel9e','{\"settings\":{\"user\":\"\",\"irisname\":\"이리스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:\\\\WindowsSystem32\\\\calc.exe\",\"그림판\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"메모장\":\"C:\\\\Windows\\\\System32\\\\notepad.exe\",\"제어판\":\"C:\\\\Windows\\\\System32\\\\control\",\"유튜브\":\"explorer https:\\\\\\\\www.youtube.com\\\\\",\"구글\":\"explorer https:\\\\\\\\www.google.com\\\\\"},\"search\":\"explorer “https:\\\\\\\\www.google.com\\\\search?q=”\"},\"custom\":{\"open\":{}},\"combine\":{}}}'),(67,'test3@test.com','테스트3','$2a$10$RCwdo6KztieMyXTgOpYOhurZ9.7pTRUniexDVCY.6LZ1JLZGzIdmK','{\"settings\":{\"user\":\"\",\"irisname\":\"이리스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:\\\\WindowsSystem32\\\\calc.exe\",\"그림판\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"메모장\":\"C:\\\\Windows\\\\System32\\\\notepad.exe\",\"제어판\":\"C:\\\\Windows\\\\System32\\\\control\",\"유튜브\":\"explorer https:\\\\\\\\www.youtube.com\\\\\",\"구글\":\"explorer https:\\\\\\\\www.google.com\\\\\"},\"search\":\"explorer “https:\\\\\\\\www.google.com\\\\search?q=”\"},\"custom\":{\"open\":{}},\"combine\":{}}}'),(68,'tjdgus6937@naver.com','메롱','$2a$10$h2JNSbgbkHj5c/Pn.qp7EuCm10J4cdEGnkBWLX.rt6XMQqqbJuwsS','{\"settings\":{\"user\":\"\",\"irisname\":\"자비스\",\"version\":\"google\",\"command\":{\"open\":{\"계산기\":\"C:\\\\WindowsSystem32\\\\calc.exe\",\"그림판\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"메모장\":\"C:\\\\Windows\\\\System32\\\\notepad.exe\",\"제어판\":\"C:\\\\Windows\\\\System32\\\\control\",\"유튜브\":\"explorer https:\\\\\\\\www.youtube.com\\\\\",\"구글\":\"explorer https:\\\\\\\\www.google.com\\\\\"},\"search\":\"explorer “https:\\\\\\\\www.google.com\\\\search?q=”\"},\"custom\":{\"open\":{\"자료\":\"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\irisppt.pptx\",\"영상\":\"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\ucc.mp4\",\"해외축구\":\"explorer https://sports.news.naver.com/wfootball/index\",\"출석\":\"explorer https://edu.ssafy.com/comm/login/SecurityLoginForm.do\",\"개발\":\"C:\\\\Users\\\\SSAFY\\\\AppData\\\\Roaming\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Visual Studio Code\\\\Visual Studio Code.lnk\",\"네이버\":\"explorer https://www.naver.com/\"}},\"combine\":{}}}');
/*!40000 ALTER TABLE `user_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  2:15:18
