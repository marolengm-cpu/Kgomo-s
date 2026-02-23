-- Kgomo's Restaurant Database Schema
-- Host: Xneelo
-- Database: 16ueg_u4t4d
-- User: scaz6_cfqkg

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    payment_method VARCHAR(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Details (Items in order)
CREATE TABLE IF NOT EXISTS order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id VARCHAR(50),
    item_name VARCHAR(255),
    quantity INT,
    price_at_time_of_order DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Table Reservations
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    time TIME,
    guests INT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    requests TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kids Zone Birthday Inquiries
CREATE TABLE IF NOT EXISTS kids_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_name VARCHAR(255),
    email VARCHAR(255),
    proposed_date DATE,
    kids_count INT,
    preferred_package VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Corporate & Private Events
CREATE TABLE IF NOT EXISTS corporate_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    email VARCHAR(255),
    event_type VARCHAR(255),
    event_date DATE,
    guests INT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- General Contact Form
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Member Saved Favorites
CREATE TABLE IF NOT EXISTS saved_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    menu_item_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty Program Signups
CREATE TABLE IF NOT EXISTS loyalty_signups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    monthly_spend_estimate DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);