SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `hy_essay` (
  `ey_id` int(10) NOT NULL AUTO_INCREMENT,
  `ey_type` int(10) NOT NULL,
  `ey_title` varchar(50) NOT NULL,
  `ey_subt` varchar(50) NOT NULL,
  `ey_like` int(10) NOT NULL DEFAULT '0',
  `ey_con` text NOT NULL,
  `ey_date` date NOT NULL,
  PRIMARY KEY (`ey_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `hy_host` (
  `ht_id` int(10) NOT NULL AUTO_INCREMENT,
  `ht_pass` varchar(40) NOT NULL,
  PRIMARY KEY (`ht_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `hy_type` (
  `type_id` int(10) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(10) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;