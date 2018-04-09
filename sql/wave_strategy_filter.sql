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
-- Table structure for table `wave_strategy_filter`
--

DROP TABLE IF EXISTS `wave_strategy_filter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wave_strategy_filter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `strategyid` int(11) NOT NULL,
  `stocks` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strategyid` (`strategyid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wave_strategy_filter`
--

LOCK TABLES `wave_strategy_filter` WRITE;
/*!40000 ALTER TABLE `wave_strategy_filter` DISABLE KEYS */;
INSERT INTO `wave_strategy_filter` VALUES (1,2,'[\"sz000938\", \"sh600637\", \"sh600616\", \"sh600600\", \"sh600547\", \"sh600540\", \"sh600381\", \"sh600345\", \"sh600336\", \"sh600323\", \"sh600305\", \"sh600232\", \"sh600211\", \"sh600132\", \"sh600105\"]'),(2,3,'[]'),(3,4,'[\"sh600638\"]'),(4,5,''),(5,6,''),(6,7,''),(7,8,''),(8,9,''),(9,10,''),(10,11,'[\"sz000725\", \"sz000063\", \"sh601633\", \"sh601328\", \"sh601166\", \"sh600887\", \"sh600649\", \"sh600643\", \"sh600638\", \"sh600623\", \"sh600618\", \"sh600617\", \"sh600610\", \"sh600603\", \"sh600596\", \"sh600589\", \"sh600579\", \"sh600577\", \"sh600569\", \"sh600567\", \"sh600558\", \"sh600537\", \"sh600527\", \"sh600522\", \"sh600481\", \"sh600475\", \"sh600469\", \"sh600433\", \"sh600428\", \"sh600426\", \"sh600409\", \"sh600398\", \"sh600395\", \"sh600390\", \"sh600389\", \"sh600382\", \"sh600377\", \"sh600370\", \"sh600365\", \"sh600352\", \"sh600340\", \"sh600325\", \"sh600320\", \"sh600308\", \"sh600307\", \"sh600293\", \"sh600282\", \"sh600273\", \"sh600247\", \"sh600236\", \"sh600231\", \"sh600228\", \"sh600219\", \"sh600215\", \"sh600207\", \"sh600177\", \"sh600175\", \"sh600172\", \"sh600170\", \"sh600163\", \"sh600153\", \"sh600143\", \"sh600141\", \"sh600130\", \"sh600123\", \"sh600117\", \"sh600111\", \"sh600110\", \"sh600103\", \"sh600093\", \"sh600081\", \"sh600077\", \"sh600075\", \"sh600071\", \"sh600068\", \"sh600067\", \"sh600050\", \"sh600033\", \"sh600029\", \"sh600025\", \"sh600019\", \"sh600018\", \"sh600016\", \"sh600015\", \"sh600012\", \"sh600011\", \"sh600010\", \"sh600004\", \"sh600000\"]'),(11,12,'[]'),(12,13,'[\"sz300637\", \"sz300610\", \"sz300507\", \"sz300490\", \"sz300471\", \"sz300437\", \"sz300335\", \"sz300138\", \"sz300062\", \"sz002795\", \"sz002719\", \"sz002533\", \"sz002408\", \"sz002398\", \"sz002392\", \"sz000981\", \"sz000739\", \"sz000682\", \"sz000505\", \"sh603890\", \"sh603628\", \"sh603618\", \"sh600780\", \"sh600745\", \"sh600605\", \"sh600555\", \"sh600381\", \"sh600323\", \"sz300729\", \"sz300727\", \"sz300720\", \"sz300712\", \"sz300709\", \"sz300693\", \"sz300692\", \"sz300673\", \"sz300670\", \"sz300625\", \"sz300603\", \"sz300597\", \"sz300561\", \"sz300560\", \"sz300539\", \"sz300538\", \"sz300537\", \"sz300534\", \"sz300515\", \"sz300514\", \"sz300487\", \"sz300480\", \"sz300417\", \"sz300406\", \"sz300368\", \"sz300354\", \"sz300350\", \"sz300319\", \"sz300256\", \"sz300227\", \"sz300190\", \"sz300050\", \"sz300044\", \"sz300041\", \"sz300035\", \"sz300030\", \"sz300010\", \"sz002917\", \"sz002915\", \"sz002906\", \"sz002890\", \"sz002875\", \"sz002859\", \"sz002849\", \"sz002843\", \"sz002823\", \"sz002811\", \"sz002801\", \"sz002717\", \"sz002672\", \"sz002644\", \"sz002596\", \"sz002590\", \"sz002331\", \"sz002279\", \"sz002229\", \"sz002197\", \"sz002118\", \"sz002107\", \"sz002079\", \"sz000938\", \"sz000826\", \"sz000818\", \"sz000735\", \"sz000716\", \"sz000710\", \"sz000567\", \"sz000016\", \"sh603917\", \"sh603880\", \"sh603860\", \"sh603826\", \"sh603817\", \"sh603813\", \"sh603803\", \"sh603728\", \"sh603722\", \"sh603717\", \"sh603608\", \"sh603568\", \"sh603567\", \"sh603507\", \"sh603388\", \"sh603331\", \"sh603322\", \"sh603218\", \"sh603203\", \"sh603106\", \"sh603036\", \"sh603007\", \"sh600898\", \"sh600789\", \"sh600787\", \"sh600748\", \"sh600292\", \"sh600271\", \"sh600211\", \"sz300085\", \"sz002675\", \"sz002544\", \"sz000613\", \"sh603421\", \"sh603166\", \"sz000572\", \"sh600330\", \"sz300371\"]'),(13,14,'[]'),(14,15,'[\"sz300291\", \"sz300258\", \"sz002586\", \"sh600885\", \"sh600593\", \"sz002427\", \"sz002175\", \"sz000032\", \"sz002547\"]'),(15,16,''),(16,17,''),(17,18,''),(18,19,'');
/*!40000 ALTER TABLE `wave_strategy_filter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-09 11:16:36
