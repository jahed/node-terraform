#!/usr/bin/env bash
set -eo pipefail

VERSION_PARTS=($(cat package.json | jq -r '.version' | cut -d'-' -f1 | tr '.' '\n'))

MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

NEXT_PATCH="${MAJOR}.${MINOR}.$((PATCH+1))"
NEXT_MINOR="${MAJOR}.$((MINOR+1)).0"
NEXT_MAJOR="$((MAJOR+1)).0.0"

git config user.email "jahed.public+ci@gmail.com"
git config user.name "${GITHUB_ACTOR}"

for version in $NEXT_PATCH $NEXT_MINOR $NEXT_MAJOR; do
  echo "Attempting Terraform v${version}"

  set +e
  yarn version --new-version "${version}"
  RESULT=$?
  set -e

  if [[ "${RESULT}" == "0" ]]; then
    echo "Terraform v${version} succeeded"
    git remote set-url --push origin "https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}"
    git push --follow-tags origin HEAD:master
    exit 0
  fi

  echo "Terraform v${version} failed"
  git tag --delete "v${version}"
  git reset HEAD~1
  git checkout .
done

echo "No new Terraform releases found."
exit 0
