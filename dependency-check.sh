#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"
  git config user.name "${GITHUB_ACTOR}"
fi

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
git push
