# S3를 이용해서 정적 웹 호스팅 시작하기


## 장점

* **저렴한 비용**: Amazon S3는 비용이 매우 저렴합니다. 요금은 데이터 저장과 데이터 전송에 따라 결정됩니다. 또한 Amazon S3의 무료 계층을 사용하면 매우 저렴한 비용으로 시작할 수 있습니다.
* **높은 확장성**: Amazon S3는 높은 확장성을 제공합니다. 서버의 하드웨어를 업그레이드할 필요 없이 사용량이 증가해도 쉽게 확장할 수 있습니다.
* **높은 가용성**: Amazon S3는 높은 가용성을 제공하며, 전 세계 어디에서나 콘텐츠에 접근할 수 있습니다. 이는 사용자가 콘텐츠를 빠르게 로드할 수 있도록 보장합니다.


## 실습

<iframe width="800" height="450" src="https://www.youtube.com/embed/QdiQ2aVXGmU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 읽기 권한 설정

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::static-web-20230219/*"
        }
    ]
}
```
