aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 738304443349.dkr.ecr.us-east-1.amazonaws.com


# tag and push bankapp-transactions
docker tag bankapp-transactions 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-transactions
docker push 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-transactions

# tag and push bankapp-dashboard
docker tag bankapp-dashboard 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-dashboard
docker push 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-dashboard

# tag and push bankapp-loan
docker tag bankapp-loan 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-loan
docker push 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-loan

# tag and push bankapp-accounts
docker tag bankapp-accounts 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-accounts
docker push 738304443349.dkr.ecr.us-east-1.amazonaws.com/bankapp-accounts


# 
# kubectl delete all --all --namespace default 