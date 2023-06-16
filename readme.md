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

Add a .env file under /ui, /customer-auth and /atm-locator. For the /customer-auth/.env and /atm-locator/.env, add these details:

```
NODE_ENV = development
PORT = 8000
MONGO_URI = <your mongodb uri>
JWT_SECRET = 'secret@123'
```


### Run on localhost

```
# Run frontend (:3000)
cd ui
npm install
npm run dev
```
```
# Run auth microservice (:8000)
cd customer-auth
npm install
nodemon server.js
```
```
# Run atm microservice (:8001)
cd atm-locator
npm install
nodemon server.js
```

