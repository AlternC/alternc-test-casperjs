-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: alternc
-- ------------------------------------------------------
-- Server version	5.5.57-0+deb8u1

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
-- Dumping data for table `actions`
--


LOCK TABLES `alternc_status` WRITE;
/*!40000 ALTER TABLE `alternc_status` DISABLE KEYS */;
INSERT INTO `alternc_status` VALUES ('alternc-mailman_version','2.2.sql'),('alternc_version','3.4.9.sql');
/*!40000 ALTER TABLE `alternc_status` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `default_subdomains` WRITE;
/*!40000 ALTER TABLE `default_subdomains` DISABLE KEYS */;
INSERT INTO `default_subdomains` VALUES (1,'www','VHOST','%%DOMAINDIR%%','MAIN',1),(2,'','URL','http://www.%%DOMAIN%%','MAIN',1),(3,'www','URL','http://www.%%TARGETDOM%%','SLAVE',1),(4,'','URL','http://%%TARGETDOM%%','SLAVE',1);
/*!40000 ALTER TABLE `default_subdomains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `defquotas`
--

LOCK TABLES `defquotas` WRITE;
/*!40000 ALTER TABLE `defquotas` DISABLE KEYS */;
INSERT INTO `defquotas` VALUES ('dom',10,'default'),('ftp',10,'default'),('mail',10,'default'),('mailman',10,'default'),('mysql',10,'default'),('stats',10,'default'),('web',51200,'default');
/*!40000 ALTER TABLE `defquotas` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `domaines_type`
--

LOCK TABLES `domaines_type` WRITE;
/*!40000 ALTER TABLE `domaines_type` DISABLE KEYS */;
INSERT INTO `domaines_type` VALUES ('cname','CNAME DNS entry','DOMAIN','%SUB% CNAME %TARGET%','','ALL',1,1,1,0,0),('defmx','Default mail server','NONE','%SUB% IN MX 5 @@DEFAULT_MX@@.','vhost,url,ip,ipv6,txt,defmx2','ADMIN',1,1,1,0,0),('defmx2','Default backup mail server','NONE','%SUB% IN MX 10 @@DEFAULT_SECONDARY_MX@@.','vhost,url,ip,ipv6,txt,defmx','ADMIN',1,1,1,0,0),('ip','IPv4 redirect','IP','%SUB% IN A %TARGET%','url,ip,ipv6,txt,mx,mx2,defmx,defmx2','ALL',1,1,0,0,0),('ipv6','IPv6 redirect','IPV6','%SUB% IN AAAA %TARGET%','ip,ipv6,txt,mx,mx2,defmx,defmx2','ALL',1,1,1,0,0),('mx','MX DNS entry','DOMAIN','%SUB% IN MX 5 %TARGET%','vhost,url,ip,ipv6,txt,mx,mx2','ALL',1,1,1,0,0),('mx2','secondary MX DNS entry','DOMAIN','%SUB% IN MX 10 %TARGET%','vhost,url,ip,ipv6,txt,mx,mx2','ALL',1,1,1,0,0),('panel','AlternC panel access','NONE','%SUB% IN A @@PUBLIC_IP@@','vhost,url,ip,ipv6,txt,mx,mx2,defmx,defmx2','ALL',0,0,1,0,0),('roundcube','Roundcube Webmail access','NONE','%SUB% IN A @@PUBLIC_IP@@','txt','ALL',0,0,0,0,0),('squirrelmail','Squirrelmail Webmail access','NONE','%SUB% IN A @@PUBLIC_IP@@','txt','ALL',0,0,0,0,0),('txt','TXT DNS entry','TXT','%SUB% IN TXT \"%TARGET%\"','vhost,url,ip,ipv6,txt,mx,mx2,defmx,defmx2','ALL',1,1,1,0,0),('url','URL redirection','URL','%SUB% IN A @@PUBLIC_IP@@','txt,defmx,defmx2','ALL',0,0,0,0,0),('vhost','Locally hosted','DIRECTORY','%SUB% IN A @@PUBLIC_IP@@','txt,defmx,defmx2,mx,mx2','ALL',0,0,0,1,1);
/*!40000 ALTER TABLE `domaines_type` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `forbidden_domains`
--

LOCK TABLES `forbidden_domains` WRITE;
/*!40000 ALTER TABLE `forbidden_domains` DISABLE KEYS */;
INSERT INTO `forbidden_domains` VALUES ('afilias.net'),('afnic.fr'),('aol.com'),('cira.ca'),('dns.be'),('free.fr'),('gmail.com'),('hotmail.com'),('internic.net'),('microsoft.com'),('netsol.com'),('nic.biz'),('nic.cx'),('nic.fr'),('octopuce.com'),('orange.fr'),('pir.org'),('sfr.fr'),('sympatico.ca'),('tiscali.fr'),('verisign.com'),('voila.fr'),('wanadoo.fr'),('yahoo.com'),('yahoo.fr');
/*!40000 ALTER TABLE `forbidden_domains` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `local`
--

LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` VALUES (2000,'Administrateur','Admin'),(2001,'user','user');
/*!40000 ALTER TABLE `local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `membres`
--

LOCK TABLES `membres` WRITE;
/*!40000 ALTER TABLE `membres` DISABLE KEYS */;
INSERT INTO `membres` VALUES (2000,'admin','$1$848JSyFp$5NIDrafubK1qFl21rIGBg1',1,1,'postmaster@vm2.alternc.eu',0,1,'2017-10-10 21:40:13',0,'91.194.61.201',0,1,0,0,0,'default',1,'','2017-10-08 14:22:28',NULL,NULL),(2001,'user','$1$ON/Tzluw$K.fL04YOgO8f4xUrFDjTW0',1,0,'user@example.tld',0,1,'2017-10-10 21:40:28',0,'91.194.61.201',2000,1,0,0,0,'default',1,'','2017-10-10 21:36:47',NULL,NULL);
/*!40000 ALTER TABLE `membres` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES ('adm',0,64,0,0),('ftp',0,64,0,0),('hta',0,64,0,0),('mem',0,64,0,0),('mysql',0,64,0,0),('pop',0,64,0,0);
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quotas`
--

LOCK TABLES `quotas` WRITE;
/*!40000 ALTER TABLE `quotas` DISABLE KEYS */;
INSERT INTO `quotas` VALUES (2000,'cron',10),(2000,'dom',10),(2000,'ftp',10),(2000,'mail',10),(2000,'mailman',10),(2000,'mysql',10),(2000,'piwik',10),(2000,'stats',10),(2000,'web',51200),(2001,'cron',10),(2001,'dom',10),(2001,'ftp',10),(2001,'mail',10),(2001,'mailman',10),(2001,'mysql',10),(2001,'piwik',10),(2001,'web',51200);
/*!40000 ALTER TABLE `quotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tld`
--

LOCK TABLES `tld` WRITE;
/*!40000 ALTER TABLE `tld` DISABLE KEYS */;
INSERT INTO `tld` VALUES ('asia',1),('be',1),('biz',1),('ca',1),('com',1),('coop',1),('eu',1),('info',1),('it',1),('name',1),('net',1),('org',1),('ws',1),('asso.fr',4),('cjb.net',4),('eu.org',4),('fr',4);
/*!40000 ALTER TABLE `tld` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `variable`
--

LOCK TABLES `variable` WRITE;
/*!40000 ALTER TABLE `variable` DISABLE KEYS */;
INSERT INTO `variable` VALUES (1,'force_https','0','This variable is set to 0 (default) if users can access the management desktop through HTTP, otherwise we force HTTPS',NULL),(2,'archive_del_data','','If folder specified html folder of deleted user is archived, else it is deleted. ',NULL),(3,'tld_no_check_at_all','1','Disable ALL check on the TLD (users will be able to add any domain)',NULL),(4,'mailname_bounce','vm2.alternc.eu','FQDN of the mail server, used to create vhost virtual mail_adress.',NULL),(5,'ftp_human_name','vm2.alternc.eu','Human name for FTP server',NULL),(6,'lxc_ip','','IP address of the Alternc\'s LXC server. If empty, no LXC server.',NULL),(7,'lxc_port','6504','Port of the Alternc\'s LXC server',NULL),(8,'lxc_key','','Shared key with the Alternc\'s LXC server',NULL),(9,'lxc_maxtime','4','How many hours do we allow to have a server before shutting it down',NULL),(10,'mail_human_submission','vm2.alternc.eu','Human name for mail server (submission protocol), leave empty to disable help',NULL),(11,'mail_human_smtp','vm2.alternc.eu','Human name for mail server (SMTP protocol), leave empty to disable help',NULL),(12,'mail_human_smtps','vm2.alternc.eu','Human name for mail server (SMTPS protocol), leave empty to disable help',NULL),(13,'mail_human_imap','vm2.alternc.eu','Human name for IMAP mail server',NULL),(14,'mail_human_imaps','vm2.alternc.eu','Human name for IMAPS mail server',NULL),(15,'mail_human_pop3','vm2.alternc.eu','Human name for POP3 mail server',NULL),(16,'mail_human_pop3s','vm2.alternc.eu','Human name for POP3s mail server',NULL),(17,'sql_allow_users_backups','1','Set 1 to allow users to configure backup of their databases, 0 if you want do disable this feature. Warning: it will not stop configured backup made by sqlbackup.sh',NULL),(18,'disk_quota_enable','1','Are disk quota enabled for this server',NULL),(19,'disk_quota_not_blocking','1','0 - Block data when quota are exceeded (you need a working quota system) | 1 - Just show quota but don\'t block anything',NULL),(20,'hosting_tld','','This is a FQDN that designates the main hostname of the service. For example, hosting_tld determines in what TLD the \"free\" user domain is created. If this is set to \"example.com\", a checkbox will appear in the user creation dialog requesting the creator if he wants to create the domain \"username.example.com\".',NULL),(21,'subadmin_restriction','0','This variable sets the way the account list works for accounts other than \'admin\' (2000). 0 (default) = admin other than admin/2000 can see their own account, but not the other one 1 = admin other than admin/2000 can see any account by clicking the \'\'show all accounts\'\' link.',NULL),(22,'auth_ip_ftp_default_yes','1','This variable sets if you want to allow all IP address to access FTP by default. If the user start to define some IP or subnet in the allow list, only those he defined will be allowed.',NULL),(23,'sql_max_username_length','16','Maximum length allowed for SQL usernames by your SQL server (do not modify unless you know what you do)',NULL),(24,'sql_max_database_length','16','Maximum length allowed for SQL database names by your SQL server (do not modify unless you know what you do)',NULL),(25,'new_email','0','An email will be sent to this address when new accounts are created if set.',NULL),(26,'logo_login','','You can specify a logo for the login page, example /images/my_logo.png .',NULL),(27,'https_warning','1','warn users to switch to HTTPS',NULL),(28,'favicon','favicon.ico','You can specify a favicon, for example /images/my_logo.ico',NULL),(29,'logo_menu','','You can specify a logo for the menu, example /images/my_logo.png .',NULL),(30,'rss_feed','','This is an RSS feed that will be displayed on the users homepages when they log in.',NULL),(31,'mailman_url','0',' This is the domaine name that will be use to construct mailman\'s interface links. Set this to 0 or a \"false\" string to ignore and keep the default behavior (hosted domain in the URL).',NULL);
/*!40000 ALTER TABLE `variable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `db_servers` WRITE;
/*!40000 ALTER TABLE `db_servers` DISABLE KEYS */;
INSERT INTO `db_servers` VALUES (1,'Default','127.0.0.1','sysusr','9vG74cR0dH','%');
/*!40000 ALTER TABLE `db_servers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-10 22:46:50
DELIMITER //
DROP FUNCTION IF EXISTS INET_ATON6;//
CREATE FUNCTION INET_ATON6(n CHAR(39))
RETURNS DECIMAL(39) UNSIGNED
DETERMINISTIC
BEGIN
    RETURN CAST(CONV(SUBSTRING(n FROM  1 FOR 4), 16, 10) AS DECIMAL(39))
                       * 5192296858534827628530496329220096 -- 65536 ^ 7
         + CAST(CONV(SUBSTRING(n FROM  6 FOR 4), 16, 10) AS DECIMAL(39))
                       *      79228162514264337593543950336 -- 65536 ^ 6
         + CAST(CONV(SUBSTRING(n FROM 11 FOR 4), 16, 10) AS DECIMAL(39))
                       *          1208925819614629174706176 -- 65536 ^ 5
         + CAST(CONV(SUBSTRING(n FROM 16 FOR 4), 16, 10) AS DECIMAL(39)) 
                       *               18446744073709551616 -- 65536 ^ 4
         + CAST(CONV(SUBSTRING(n FROM 21 FOR 4), 16, 10) AS DECIMAL(39))
                       *                    281474976710656 -- 65536 ^ 3
         + CAST(CONV(SUBSTRING(n FROM 26 FOR 4), 16, 10) AS DECIMAL(39))
                       *                         4294967296 -- 65536 ^ 2
         + CAST(CONV(SUBSTRING(n FROM 31 FOR 4), 16, 10) AS DECIMAL(39))
                       *                              65536 -- 65536 ^ 1
         + CAST(CONV(SUBSTRING(n FROM 36 FOR 4), 16, 10) AS DECIMAL(39))
         ;
END;
//
DELIMITER ;

