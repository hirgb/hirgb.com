-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: wavelab
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `wave_industry_fundflow`
--

DROP TABLE IF EXISTS `wave_industry_fundflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wave_industry_fundflow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` char(10) NOT NULL,
  `data` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wave_industry_fundflow`
--

LOCK TABLES `wave_industry_fundflow` WRITE;
/*!40000 ALTER TABLE `wave_industry_fundflow` DISABLE KEYS */;
INSERT INTO `wave_industry_fundflow` VALUES (1,'2018/04/04','[{\"fundflow\": 129390.58, \"name\": \"酒、饮料和精制茶制造业\"}, {\"fundflow\": 95509.07, \"name\": \"农业\"}, {\"fundflow\": 85910.65, \"name\": \"医药制造业\"}, {\"fundflow\": 57386.1, \"name\": \"有色金属矿采选业\"}, {\"fundflow\": 51538.32, \"name\": \"铁路、船舶、航空航天和其他运输设备制造业\"}, {\"fundflow\": 32476.96, \"name\": \"农副食品加工业\"}, {\"fundflow\": 14100.14, \"name\": \"其他制造业\"}, {\"fundflow\": 10602.75, \"name\": \"研究和试验发展\"}, {\"fundflow\": 8107.6, \"name\": \"金属制品业\"}, {\"fundflow\": 7565.05, \"name\": \"批发业\"}, {\"fundflow\": 4645.4, \"name\": \"食品制造业\"}, {\"fundflow\": 2795.19, \"name\": \"仓储业\"}, {\"fundflow\": 2282.48, \"name\": \"石油和天然气开采业\"}, {\"fundflow\": 2238.48, \"name\": \"装卸搬运和运输代理业\"}, {\"fundflow\": 1586.45, \"name\": \"农、林、牧、渔服务业\"}, {\"fundflow\": 348.85, \"name\": \"非金属矿采选业\"}, {\"fundflow\": 230.94, \"name\": \"教育\"}, {\"fundflow\": 158.91, \"name\": \"林业\"}, {\"fundflow\": 114.72, \"name\": \"住宿业\"}, {\"fundflow\": -83.6, \"name\": \"餐饮业\"}, {\"fundflow\": -340.57, \"name\": \"燃气生产和供应业\"}, {\"fundflow\": -387.76, \"name\": \"体育\"}, {\"fundflow\": -591.66, \"name\": \"水利管理业\"}, {\"fundflow\": -1177.89, \"name\": \"房屋建筑业\"}, {\"fundflow\": -1313.23, \"name\": \"畜牧业\"}, {\"fundflow\": -2101.07, \"name\": \"机动车、电子产品和日用产品修理业\"}, {\"fundflow\": -2281.81, \"name\": \"渔业\"}, {\"fundflow\": -2660.77, \"name\": \"邮政业\"}, {\"fundflow\": -3047.42, \"name\": \"木材加工和木、竹、藤、棕、草制品业\"}, {\"fundflow\": -3054.33, \"name\": \"建筑安装业\"}, {\"fundflow\": -3056.75, \"name\": \"橡胶和塑料制品业\"}, {\"fundflow\": -4143.56, \"name\": \"石油加工、炼焦和核燃料加工业\"}, {\"fundflow\": -4496.35, \"name\": \"文化艺术业\"}, {\"fundflow\": -4953.87, \"name\": \"租赁业\"}, {\"fundflow\": -5467.62, \"name\": \"黑色金属矿采选业\"}, {\"fundflow\": -5852.08, \"name\": \"水上运输业\"}, {\"fundflow\": -6732.59, \"name\": \"公共设施管理业\"}, {\"fundflow\": -6817.88, \"name\": \"纺织业\"}, {\"fundflow\": -6907.5, \"name\": \"其他金融业\"}, {\"fundflow\": -7095.49, \"name\": \"废弃资源综合利用业\"}, {\"fundflow\": -7684.78, \"name\": \"纺织服装、服饰业\"}, {\"fundflow\": -8698.84, \"name\": \"印刷和记录媒介复制业\"}, {\"fundflow\": -8724.89, \"name\": \"造纸和纸制品业\"}, {\"fundflow\": -11356.42, \"name\": \"家具制造业\"}, {\"fundflow\": -12112.77, \"name\": \"水的生产和供应业\"}, {\"fundflow\": -12787.44, \"name\": \"道路运输业\"}, {\"fundflow\": -13001.65, \"name\": \"卫生\"}, {\"fundflow\": -13539.52, \"name\": \"皮革、毛皮、羽毛及其制品和制鞋业\"}, {\"fundflow\": -14398.42, \"name\": \"新闻和出版业\"}, {\"fundflow\": -15036.42, \"name\": \"建筑装饰和其他建筑业\"}, {\"fundflow\": -15126.64, \"name\": \"铁路运输业\"}, {\"fundflow\": -16208.44, \"name\": \"生态保护和环境治理业\"}, {\"fundflow\": -16518.56, \"name\": \"文教、工美、体育和娱乐用品制造业\"}, {\"fundflow\": -18341.76, \"name\": \"电信、广播电视和卫星传输服务\"}, {\"fundflow\": -18872.19, \"name\": \"开采辅助活动\"}, {\"fundflow\": -20228.16, \"name\": \"专业技术服务业\"}, {\"fundflow\": -20437.51, \"name\": \"航空运输业\"}, {\"fundflow\": -20728.51, \"name\": \"化学原料和化学制品制造业\"}, {\"fundflow\": -21308.07, \"name\": \"保险业\"}, {\"fundflow\": -22279.71, \"name\": \"综合\"}, {\"fundflow\": -26316.4, \"name\": \"煤炭开采和洗选业\"}, {\"fundflow\": -30023.13, \"name\": \"通用设备制造业\"}, {\"fundflow\": -32274.04, \"name\": \"仪器仪表制造业\"}, {\"fundflow\": -34408.87, \"name\": \"电力、热力生产和供应业\"}, {\"fundflow\": -35098.39, \"name\": \"化学纤维制造业\"}, {\"fundflow\": -36113.03, \"name\": \"汽车制造业\"}, {\"fundflow\": -37470.38, \"name\": \"商务服务业\"}, {\"fundflow\": -37959.1, \"name\": \"广播、电视、电影和影视录音制作业\"}, {\"fundflow\": -43952.82, \"name\": \"黑色金属冶炼和压延加工业\"}, {\"fundflow\": -44262.06, \"name\": \"专用设备制造业\"}, {\"fundflow\": -62752.96, \"name\": \"土木工程建筑业\"}, {\"fundflow\": -67727.33, \"name\": \"零售业\"}, {\"fundflow\": -72430.6, \"name\": \"货币金融服务\"}, {\"fundflow\": -80730.74, \"name\": \"资本市场服务\"}, {\"fundflow\": -102266.89, \"name\": \"有色金属冶炼和压延加工业\"}, {\"fundflow\": -103750.09, \"name\": \"互联网和相关服务\"}, {\"fundflow\": -115006.18, \"name\": \"房地产业\"}, {\"fundflow\": -124355.04, \"name\": \"非金属矿物制品业\"}, {\"fundflow\": -176861.21, \"name\": \"电气机械和器材制造业\"}, {\"fundflow\": -370744.67, \"name\": \"计算机、通信和其他电子设备制造业\"}, {\"fundflow\": -405634.77, \"name\": \"软件和信息技术服务业\"}]');
/*!40000 ALTER TABLE `wave_industry_fundflow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-09 11:15:09
