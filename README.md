# 🏋️ FitLife - Miami Retro Fitness Forum

A full-stack Q&A forum for fitness enthusiasts built with Node.js, Express, MySQL, and React. Features a Miami Retro neon aesthetic.

## Features
- User registration and login with JWT authentication
- Password hashing with bcryptjs
- 5 fitness categories: Weightlifting, Running & Cardio, Yoga & Flexibility, Nutrition, Recovery & Rest
- Ask and answer questions in each category
- Miami Retro neon theme with Orbitron font

## Tech Stack
- **Frontend:** React, React Router, React Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth:** JWT, bcryptjs

## Requirements
- Node.js v18+
- MySQL 8.0+
- npm

## Setup
Clone the repo, then install dependencies in both the `server` and `client` folders with `npm install`.

Update `server/dataDBConnections.js` with your MySQL password, then run the SQL script in `server/fitlife_db.sql` to create the database.

Start the server with `nodemon index.js` inside the `server` folder, and the client with `npm start` inside the `client` folder. The app runs on `http://localhost:3000`.

## Database SQL Script
```sql
CREATE DATABASE IF NOT EXISTS fitlife_db;
USE fitlife_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES
  ('Weightlifting'),
  ('Running & Cardio'),
  ('Yoga & Flexibility'),
  ('Nutrition'),
  ('Recovery & Rest');
```