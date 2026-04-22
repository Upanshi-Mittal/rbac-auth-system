# 🛒 Role-Based Product Management System

A full-stack web application with secure authentication, role-based access control, and CRUD operations on products.

---

## Features

### Authentication & Security
- User Signup & Login using JWT Authentication
- Password hashing using bcrypt
- Protected routes using middleware

### 👥 Role-Based Access
- **Admin**: Can add & delete products
- **User**: Can view products only

### Product Management
- Create products (Admin only)
- View all products
- Delete products (Admin only)

### Frontend
- Built with React.js
- Login & Signup UI
- Protected dashboard
- Real-time product updates

---

## Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Bcrypt (Password hashing)

### Frontend:
- React.js
- React Router
- React Toastify

---

## Project Structure

backend/
 ├── Controllers/
 ├── Middlewares/
 ├── Models/
 ├── router/
 ├── index.js

frontend/
 ├── src/
 ├── components/
 ├── pages/

---

## Installation & Setup

### Clone Repository

git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git  
cd YOUR_REPO  

---

### Backend Setup

cd backend  
npm install  

Create `.env` file:

PORT=8080  
Mongo_CONN=your_mongodb_url  
JWT_SECRET=your_secret_key  

Run backend:

npm start  

---

### Frontend Setup

cd frontend  
npm install  
npm run dev  

---

## Run with Docker

```bash
docker-compose up --build
```

---
## API Endpoints

### Auth

POST /auth/signup → Register user  
POST /auth/login → Login user  

---

### Products

GET /products → User/Admin  
POST /products → Admin  
DELETE /products/:id → Admin  

---

## Security Features

- JWT-based authentication
- Role-based authorization middleware
- Input validation
- Password hashing using bcrypt

---

## Testing

APIs can be tested using:
- Postman

---