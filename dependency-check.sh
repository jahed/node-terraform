#!/usr/bin/env bash
set -eo pipefail

git config user.email "jahed.public+ci@gmail.com"
git config user.name "${GITHUB_ACTOR}"

yarn upgrade --latest
git add yarn.lock '*package.json'

set +e
git commit -m 'build(deps): upgrade dependencies'
RESULT=$?
set -e

if [[ "${RESULT}" != "0" ]]; then
  echo "No dependency changes."
  exit 0
fi

yarn test

git remote set-url --push origin "https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}"
git push
