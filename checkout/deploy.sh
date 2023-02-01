#!/bin/bash

aws s3 mv ./dist/public/assets/ s3://$S3_BUCKET/assets/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --recursive

aws s3 mv ./dist/public/ s3://$S3_BUCKET \
  --cache-control max-age=0,no-cache \
  --recursive \
  --exclude "assets" \
  --acl public-read
