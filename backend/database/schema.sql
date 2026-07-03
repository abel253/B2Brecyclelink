CREATE DATABASE IF NOT EXISTS RecycleLink;
USE RecycleLink;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    eco_points DECIMAL(10,2) DEFAULT 0,
    role ENUM('seller', 'buyer') DEFAULT 'seller'
);

CREATE TABLE IF NOT EXISTS listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    material_type VARCHAR(50),
    weight_kg DECIMAL(10,2),
    price_etb DECIMAL(10,2),
    status ENUM('available', 'sold') DEFAULT 'available',
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- ለሙከራ ዳታ
INSERT INTO users (company_name, eco_points) VALUES ('Sheraton Addis', 1250.50);
INSERT INTO listings (seller_id, material_type, weight_kg, price_etb) 
VALUES (1, 'Plastic PET', 500, 15000);