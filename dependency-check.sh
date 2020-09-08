#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"

  if [[ ! -z "${GITHUB_ACTOR}" ]]; then
    git config user.name "${GITHUB_ACTOR}"
    git remote set-url --push origin "https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}"
    git branch -u origin/master
  fi
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
