# 깃헙을 이용해서 S3에 웹 자동 배포하기


## 실습

<iframe width="800" height="450" src="https://www.youtube.com/embed/bvV_-DTt5dI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 깃헙 새로운 레파지토리 생성

### Actions에 워크 플로우 추가하기

``` yml
name: Example workflow for S3 Deploy
on:
  push:
    branches:
      - main
jobs:
  run:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    steps:
        - uses: actions/checkout@v3

        - name: Install dependencies
          run: npm install

        - name: Build
          run: npm run build

        - name: Deploy
          uses: reggionick/s3-deploy@v3
          with:
            folder: build
            bucket: ${{ secrets.bucket }}
            bucket-region: ${{ secrets.region }}
            dist-id: ${{ secrets.id }}
            invalidation: /
            delete-removed: true
            no-cache: true
            private: true
```