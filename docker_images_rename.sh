# REPOSITORY                TAG       IMAGE ID       CREATED         SIZE
# bankapp-nginx             latest    633b85bbee7f   3 minutes ago   192MB
# bankapp-ui                latest    0b8f50d704a6   3 minutes ago   408MB
# bankapp-customer-auth     latest    a2251a6a2705   3 minutes ago   960MB
# bankapp-dashboard         latest    88c000e910a1   4 minutes ago   1.07GB
# bankapp-loan              latest    8a58b5eafa5a   4 minutes ago   1.07GB
# bankapp-accounts          latest    5b740ca5ff84   4 minutes ago   1.07GB
# bankapp-transactions      latest    7708054a8ad7   4 minutes ago   1.07GB
# bankapp-atm-locator       latest    f5b365ce4fac   4 minutes ago   887MB
# harpooncorp/harpoon-ext   0.0.4     3c3609887f9d   4 months ago    12.8MB


docker-compose build

# bankapp-nginx
docker tag bankapp-nginx waris95/bankapp-nginx

# bankapp-ui
docker tag bankapp-ui waris95/bankapp-ui

# bankapp-customer-auth
docker tag bankapp-customer-auth waris95/bankapp-customer-auth

# bankapp-dashboard
docker tag bankapp-dashboard waris95/bankapp-dashboard

# bankapp-loan
docker tag bankapp-loan waris95/bankapp-loan

# bankapp-accounts
docker tag bankapp-accounts waris95/bankapp-accounts

#bankapp-transactions
docker tag bankapp-transactions waris95/bankapp-transactions

# bankapp-atm-locator
docker tag bankapp-atm-locator waris95/bankapp-atm-locator

docker login

docker push waris95/bankapp-nginx
docker push waris95/bankapp-ui
docker push waris95/bankapp-customer-auth
docker push waris95/bankapp-dashboard
docker push waris95/bankapp-loan
docker push waris95/bankapp-accounts
docker push waris95/bankapp-transactions
docker push waris95/bankapp-atm-locator


# # to login
# aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 738304443349.dkr.ecr.us-west-2.amazonaws.com

# # to tag 
# docker tag bankapp-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-accounts

# # to push
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-accounts


# #repos creations

# # bankapp-transactions
# aws ecr create-repository --repository-name bankapp-transactions  --image-scanning-configuration scanOnPush=true  --region us-west-2

# # bankapp-dashboard
# aws ecr create-repository --repository-name bankapp-dashboard  --image-scanning-configuration scanOnPush=true  --region us-west-2

# #bankapp-loan
# aws ecr create-repository --repository-name bankapp-loan  --image-scanning-configuration scanOnPush=true  --region us-west-2

# #bankapp-accounts
# aws ecr create-repository --repository-name bankapp-accounts  --image-scanning-configuration scanOnPush=true  --region us-west-2

# # tag and push bankapp-transactions
# docker tag bankapp-transactions 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-transactions
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-transactions

# # tag and push bankapp-dashboard
# docker tag bankapp-dashboard 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-dashboard
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-dashboard

# # tag and push bankapp-loan
# docker tag bankapp-loan 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-loan
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-loan

# # tag and push bankapp-accounts
# docker tag bankapp-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-accounts
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-accounts

# # tang and push these images to public ecr 
# docker tag bankapp-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/bankapp-accounts


