

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



