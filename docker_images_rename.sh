# REPOSITORY                TAG       IMAGE ID       CREATED         SIZE
# martian-bank-nginx             latest    633b85bbee7f   3 minutes ago   192MB
# martian-bank-ui                latest    0b8f50d704a6   3 minutes ago   408MB
# martian-bank-customer-auth     latest    a2251a6a2705   3 minutes ago   960MB
# martian-bank-dashboard         latest    88c000e910a1   4 minutes ago   1.07GB
# martian-bank-loan              latest    8a58b5eafa5a   4 minutes ago   1.07GB
# martian-bank-accounts          latest    5b740ca5ff84   4 minutes ago   1.07GB
# martian-bank-transactions      latest    7708054a8ad7   4 minutes ago   1.07GB
# martian-bank-atm-locator       latest    f5b365ce4fac   4 minutes ago   887MB
# harpooncorp/harpoon-ext   0.0.4     3c3609887f9d   4 months ago    12.8MB

docker compose down
docker compose build


# martian-bank-dashboard
docker tag martian-bank-dashboard waris95/martian-bank-dashboard

# martian-bank-loan
docker tag martian-bank-loan waris95/martian-bank-loan

# martian-bank-accounts
docker tag martian-bank-accounts waris95/martian-bank-accounts

#martian-bank-transactions
docker tag martian-bank-transactions waris95/martian-bank-transactions


docker login



docker push waris95/martian-bank-dashboard
docker push waris95/martian-bank-loan
docker push waris95/martian-bank-accounts
docker push waris95/martian-bank-transactions



# # to login
# aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 738304443349.dkr.ecr.us-west-2.amazonaws.com

# # to tag 
# docker tag martian-bank-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-accounts

# # to push
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-accounts


# #repos creations

# # martian-bank-transactions
# aws ecr create-repository --repository-name martian-bank-transactions  --image-scanning-configuration scanOnPush=true  --region us-west-2

# # martian-bank-dashboard
# aws ecr create-repository --repository-name martian-bank-dashboard  --image-scanning-configuration scanOnPush=true  --region us-west-2

# #martian-bank-loan
# aws ecr create-repository --repository-name martian-bank-loan  --image-scanning-configuration scanOnPush=true  --region us-west-2

# #martian-bank-accounts
# aws ecr create-repository --repository-name martian-bank-accounts  --image-scanning-configuration scanOnPush=true  --region us-west-2

# # tag and push martian-bank-transactions
# docker tag martian-bank-transactions 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-transactions
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-transactions

# # tag and push martian-bank-dashboard
# docker tag martian-bank-dashboard 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-dashboard
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-dashboard

# # tag and push martian-bank-loan
# docker tag martian-bank-loan 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-loan
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-loan

# # tag and push martian-bank-accounts
# docker tag martian-bank-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-accounts
# docker push 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-accounts

# # tang and push these images to public ecr 
# docker tag martian-bank-accounts 738304443349.dkr.ecr.us-west-2.amazonaws.com/martian-bank-accounts


