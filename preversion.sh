#!/usr/bin/env bash
set -eo pipefail

gpg --import hashicorp.asc || true

VERSION=$(git describe | cut -d'-' -f1 | cut -d'v' -f2)
curl -s "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS" > hashes.txt
curl -s "https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_SHA256SUMS.sig" \
  | gpg --verify - hashes.txt

git add hashes.txt
echo "Updated hashes.txt."
