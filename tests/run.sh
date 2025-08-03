#!/usr/bin/env bash
set -euo pipefail

function get_version_line {
  x_terraform --version | fgrep 'Terraform v' | head -n1
}

function run_tests {
  source "./tests/variants/${1}.sh"

  echo
  echo "[${1}] SETTING UP TEST PROJECT"
  local project_dir="$(mktemp --tmpdir -d node-terraform-test-XXXX)"
  cp -r ./tests/fixtures/. "${project_dir}"
  cp ./artifacts/package.tgz "${project_dir}"
  echo "[${1}] Created: ${project_dir}"
  pushd "${project_dir}"

  echo
  echo "[${1}] TEST: Executes existing Terraform"
  x_install
  local result=$(get_version_line)
  if [[ "${result}" != "Terraform v${expected_version}" ]]; then
    echo "[${1}] Test failed."
    exit 1
  fi

  echo
  echo "[${1}] TEST: Forwards exit codes"
  set +e
  x_terraform --bad-arg > /dev/null 2>&1
  local result=$?
  set -e
  if [[ "${result}" != "127" ]]; then
    echo "[${1}] Test failed."
    exit 1
  fi

  echo
  echo "[${1}] TEST: Reinstalls Terraform with correct version"
  rm -rf ./node_modules/.cache
  x_install
  local result=$(get_version_line)
  if [[ "${result}" != "Terraform v${expected_version}" ]]; then
    echo "[${1}] Test failed."
    exit 1
  fi

  popd
  rm -rf "${project_dir}"

  echo
  echo "[${1}] Tests passed."
}

expected_version="$(cat package.json | jq -r '.version' | cut -d'-' -f1)"

variants="${@:-"npm"}"

for variant in ${variants}; do
  run_tests "${variant}"
done

echo
echo "All tests passed."
