# AWS CLI를 이용한 람다 배포 및 업데이트


## 준비 사항
* AWS CLI 설치
* AWS 엑세스키 및 시크릿키 설정


## 배포

```
zip function.zip index.js

AWS_PAGER="" aws lambda create-function --function-name test01 \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs16.x \
--architectures arm64 \
--role YOUR_IAM_ROLE_ARN

rm function.zip
```


## 업데이트

```
zip function.zip index.js

AWS_PAGER="" aws lambda update-function-code --function-name test01 \
--zip-file fileb://function.zip

rm function.zip
```


## 삭제

```
AWS_PAGER="" aws lambda delete-function --function-name test01
```


## 여러 개의 람다 함수를 동시에 처리하기

### deploy.sh

```
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
```

### update.sh

```
#!/bin/bash

for dir in $(find . -maxdepth 1 -type d ! -name 'lib' ! -name '.' ! -name '.vscode' ! -name '.git')
do
    # extract the directory name for the function
    function_name="$(basename $dir)"

    cd $dir

    # 필요한 경우에만
    # npm install

    zip -r archive.zip ../lib ./
    AWS_PAGER="" aws lambda update-function-code --region ap-northeast-2 --function-name $function_name --zip-file fileb://archive.zip --no-paginate
    rm archive.zip
    cd ..
done
```