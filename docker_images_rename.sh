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
