#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"
  git config user.name "${GITHUB_ACTOR}"
fi

echo "INSTALLING DEPENDENCIES"
npm ci
echo

echo "UPGRADING MINOR DEPENDENCIES"
npx ncu --target minor --upgrade
npm install
git add package-lock.json package.json
if ! git diff --quiet --cached --exit-code; then
  git commit -m 'build(deps): upgrade minor dependencies'
fi
echo

echo "UPGRADING TRANSITIVE DEPENDENCIES"
npm upgrade
npm install
git add package-lock.json package.json
if ! git diff --quiet --cached --exit-code; then
  git commit -m 'build(deps): upgrade transitive dependencies'
fi
echo

if test "${INPUT_UPGRADELEVEL}" = "major"; then
  echo "UPGRADING MAJOR DEPENDENCIES"
  npx ncu --target major --upgrade
else
  echo "CHECKING MAJOR DEPENDENCIES"
  npx ncu --target major
fi
echo

if git diff --quiet --exit-code master origin/master; then
  cat <<EOF
RESULT:
  No dependencies upgraded.

Done.
EOF
  exit 0
fi

echo "AUDITING DEPENDENCIES"
npm audit --audit-level=critical
echo

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
