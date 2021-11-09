#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"
  git config user.name "${GITHUB_ACTOR}"
fi

echo "UPGRADING DEPENDENCIES"
npm ci
npx ncu --target minor --upgrade
npm install
npm upgrade
npm install
echo

echo "AUDITING DEPENDENCIES"
npm audit
echo

echo "COMMITTING CHANGES"
git add package-lock.json package.json
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
npm run lint
echo

echo "BUILDING"
npm run build
echo

echo "TESTING"
npm test
echo

echo "PUSHING CHANGES"
git push
echo

cat <<EOF
RESULT:
  Dependencies upgraded.

Done.
EOF
