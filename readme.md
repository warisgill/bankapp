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

  

# Installation
There are mulitple ways to install MartianBank. 

## Installation Using Helm for MartianBank App

This tutorial will guide you through the process of setting up and installing the MartianBank app using Helm on a Kubernetes cluster. Helm is a package manager for Kubernetes that simplifies the deployment of applications and services.

Before we begin, please ensure you have the following prerequisites installed:

1. **Docker**: To run Kubernetes and containerized applications. You can download and install Docker from [here](https://www.docker.com/).

2. **Kubernetes**: Enable Kubernetes within Docker Desktop. Follow the instructions provided in the official Docker documentation [here](https://docs.docker.com/desktop/kubernetes/).

3. **kubectl**: The Kubernetes command-line tool to interact with the cluster. Install it using the guidelines found [here](https://kubernetes.io/docs/tasks/tools/).

4. **Helm**: The package manager for Kubernetes. Helm allows you to define, install, and upgrade complex Kubernetes applications. Follow the installation instructions [here](https://helm.sh/docs/intro/install/).

Once you have the prerequisites installed, proceed with the following steps to set up MartianBank:

#### Step 1: Clone the MartianBank GitHub Repository

First, download the MartianBank GitHub repository using the following steps:

1. Open your terminal or command prompt.

2. Clone the repository by running the command:

```bash
git clone https://github.com/warisgill/bankapp
```

3. Change to the downloaded repository directory using the command:

```bash
cd bankapp
```

#### Step 2: Install MartianBank using Helm

Now that you have the MartianBank repository downloaded, you can use Helm to install the app on your Kubernetes cluster.

1. To install MartianBank, use the Helm command:

```bash
helm install martianbank martianbank
```

2. Wait for the installation to complete. Helm will deploy the necessary components to your Kubernetes cluster.

#### Step 3: Check Pod Status

After the installation is complete, you can verify the status of the pods running within your Kubernetes cluster.

 To get a list of pods, run the following command:

```bash
kubectl get pods
```

#### Step 4: Get MartianBank App URL

To access the MartianBank app, you need to find the URL (IP address) of the running MartianBank service.

Run the following command to get the list of services:

```bash
kubectl get service
```

Look for the **EXTERNAL-IP** under the ***nginx*** microservice. This IP address is where the MartianBank app is accessible.

#### Step 5: Access MartianBank App

Now that you have the URL (IP address) of the MartianBank app, you can access it using a web browser.

1. Copy the URL (IP address) from the **EXTERNAL-IP** field.

2. Paste the URL in your browser's address bar and press Enter to access the MartianBank app. For example, if the IP is `localhost`, simply paste `localhost` in the browser to access the MartianBank app.

Congratulations! You have successfully installed and accessed the MartianBank app on your Kubernetes cluster using Helm. Now you can explore and use the app as needed. If you encounter any issues during installation, double-check the prerequisites and ensure that all steps were followed correctly. Happy banking with MartianBank!

#### Tutorial: Uninstalling the MartianBank App

In this section, you'll learn how to uninstall the MartianBank app from your Kubernetes cluster. We'll follow two simple steps to ensure a clean removal of the app.

**Step 1: Uninstall using Helm**

To remove the MartianBank app from the cluster, we'll use Helm to uninstall it.

1. Open your terminal or command prompt.

2. Run the following Helm command to uninstall the MartianBank release:

```bash
helm uninstall martianbank
```

This command will remove all the Kubernetes resources associated with the MartianBank release.

**Step 2: Delete Remaining Resources**

Although Helm has uninstalled the main components, there might still be some resources remaining in the cluster. To ensure a complete removal, we'll use kubectl to delete all resources in the default namespace.

1. Run the following kubectl command:

```bash
kubectl delete all --all --namespace default
```

This command will delete all resources (pods, services, deployments, etc.) in the default namespace.

After performing the above two steps, the MartianBank app should be completely uninstalled from your Kubernetes cluster.

**Note:** If you have installed the MartianBank app in a namespace other than "default," make sure to change the `--namespace` flag in both the Helm and kubectl commands accordingly.

Now you have successfully uninstalled the MartianBank app from your Kubernetes cluster, and all associated resources have been removed. If you have any other Helm releases or resources running on the cluster, you can manage them similarly using Helm commands and kubectl operations.


## Installatioin in Kind Cluster

Setting up MartianBank on a KIND (Kubernetes in Docker) cluster involves a few additional steps compared to a regular Kubernetes cluster. KIND allows you to create a lightweight Kubernetes cluster inside Docker containers, which is ideal for testing and development purposes. Here's how you can set up MartianBank on a KIND cluster:

**Step 1: Install KIND and Docker**

If you haven't already installed KIND and Docker, you need to do that first. Follow the official installation guides for [KIND](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) and [Docker](https://docs.docker.com/get-docker/) based on your operating system.

**Step 2: Create a KIND Cluster**

1. Open your terminal or command prompt.

2. Create a KIND cluster by running the following command:

```bash
kind create cluster --name martianbank
```

This will create a new KIND cluster named "martianbank" with a single Kubernetes node.

**Step 3: Configure Kubectl**

The KIND cluster should now be running, but your `kubectl` is not automatically configured to communicate with the cluster. You need to set the context for your `kubectl` to use the KIND cluster.

1. Run the following command to set the `kubectl` context to the new KIND cluster:

```bash
kubectl cluster-info --context kind-martianbank
```

**Step 4: Install MartianBank using Helm**

Now that your KIND cluster is set up and Helm is installed, you can proceed with installing MartianBank.

1. Clone the MartianBank GitHub repository and navigate to the downloaded directory as mentioned in the previous tutorial.

2. Install MartianBank using the Helm command:

```bash
helm install martianbank martianbank
```

**Step 5: Access MartianBank App**

After the installation is complete, you can access the MartianBank app just like before. Find the IP address of the running MartianBank service using `kubectl get service` and access it in your browser (previous tutorial).

**Step 6: Uninstall MartianBank**

If you want to uninstall MartianBank from the KIND cluster, follow the same uninstallation steps mentioned in the previous tutorial:

```bash
helm uninstall martianbank
kubectl delete all --all --namespace default
```

That's it! You now have MartianBank installed and running on your KIND cluster. Remember that KIND clusters are ephemeral and will be destroyed once you delete them. You can always create a new cluster with the same name or a different one using `kind create cluster` if needed. Happy testing with MartianBank on your KIND cluster. 







## Local Machine Setup (older)
  

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