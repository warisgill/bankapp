# Bank App

## Architecture Diagram

![Architecture Diagram](https://drive.google.com/uc?export=view&id=11wVBfu2FNnhEWACRv63rq1XvnUWQQO4-)
---

## Deployment Diagram

![Deployment Diagram](https://drive.google.com/uc?export=view&id=1fVyWct-WydBdaYkZniQxKDn_XQIUxiR6)
---

## Installation Steps?

1. Make env files:

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

---

2. Run on localhost (your machine)

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

Make sure that you have installed conda and pip.
```
cd dashboard
conda create --name <env_name>
conda activate <env_name>
pip install -r requirements.txt
```

```
cd accounts
conda activate <env_name>
python accounts.py
```

```
cd transactions
conda activate <env_name>
python transaction.py
```

```
cd loan
conda activate <env_name>
python loan.py
```

```
cd dashboard
conda activate <env_name>
python dashboard.py
```

Fire up `http://localhost:3000` to access the Martian Bank App.

---

3. Running locally using Docker 

Make sure you have docker desktop installed and runnning on your system.

```
docker compose up --build
```
Fire up `http://localhost/`

---

4. Running locally using K8s (inside Docker Desktop):

Ensure that you have kubernetes enabled in Docker Desktop. Install `kubectl` as well.

```
kubectl apply -f k8.yaml
kubectl get pods
kubectl get services
```
Fire up `http://localhost/`

--- 

### API Documentation

Postman Documentation: https://documenter.getpostman.com/view/10335120/2s93z5A5NP
(for customer-auth and atm microservice)