#!/usr/bin/env bash
set -euo pipefail

if [[ "${CI-}" == "true" ]]; then
  git config user.email "${GIT_EMAIL}"
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

echo "CHECKING MAJOR DEPENDENCIES"
npx ncu --target latest
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
