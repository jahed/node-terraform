#!/usr/bin/env bash
set -eo pipefail

function get_version_line {
  ./bin/terraform.js --version | fgrep 'Terraform v' | head -n1
}

EXPECTED_VERSION=$(cat package.json | jq -r '.version' | cut -d'-' -f1)

echo "TEST: Executes existing Terraform"
yarn install --frozen-lockfile
RESULT=$(get_version_line)
if [[ "${RESULT}" != "Terraform v${EXPECTED_VERSION}" ]]; then
  echo "Test failed."
  exit 1
fi
echo

echo "TEST: Forwards exit codes"
set +e
./bin/terraform.js --bad-arg > /dev/null 2>&1
RESULT=$?
set -e
if [[ "${RESULT}" != "127" ]]; then
  echo "Test failed."
  exit 1
fi
echo

echo "TEST: Reinstalls Terraform with correct version"
rm -r ./node_modules/.cache/@jahed/terraform
yarn install --frozen-lockfile
RESULT=$(get_version_line)
if [[ "${RESULT}" != "Terraform v${EXPECTED_VERSION}" ]]; then
  echo "Test failed."
  exit 1
fi
echo

echo "Tests passed."
