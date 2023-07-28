#!/bin/bash

for dir in $(find . -maxdepth 1 -type d ! -name 'lib' ! -name '.' ! -name '.vscode' ! -name '.git')
do
    # extract the directory name for the function
    function_name="$(basename $dir)"

    cd $dir

    # 필요한 경우에만
    # npm install

    zip -r archive.zip ../lib ./
    AWS_PAGER="" aws lambda create-function --region ap-northeast-2 --function-name $function_name --zip-file fileb://archive.zip --handler index.handler --runtime nodejs16.x --role YOUR_IAM_ROLE_ARN --architectures arm64 --no-paginate
    rm archive.zip
    cd ..
done