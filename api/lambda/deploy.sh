#!/bin/bash

set -o errexit
set -o pipefail

deploy() {
  export stage=$1
  make secrets
  make zappa cmd=update
  make zappa cmd=manage options=migrate
  make zappa cmd=manage options="'collectstatic --noinput'"
}

coverage_report() {
  LATEST_VERSION="$(curl -Ls https://artifacts.codacy.com/bin/codacy-coverage-reporter/latest)"
  curl -Ls -o codacy-coverage-reporter "https://artifacts.codacy.com/bin/codacy-coverage-reporter/${LATEST_VERSION}/codacy-coverage-reporter-linux"
  chmod +x codacy-coverage-reporter
  ./codacy-coverage-reporter report -r coverage.xml --commit-uuid "$CODEBUILD_RESOLVED_SOURCE_VERSION"
}

if [ "$CODEBUILD_BUILD_SUCCEEDING" = "1" ]; then
  case ${CODEBUILD_WEBHOOK_TRIGGER##*/} in
    dev)
      coverage_report
      deploy dev
      ;;
    main)
      deploy prod
      make zappa cmd=update stage=sandbox
      ;;
  esac
fi
