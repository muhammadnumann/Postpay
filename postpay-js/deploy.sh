#!/bin/bash

VERSION=${VERSION:-v1}

aws s3 cp ./static s3://$S3_BUCKET \
  --cache-control max-age=1800,public \
  --acl public-read \
  --recursive

aws s3 cp ./dist/postpay.js s3://$S3_BUCKET/$VERSION/js/postpay.js \
  --cache-control max-age=1800,stale-while-revalidate=259200,public \
  --acl public-read

aws s3 cp ./dist/postpay.js s3://$S3_BUCKET/$VERSION/js/postpay.min.js \
  --cache-control max-age=1800,stale-while-revalidate=259200,public \
  --acl public-read

aws cloudfront create-invalidation \
    --distribution-id=$DISTRIBUTION_ID \
    --paths /$VERSION/js/postpay.js

aws cloudfront create-invalidation \
    --distribution-id=$DISTRIBUTION_ID \
    --paths /$VERSION/js/postpay.min.js
