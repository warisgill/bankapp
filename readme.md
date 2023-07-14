# Martian Bank 🚀

<br />
This Bank App is a microservices application that allows customers to access and manage their bank accounts, perform financial transactions, locate ATMs, and apply for loans.

It is built using [React](https://react.dev/),[Node.js](https://nodejs.org/en/about), [Python](https://flask.palletsprojects.com/en/2.3.x/) and is packaged in [Docker](https://www.docker.com/) containers.

<br />

![Screenshot](https://drive.google.com/uc?export=view&id=1BmbbL5GJyHRBCkUYH91K8GaJJxtiNz_q)


<br />

## Application Design

<br />

The Martian Bank UI is a [React](https://react.dev/) dashboard which uses [react-redux toolkit](https://redux-toolkit.js.org/). There is an [NGINX](https://www.nginx.com/) container which site between the UI and microservices and acts as a reverse proxy. There are 6 microservices, out of which 2 (customer-auth and atm-locator) are developed in Node.js whereas the others are done using Python. The dashboard microservice talks to accounts, transactions and loan microservices using [gRPC](https://grpc.io/).  

![Architecture Diagram](https://drive.google.com/uc?export=view&id=11wVBfu2FNnhEWACRv63rq1XvnUWQQO4-)

<br />
<br />

## Installation Steps?

<br />

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
<br />

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
<br />

## Deployment Diagram

![Deployment Diagram](https://drive.google.com/uc?export=view&id=1fVyWct-WydBdaYkZniQxKDn_XQIUxiR6)

---
<br />

3. Running locally using Docker 

Make sure you have docker desktop installed and runnning on your system.

```
# To build docker containers:
docker compose up --build 

# To remove docker containers:
docker compose down
```
Fire up `http://localhost/` to access the Martian Bank App.

---
<br />

4. Running locally using K8s (inside Docker Desktop):

Ensure that you have kubernetes enabled in Docker Desktop. Install `kubectl` as well.

Make sure you have helm installed, if not, run brew install helm first.

```
# To create a cluster:
helm install test1 martianbank
kubectl get pods
kubectl get services

# To delete the cluster:
kubectl delete --all deployments
kubectl delete --all services
```
Fire up `http://localhost/` to access the Martian Bank App.

--- 
<br />

5. Deploying to AWS EKS:

- Install AWS CLI tool and configure it (pass in access key, secret key, region, and it creates ~/.aws/config and ~/.aws/credentials files).
```
aws configure
```

- Install eksctl tool
```
brew tap weaveworks/tap; brew install weaveworks/tap/eksctl
```

- Install IAM authenticator
```
brew install aws-iam-authenticator
```

- Create cluster.yaml file
```
apiVersion: eksctl.io/v1alpha5 
kind: ClusterConfig 
  
metadata: 
  name: <username> 
  region: us-east-1 
  
vpc: 
  cidr: "172.20.0.0/16" ## Can change this value 
  nat: 
   gateway: Single 
  clusterEndpoints: 
   publicAccess: true 
   privateAccess: true 
  
nodeGroups: 
  - name: ng-1 
    minSize: 2 
    maxSize: 2 
    instancesDistribution: 
      maxPrice: 0.093 
      instanceTypes: ["t3a.large", "t3.large"] 
      onDemandBaseCapacity: 0 
      onDemandPercentageAboveBaseCapacity: 50 
      spotInstancePools: 2 
    ssh: 
     publicKeyPath: <path> 
```

- Create cluster (takes ~20 minutes)
```
eksctl create cluster -f cluster.yaml
```

- Run the cluster (make sure you have helm installed, if not, run brew install helm first)
```
helm install test1 martianbank 
kubectl get pods
kubectl get services
```

- Copy the aws link that you see next to nginx. Fire that to access the Martian Bank.

- Delete the cluster
```
kubectl delete --all deployments
kubectl delete --all services
```

<!-- ---

### API Documentation

Postman Documentation: https://documenter.getpostman.com/view/10335120/2s93z5A5NP
(for customer-auth and atm microservice) -->