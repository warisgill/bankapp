# Copyright (c) 2023 Cisco Systems, Inc. and its affiliates All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

#######################################################################################

## Install packages to scan license (on mac OS)
npm i -g license-checker-rseidelsohn
pip3 install prettytable
brew install jq

#######################################################################################
## Generate license reports

# Clear existing licenses.txt file (if any)
echo -n > ./licenses.txt

# report for Python microservices
echo -e "\n\n --- Python Microservices --- \n" >> ./licenses.txt
python3 python_licenses.py >> ./licenses.txt

# report for ui
echo -e "\n\n --- Node.js Microservices --- \n" >> ./licenses.txt
cd ui
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for customer-auth
echo -e "\n\n --- Customer Auth --- \n" >> ./licenses.txt
cd customer-auth
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for atm-locator
echo -e "\n\n --- ATM Locator -- \n" >> ./licenses.txt
cd atm-locator
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..
