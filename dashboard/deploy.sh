#!/bin/bash

aws s3 mv ./dist/assets/ s3://$S3_BUCKET/assets/ \
  --cache-control max-age=1800,public \
  --acl public-read \
  --recursive

aws s3 mv ./dist/ s3://$S3_BUCKET \
  --cache-control max-age=0,no-cache \
  --recursive \
  --exclude "assets" \
  --acl public-read
