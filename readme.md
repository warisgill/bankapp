# Bank App

This repository contains the code for the Bank App.

### API Documentation

Postman Documentation: https://documenter.getpostman.com/view/10335120/2s93z5A5NP
(for customer-auth and atm microservice)

### Env Variables

Add a `.env` file under /ui, /customer-auth and /atm-locator.

For the `/customer-auth/.env` and `/atm-locator/.env`, add these details:

```
NODE_ENV = development
PORT = <PORT NO>
MONGO_URI = <your mongodb uri>
JWT_SECRET = 'secret@123'
```

For `/ui/.env`, add these details:

```
VITE_ACCOUNT_URL=<URL>
VITE_USERS_URL=<URL>
VITE_ATM_URL=<URL>
```

### Run on localhost

```
# Run frontend (:3000)
cd ui
npm install
npm run ui
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
