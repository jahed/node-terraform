#!/usr/bin/env bash
# version: Run AFTER bumping the package version, but BEFORE commit.
# https://docs.npmjs.com/misc/scripts
set -eo pipefail

echo "Updating hashes.txt."

gpg --import hashicorp.asc || true

VERSION=$(cat package.json | jq -r '.version' | cut -d'-' -f1)
echo "Downloading hashes for ${VERSION}"
curl -s "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS" > hashes.txt
curl -s "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS.sig" \
  | gpg --verify - hashes.txt

yarn test

git add hashes.txt

echo "Done."
