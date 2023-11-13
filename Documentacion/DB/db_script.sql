-- MySQL Script generated by MySQL Workbench
-- Sun 12 Nov 2023 05:05:07 PM CST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Ecommerce_SS1
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Ecommerce_SS1` ;

-- -----------------------------------------------------
-- Schema Ecommerce_SS1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Ecommerce_SS1` ;
USE `Ecommerce_SS1` ;

-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`USER` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`USER` (
  `username` VARCHAR(50) NOT NULL,
  `password` TEXT NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `user_type` VARCHAR(50) NOT NULL,
  `payment_portal_account` VARCHAR(100) NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`SUPPLIER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`SUPPLIER` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`SUPPLIER` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT,
  `supplier_name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`supplier_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`PRODUCT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`PRODUCT` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`PRODUCT` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NOT NULL,
  `unit_price` DECIMAL(8) NOT NULL,
  `stock` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `description` TEXT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_PRODUCT_SUPPLIER1_idx` (`supplier_id` ASC) VISIBLE,
  CONSTRAINT `fk_PRODUCT_SUPPLIER1`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `Ecommerce_SS1`.`SUPPLIER` (`supplier_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`CATEGORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`CATEGORY` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`CATEGORY` (
  `category_name` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`category_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`PRODUCT_CATEGORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`PRODUCT_CATEGORY` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`PRODUCT_CATEGORY` (
  `product_id` INT NOT NULL,
  `category_name` VARCHAR(50) NOT NULL,
  INDEX `fk_PRODUCT_CATEGORY_PRODUCT1_idx` (`product_id` ASC) VISIBLE,
  PRIMARY KEY (`category_name`, `product_id`),
  CONSTRAINT `fk_PRODUCT_CATEGORY_PRODUCT1`
    FOREIGN KEY (`product_id`)
    REFERENCES `Ecommerce_SS1`.`PRODUCT` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_CATEGORY_CATEGORY1`
    FOREIGN KEY (`category_name`)
    REFERENCES `Ecommerce_SS1`.`CATEGORY` (`category_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`PRODUCT_IMAGE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`PRODUCT_IMAGE` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`PRODUCT_IMAGE` (
  `image_path` VARCHAR(150) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`image_path`),
  INDEX `fk_IMAGE_PRODUCT1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_IMAGE_PRODUCT1`
    FOREIGN KEY (`product_id`)
    REFERENCES `Ecommerce_SS1`.`PRODUCT` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`SALE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`SALE` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`SALE` (
  `sale_id` INT NOT NULL AUTO_INCREMENT,
  `sale_date` DATE NOT NULL,
  `sale_hour` VARCHAR(45) NOT NULL,
  `user_username` VARCHAR(50) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `message` TEXT NULL,
  PRIMARY KEY (`sale_id`),
  INDEX `fk_SALE_USER1_idx` (`user_username` ASC) VISIBLE,
  CONSTRAINT `fk_SALE_USER1`
    FOREIGN KEY (`user_username`)
    REFERENCES `Ecommerce_SS1`.`USER` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`PRODUCT_DETAIL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`PRODUCT_DETAIL` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`PRODUCT_DETAIL` (
  `detail_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `current_unit_price` DECIMAL(8,2) NOT NULL,
  `quantity` INT NOT NULL,
  `subtotal` DECIMAL(9,2) NOT NULL,
  `sale_id` INT NOT NULL,
  PRIMARY KEY (`detail_id`),
  INDEX `fk_PRODUCT_DETAIL_PRODUCT1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_PRODUCT_DETAIL_SALE1_idx` (`sale_id` ASC) VISIBLE,
  CONSTRAINT `fk_PRODUCT_DETAIL_PRODUCT1`
    FOREIGN KEY (`product_id`)
    REFERENCES `Ecommerce_SS1`.`PRODUCT` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_DETAIL_SALE1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `Ecommerce_SS1`.`SALE` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`CARD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`CARD` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`CARD` (
  `card_number` VARCHAR(16) NOT NULL,
  `month` VARCHAR(2) NOT NULL,
  `year` VARCHAR(4) NOT NULL,
  `owner` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`card_number`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`USER_CARD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`USER_CARD` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`USER_CARD` (
  `username` VARCHAR(50) NOT NULL,
  `card_number` VARCHAR(16) NOT NULL,
  INDEX `fk_USER_CARD_USER1_idx` (`username` ASC) VISIBLE,
  INDEX `fk_USER_CARD_CARD1_idx` (`card_number` ASC) VISIBLE,
  PRIMARY KEY (`username`, `card_number`),
  CONSTRAINT `fk_USER_CARD_USER1`
    FOREIGN KEY (`username`)
    REFERENCES `Ecommerce_SS1`.`USER` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_CARD_CARD1`
    FOREIGN KEY (`card_number`)
    REFERENCES `Ecommerce_SS1`.`CARD` (`card_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`MESSAGE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`MESSAGE` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`MESSAGE` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `sender_user` VARCHAR(50) NOT NULL,
  `receiver_user` VARCHAR(50) NOT NULL,
  `content` TEXT NOT NULL,
  `date_hour` DATETIME NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_MESSAGE_USER1_idx` (`sender_user` ASC) VISIBLE,
  INDEX `fk_MESSAGE_USER2_idx` (`receiver_user` ASC) VISIBLE,
  CONSTRAINT `fk_MESSAGE_USER1`
    FOREIGN KEY (`sender_user`)
    REFERENCES `Ecommerce_SS1`.`USER` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MESSAGE_USER2`
    FOREIGN KEY (`receiver_user`)
    REFERENCES `Ecommerce_SS1`.`USER` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ecommerce_SS1`.`ADDRESS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ecommerce_SS1`.`ADDRESS` ;

CREATE TABLE IF NOT EXISTS `Ecommerce_SS1`.`ADDRESS` (
  `idADDRESS` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NOT NULL,
  `user_username` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idADDRESS`),
  INDEX `fk_ADDRESS_USER1_idx` (`user_username` ASC) VISIBLE,
  CONSTRAINT `fk_ADDRESS_USER1`
    FOREIGN KEY (`user_username`)
    REFERENCES `Ecommerce_SS1`.`USER` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
