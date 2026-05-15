# CineStream Pro Backend

A production-grade Node.js + Express backend for the CineStream Pro movie management platform.

## Features

- RESTful API architecture
- MongoDB integration using Mongoose
- JWT-based Authentication & Authorization
- Role-based access control (Admin/User)
- Image uploads to Cloudinary via Multer memory storage
- Centralized error handling
- Security middleware (Helmet, CORS, Rate Limiting)

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- Cloudinary
- Multer
- Bcrypt.js

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the values
4. Run development server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `config/`: Configuration files (Database, Cloudinary)
- `controllers/`: Route handler logic
- `middleware/`: Custom middleware (Auth, Error, Validation)
- `models/`: Mongoose schemas
- `routes/`: Express routers
- `utils/`: Helper utilities (Cloudinary upload, Error response)

## Scripts

- `npm start`: Runs the server in production mode
- `npm run dev`: Runs the server with nodemon for development
- `npm test`: Runs test suites (if configured)
