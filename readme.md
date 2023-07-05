# Bank App

This repository contains the code for the Bank App.

## How to run?

### Make env files

This step has to be done for running on localhost as well as on k8s. 

Make a `.env` file under /ui, /customer-auth and /atm-locator.

For the `/customer-auth/.env` and `/atm-locator/.env`, add these details:

```
NODE_ENV = <development/production>
PORT = <PORT NO>
MONGO_URI = <your mongodb uri>
JWT_SECRET = <your JWT secret>
```
Here, JWT secret can be any string, which you want to use for generating JWT tokens.


For `/ui/.env`, add these details:

```
VITE_ACCOUNTS_URL=<URL>
VITE_NEW_ACCOUNT_URL=<URL>
VITE_USERS_URL=<URL>
VITE_ATM_URL=<URL>
VITE_TRANSFER_URL=<URL>
VITE_TRANSACTION_URL=<URL>
VITE_LOAN_URL=<URL>
```

### Run on localhost (your machine)

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

Fire up `http://localhost:3000` to access the Martian Bank App.

### Running locally using Docker 

```
docker compose up --build
```
Fire up `http://localhost/`

### Running locally using K8s (inside Docker Desktop):

Ensure that you have kubernetes enabled in Docker Desktop. Install `kubectl` as well.

```
kubectl apply -f k8.yaml
kubectl get pods
kubectl get services
```
Fire up `http://localhost/`

### API Documentation

Postman Documentation: https://documenter.getpostman.com/view/10335120/2s93z5A5NP
(for customer-auth and atm microservice)