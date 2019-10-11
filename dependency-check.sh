#!/usr/bin/env bash
set -eo pipefail

yarn upgrade --latest
yarn test
git add yarn.lock '*package.json'
git commit -m 'build(deps): upgrade dependencies'
git remote set-url --push origin "https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}"
git push
