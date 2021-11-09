#!/usr/bin/env bash
set -eo pipefail

if [[ "${CI}" == "true" ]]; then
  git config user.email "jahed.public+ci@gmail.com"
  git config user.name "${GITHUB_ACTOR}"
fi

START_SHA="$(git rev-parse HEAD)"

VERSION_PARTS=($(cat package.json | jq -r '.version' | cut -d'-' -f1 | tr '.' '\n'))
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

NEXT_PATCH="${MAJOR}.${MINOR}.$((PATCH+1))"
NEXT_MINOR="${MAJOR}.$((MINOR+1)).0"
NEXT_MAJOR="$((MAJOR+1)).0.0"

for version in $NEXT_PATCH $NEXT_MINOR $NEXT_MAJOR; do
  echo "ATTEMPTING VERSION BUMP"
  echo "  New Version: v${version}"
  set +e
  npm version "${version}"
  RESULT=$?
  set -e
  echo

  if [[ "${RESULT}" == "0" ]]; then
    echo "PUSHING CHANGES"
    git push --follow-tags
    echo

    cat <<EOF
RESULT:
  New Version: ${version}

Done.
EOF
    exit 0
  fi

  echo "REVERTING CHANGES"
  git tag --delete "v${version}" || true
  git reset --hard "${START_SHA}"
  echo
done

cat <<EOF
RESULT:
  No new Terraform releases found.

Done.
EOF
