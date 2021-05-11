#!/usr/bin/env bash
# version: Run AFTER bumping the package version, but BEFORE commit.
# https://docs.npmjs.com/misc/scripts
set -eo pipefail

VERSION=$(cat package.json | jq -r '.version' | cut -d'-' -f1)

echo "UPDATING HASHES"
echo "Downloading hashes for ${VERSION}"
curl -s --fail --show-error "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS" > hashes.txt
echo

echo "VERIFYING HASHES"
gpg --import hashicorp.asc || true
curl -s --fail --show-error "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS.sig" \
  | gpg --verify - hashes.txt
echo

echo "BUILDING"
yarn build
echo

echo "RUNNING TESTS"
yarn test
echo

echo "STAGING HASHES"
git add hashes.txt
echo

echo "Done."
