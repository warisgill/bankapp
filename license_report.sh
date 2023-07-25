#######################################################################################
## Install packages to scan license (on mac OS)

npm i -g license-checker
pip install pip-licenses
brew install jq

#######################################################################################
## Generate license reports

# Clear existing licenses.txt file (if any)
echo -n > ./licenses.txt

# report for dashboard
echo -e "\n\n --- Dashboard --- \n" >> ./licenses.txt
cd dashboard
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for accounts
echo -e "\n\n --- Accounts --- \n" >> ./licenses.txt
cd accounts
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for loan
echo -e "\n\n --- Loan --- \n" >> ./licenses.txt
cd loan
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for transactions
echo -e "\n\n --- Transactions -- \n" >> ./licenses.txt
cd transactions
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for ui
echo -e "\n\n --- UI --- \n" >> ./licenses.txt
cd ui
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for nginx
echo -e "\n\n --- Nginx --- \n" >> ./licenses.txt
cd nginx
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for customer-auth
echo -e "\n\n --- Customer Auth --- \n" >> ./licenses.txt
cd customer-auth
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
echo -e "\n\n" >> ./licenses.txt

# report for atm-locator
echo -e "\n\n --- ATM Locator -- \n" >> ./licenses.txt
cd atm-locator
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
echo -e "\n\n" >> ./licenses.txt
