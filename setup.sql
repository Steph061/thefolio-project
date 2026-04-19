-- Create Database
CREATE DATABASE thefolio;

-- Connect to the database (this needs to be run separately)
-- \c thefolio

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  bio TEXT DEFAULT '',
  profile_pic VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  image VARCHAR(255) DEFAULT '',
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'removed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
