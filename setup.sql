-- ============================================================
-- Kgomo's Restaurant Database Schema
-- Host:     Xneelo
-- Database: 16ueg_u4t4d
-- User:     scaz6_cfqkg
-- Updated:  2025 — production-hardened version
-- ============================================================

-- ── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    user_id       VARCHAR(255)   NOT NULL,
    total_amount  DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT        NOT NULL,
    status        VARCHAR(50)    DEFAULT 'Pending',
    payment_method VARCHAR(50),
    order_date    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_orders_user_id (user_id),
    INDEX idx_orders_status  (status)
);

-- ── Order Details ─────────────────────────────────────────────────────────────
-- FIX: added ON DELETE CASCADE so deleting an order removes its line items
CREATE TABLE IF NOT EXISTS order_details (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    order_id                INT,
    menu_item_id            VARCHAR(50),
    item_name               VARCHAR(255),
    quantity                INT,
    price_at_time_of_order  DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_details_order_id (order_id)
);

-- ── Table Reservations ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    date        DATE,
    time        TIME,
    guests      INT,
    name        VARCHAR(255),
    email       VARCHAR(255),
    phone       VARCHAR(50),
    requests    TEXT,
    status      VARCHAR(50)  DEFAULT 'pending',
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reservations_date  (date),
    INDEX idx_reservations_email (email)
);

-- ── Kids Zone Birthday Inquiries ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kids_inquiries (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    parent_name       VARCHAR(255),
    email             VARCHAR(255),
    proposed_date     DATE,
    kids_count        INT,
    preferred_package VARCHAR(255),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_kids_inquiries_email (email)
);

-- ── Corporate & Private Events ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS corporate_inquiries (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    company_name  VARCHAR(255),
    email         VARCHAR(255),
    event_type    VARCHAR(255),
    event_date    DATE,
    guests        INT,
    details       TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_corporate_inquiries_email (email)
);

-- ── General Contact Form ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255),
    email      VARCHAR(255),
    subject    VARCHAR(255),
    message    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_inquiries_email (email)
);

-- ── Member Saved Favourites ───────────────────────────────────────────────────
-- FIX: added UNIQUE constraint to prevent duplicate favourites per user
CREATE TABLE IF NOT EXISTS saved_items (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      VARCHAR(255),
    menu_item_id VARCHAR(255),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_saved_items (user_id, menu_item_id),
    INDEX idx_saved_items_user_id (user_id)
);

-- ── Loyalty Program Signups ───────────────────────────────────────────────────
-- FIX: added UNIQUE constraint on email to prevent duplicate signups
CREATE TABLE IF NOT EXISTS loyalty_signups (
    id                     INT AUTO_INCREMENT PRIMARY KEY,
    name                   VARCHAR(255),
    email                  VARCHAR(255),
    monthly_spend_estimate DECIMAL(10, 2),
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_loyalty_email (email),
    INDEX idx_loyalty_email (email)
);

-- ── Meal Prep Subscriptions (NEW) ─────────────────────────────────────────────
-- Added to support the MealPrep page DB persistence (was missing entirely)
CREATE TABLE IF NOT EXISTS meal_prep_subscriptions (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    cardholder_name      VARCHAR(255),
    email                VARCHAR(255),
    address              TEXT,
    delivery_notes       TEXT,
    meal_count           INT,
    macro_ratio          VARCHAR(20),
    portion_size         INT,
    dietary_preferences  VARCHAR(255),
    weekly_total         DECIMAL(10, 2),
    status               VARCHAR(50) DEFAULT 'active',
    created_at           TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_meal_prep_email (email)
);
