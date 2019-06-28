#!/usr/bin/env bash
set -eo pipefail

EXPECTED_VERSION=$(git describe | cut -d'-' -f1)

echo "test: execute terraform"
yarn install > /dev/null 2>&1
RESULT=$(./bin/terraform.js --version | head -n1)
if [[ "${RESULT}" != "Terraform ${EXPECTED_VERSION}" ]]; then
  echo "Test failed."
  exit 1
fi

echo "test: forward exit code"
set +e
./bin/terraform.js --bad-arg > /dev/null 2>&1
RESULT=$?
set -e
if [[ "${RESULT}" != "127" ]]; then
  echo "Test failed."
  exit 1
fi

echo "test: reinstall terraform"
rimraf downloads > /dev/null 2>&1
yarn install > /dev/null 2>&1
RESULT=$(./bin/terraform.js --version | head -n1)
if [[ "${RESULT}" != "Terraform ${EXPECTED_VERSION}" ]]; then
  echo "Test failed."
  exit 1
fi

echo "Tests passed."
