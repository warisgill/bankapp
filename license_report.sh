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

# report for Python microservicesxs
python3 python_licenses.py >> ./licenses.txt

# report for ui
cd ui
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for customer-auth
cd customer-auth
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

# report for atm-locator
cd atm-locator
license-checker-rseidelsohn --json --production --direct  | jq -r 'to_entries | map([(.key | split("@"))[-2], (.key | split("@"))[-1], .value.licenses] | @tsv) | .[]' | column -t -s $'\t' >>../licenses.txt
cd ..

echo "License report generated successfully!"