# Bank App

This repository contains the code for the Bank App. 

### Customer-Auth microservice

It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware

### Frontend

- React frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library
- React Toastify notifications

### Env Variables

Add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
cd customer-auth
npm install
cd ui
npm install
```

### Run

```
# Run frontend (:3000)
npm run client

# Run auth microservice (:8000)
npm run auth
```

<!-- ## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
``` -->
