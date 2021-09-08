#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"
  git config user.name "${GITHUB_ACTOR}"
fi

echo "UPGRADING DEPENDENCIES"
yarn upgrade
echo

echo "AUDITING DEPENDENCIES"
yarn audit
echo

echo "COMMITTING CHANGES"
git add yarn.lock '*package.json'
set +e
git commit -m 'build(deps): upgrade dependencies'
RESULT=$?
set -e
echo

if [[ "${RESULT}" != "0" ]]; then
  cat <<EOF
RESULT:
  No dependencies upgraded.

Done.
EOF
  exit 0
fi

echo "LINTING"
yarn lint
echo

echo "BUILDING"
yarn build
echo

echo "TESTING"
yarn test
echo

echo "PUSHING CHANGES"
git push
echo

cat <<EOF
RESULT:
  Dependencies upgraded.

Done.
EOF