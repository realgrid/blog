# 비트버킷을 이용해서 S3에 웹 자동 배포하기

<iframe width="800" height="450" src="https://www.youtube.com/embed/oF-GEqGRIDc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## S3 업로드 최소 권한 주기

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
            ],
            "Resource": "arn:aws:s3:::static-web-20230219/*"
        }
    ]
}
```
* s3:PutObject을 통해서 키를 가진 사용자에게 파일을 업로드할 권한만 주게 됩니다.
* Resource에 버킷의 arn을 지정하면 해당 버킷만 사용할 수 있도록 제한 할 수 있습니다.

::: warning
권한을 제한하는 것만으로는 완벽한 방어를 할 수는 없습니다.
엑세스 키가 유출되지 않도록 주의하세요.
:::

## bitbucket-pipelines.yml

### 영상에서 사용한 스크립트

``` yml
image: node:16

pipelines:
  branches:
    master:
      - step:
          name: build and deploy
          caches:
            - node
          script:
            - npm install
            - npm run build
            - pipe: pipe: atlassian/aws-s3-deploy:1.1.0
              variables:
                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
                AWS_DEFAULT_REGION: 'ap-northeast-2'
                S3_BUCKET: 'static-web-20230219'
                LOCAL_PATH: 'dist'
```


### 개발환경과 프로덕션 환경을 분리한 경우

#### bitbucket-pipelines.yml

아래 스크립트를 보시면
develop 브랜치와 master 브랜치를 각각 분리하였습니다.

코드가 푸시되면 배포되는 버킷이 달라지게 됩니다.
이를 통해서 우선 develop에서 내부 테스트 사이트로 자동 배포하고,
충분히 테스트가 되면 master 브랜치로 머지하는 순간
실제 사이트에 자동 배포되도록 할 수가 있게 됩니다.

아래 스크립트에는 클라우드 프론트를 사용하는 것을 가정해서
aws-cloudfront-invalidate 스크립트가 추가되었는데요.
클라우드 프론트를 사용하는 경우에는
기존의 배포된 내용을 캐시를 삭제해야
사용자가 바로 새로 올라온 콘텐츠를 확인할 수 있기 때문입니다.

``` yml
image: node:16

pipelines:
  branches:
    develop:
      - step:
          name: build and deploy
          caches:
            - node
          script:
            - npm install
            - npm run build-dev
            - pipe: pipe: atlassian/aws-s3-deploy:1.1.0
              variables:
                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
                AWS_DEFAULT_REGION: 'ap-northeast-2'
                S3_BUCKET: 'dev.yoursite.com'
                LOCAL_PATH: 'dist'
            - pipe: atlassian/aws-cloudfront-invalidate:0.6.0
              variables:
                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
                AWS_DEFAULT_REGION: 'ap-northeast-2'
                DISTRIBUTION_ID: '사용자의 클라우드 프론트 배포 아이디'
    master:
      - step:
          name: build and deploy
          caches:
            - node
          script:
            - npm install
            - npm run build-prod
            - pipe: pipe: atlassian/aws-s3-deploy:1.1.0
              variables:
                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
                AWS_DEFAULT_REGION: 'ap-northeast-2'
                S3_BUCKET: 'yoursite.com'
                LOCAL_PATH: 'dist'
            - pipe: atlassian/aws-cloudfront-invalidate:0.6.0
              variables:
                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
                AWS_DEFAULT_REGION: 'ap-northeast-2'
                DISTRIBUTION_ID: '사용자의 클라우드 프론트 배포 아이디'
```

#### Vue.js(node.js)의 package.json

배포되는 버킷이 달라지는 것으로는 충분히 개발 환경이 독립적으로 분리될 수 없습니다.
따라서 빌드 스크립트도 개발환경에 따라서 두 개의 스크립트가 필요해집니다.

위의 bitbucket-pipelines.yml 파일에서 develop 브랜치가 푸시되면
"npm run build-dev" 스크립트를 실행하는데 이에 대한 정의는 아래와 같이 추가되어야 합니다.

``` json
{
  "name": "vue.js",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    ...
    "build-dev": "vue-cli-service build --mode dev",
    "build-prod": "vue-cli-service build --mode prod",
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
  }
}
```

####  Vue.js(node.js)의 환경 변수 설정

환경변수를 이용해서 빌드 모드에 따라서 호출하는 api 주소 등을 변경할 수 있도록 준비해주면 마무리 됩니다.

##### dev 환경 (.env.dev)

```
VUE_APP_MODE="DEV"
VUE_APP_HOME="dev.yoursite.com"
VUE_APP_API_BASEURL="https://dev.yoursite.com/api"
...
```

##### prod 환경 (.env.prod)

```
VUE_APP_MODE="PROD"
VUE_APP_HOME="yoursite.com"
VUE_APP_API_BASEURL="https://yoursite.com/api"
...
```