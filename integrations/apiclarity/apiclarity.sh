# Copyright (c) 2023 Cisco Systems, Inc. and its affiliates All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

#######################################################################################
## Steps to deploy martian-bank with apiclarity

# clean all resources from previous deployments

helm uninstall martianbank -n bank-app
helm uninstall apiclarity -n apiclarity

kubectl delete all --all -n bank-app
kubectl delete all --all -n apiclarity

# delete namespaces

kubectl delete namespace bank-app
kubectl delete namespace apiclarity

# create namespaces

kubectl create namespace bank-app
kubectl label namespace bank-app istio-injection=enabled

# install martianbank

helm install --set 'nginx.enabled=false' martianbank martianbank -n bank-app
kubectl get pods -n bank-app
kubectl get services -n bank-app

# install API Clarity

helm install --set 'trafficSource.envoyWasm.enabled=true' --set 'trafficSource.envoyWasm.namespaces={bank-app}' --set 'supportExternalTraceSource.enabled=true' --create-namespace apiclarity apiclarity/apiclarity -n apiclarity
kubectl get pods -n apiclarity
kubectl get services -n apiclarity

# make UI as load balancer
kubectl apply -f ./integrations/apiclarity/lb-apiclarity.yaml -n apiclarity

# after these steps, copy the dashboard external IP and run this commmand:
# helm upgrade martianbank martianbank -n bank-app --set 'nginx.enabled=false' --set "nginx.dashboardIP=<external IP>" 