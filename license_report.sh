#######################################################################################
## Install packages to scan license (on mac OS)

npm i -g license-checker
pip install pip-licenses
brew install jq

#######################################################################################
## Generate license reports

# report for dashboard
cd dashboard
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..

# report for accounts
cd accounts
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..

# report for loan
cd loan
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..

# report for transactions
cd transactions
pip-licenses --format=json >./licenses.json
cat licenses.json | jq -r '.[] | [.Name, .Version, .License] | @tsv' | column -t -s $'\t' >>../licenses.txt
rm -rf licenses.json
cd ..

# report for ui
cd ui
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for nginx
cd nginx
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for customer-auth
cd customer-auth
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for atm-locator
cd atm-locator
license-checker --json | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
