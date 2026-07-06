CREATE DATABASE IF NOT EXISTS RecycleLink;
USE RecycleLink;
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    eco_points DECIMAL(10,2) DEFAULT 0,
    role ENUM('user', 'seller', 'buyer') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    title VARCHAR(255),
    category VARCHAR(100),
    weight VARCHAR(50),
    price DECIMAL(10,2),
    location VARCHAR(255),
    role VARCHAR(50),
    imageUrl VARCHAR(255),
    status ENUM('available', 'sold') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);