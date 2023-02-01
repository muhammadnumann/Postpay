#!/bin/bash

mv out/_next .
mv out _out
mkdir -p out/builds/$CODEBUILD_SOURCE_VERSION
mv _out/* out/builds/$CODEBUILD_SOURCE_VERSION
rm -rf _out
mv _next out/

aws s3 cp ./out/_next s3://$S3_BUCKET/_next \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --recursive

aws s3 cp ./static/ s3://$S3_BUCKET/static/ \
  --cache-control immutable,max-age=100000000,public \
  --acl public-read \
  --recursive

aws s3 cp ./out/builds s3://$S3_BUCKET/builds \
  --cache-control max-age=0,no-cache \
  --acl public-read \
  --recursive

(cd out/builds &&
  find . -type f -name '*.html' | while read HTMLFILE; do
    HTMLFILESHORT=${HTMLFILE:2}
    HTMLFILE_WITHOUT_EXT=${HTMLFILESHORT%.html}

    aws s3 cp s3://$S3_BUCKET/builds/$HTMLFILESHORT \
      s3://$S3_BUCKET/builds/$HTMLFILE_WITHOUT_EXT
  done)

aws s3 sync \
  s3://$S3_BUCKET/builds/$CODEBUILD_SOURCE_VERSION \
  s3://$S3_BUCKET/current \
  --delete \
  --cache-control max-age=0,no-cache \
  --acl public-read

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths '/*'
