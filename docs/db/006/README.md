# 쇼핑몰 주문관리 시스템 구축하기 #3


## 엔티티 구성

### Customers 테이블

| 속성명    | 데이터 타입 | 설명                       |
| --------- | ----------- | -------------------------- |
| id        | int         | 고유 식별자 (Primary Key)  |
| username  | varchar     | 사용자 이름                |
| email     | varchar     | 이메일 주소                |
| password  | varchar     | 비밀번호 (암호화된 형태)   |
| createdAt | datetime    | 계정 생성일                |
| updatedAt | datetime    | 마지막으로 업데이트된 일자 |

### Order 테이블

| 속성명            | 데이터 타입 | 설명                           |
| ----------------- | ----------- | ------------------------------ |
| id                | int         | 주문 고유 식별자 (Primary Key) |
| customerId        | int         | 고객 ID (Foreign Key)          |
| shippingAddressId | int         | 배송 주소 ID (Foreign Key)     |
| orderStatus       | string      | 주문 상태                      |
| createdAt         | datetime    | 주문 생성 시간                 |
| deliveryRequest   | string      | 배송 요청사항                  |
| deliveryFee       | float       | 배송비                         |
| cashBack          | float       | 캐시 적립 금액                 |
| paymentMethod     | string      | 결제 방법                      |
| receiptPhone      | string      | 현금영수증 휴대폰 번호         |
| isIncomeDeducted  | boolean     | 소득 공제 여부                 |

### ShippingAddress 테이블

| 속성명       | 데이터 타입 | 설명                      |
| ------------ | ----------- | ------------------------- |
| id           | int         | 고유 식별자 (Primary Key) |
| customerId   | int         | 고객 ID (Foreign Key)     |
| orderId      | int         | 주문 ID (Foreign Key)     |
| receiverName | string      | 받는사람 이름             |
| phoneNumber  | string      | 휴대폰 번호               |
| address      | varchar     | 배송 주소                 |
| postalCode   | varchar     | 우편 번호                 |
| country      | varchar     | 나라                      |
| createdAt    | datetime    | 주소 생성일               |

### Cart 테이블

| 속성명          | 데이터 타입 | 설명                              |
| --------------- | ----------- | --------------------------------- |
| id              | int         | 고유 식별자 (Primary Key)         |
| customerId      | int         | 고객 ID (Foreign Key)             |
| productId       | int         | 제품 ID (Foreign Key)             |
| quantity        | int         | 수량                              |
| isSelected      | boolean     | 제품이 선택되었는지 여부          |
| expectedArrival | datetime    | 예상 도착일                       |
| unitPrice       | float       | 단가                              |
| productName     | string      | 제품 이름                         |
| productImage    | string      | 제품 이미지 URL 또는 데이터       |
| deliveryType    | string      | 배송 타입 (일반구매, 정기배송 등) |

### OrderItems 테이블

| 속성명    | 데이터 타입 | 설명                      |
| --------- | ----------- | ------------------------- |
| id        | int         | 고유 식별자 (Primary Key) |
| orderId   | int         | 주문 ID (Foreign Key)     |
| productId | int         | 제품 ID (Foreign Key)     |
| quantity  | int         | 제품 수량                 |
| price     | float       | 가격                      |

### Products 테이블

| 속성명      | 데이터 타입 | 설명                       |
| ----------- | ----------- | -------------------------- |
| id          | int         | 고유 식별자 (Primary Key)  |
| name        | varchar     | 제품 이름                  |
| description | text        | 제품 설명                  |
| stock       | int         | 재고                       |
| price       | float       | 가격                       |
| createdAt   | datetime    | 제품 생성일                |
| updatedAt   | datetime    | 마지막으로 업데이트된 일자 |


## orderStatus

### 코드로 관리하는 방법

#### 장점:

1. **데이터 일관성**: 숫자나 상수를 사용하면 데이터의 일관성을 더 잘 유지할 수 있습니다.
2. **데이터 크기 절약**: 문자열보다는 숫자나 상수를 사용하는 것이 데이터베이스 공간을 더 효율적으로 사용할 수 있습니다.
3. **빠른 검색 속도**: 코드를 사용하면 데이터 조회 속도가 일반적으로 더 빠릅니다.
4. **국제화 용이**: 상태를 코드로 관리하면 다국어 환경에서의 변환이 쉽습니다. 예를 들어, '1'을 "배송중", "Shipping", "出荷中" 등으로 쉽게 매핑할 수 있습니다.

#### 단점:

1. **가독성 저하**: 코드 자체로는 의미를 바로 알기 어려워, 주석이나 문서가 필요합니다.
2. **유지보수 비용**: 상태가 추가되거나 변경될 때마다, 해당 코드를 이해하고 있는 개발자가 수정해야 하므로 유지보수 비용이 발생할 수 있습니다.

#### 추가: 대응되는 테이블

| 코드 | 설명     |
| ---- | -------- |
| 0    | 주문접수 |
| 1    | 배송중   |
| 2    | 배송완료 |
| 3    | 취소     |
| 4    | 반품     |

이런 식으로 'OrderStatus' 테이블을 따로 만들고, 해당 테이블의 '코드'와 '설명'을 매핑해둘 수 있습니다. 이렇게 하면 'Orders' 테이블의 'orderStatus' 필드는 이 테이블의 '코드'를 참조할 수 있습니다.


### 문자열로 관리하는 방법

#### 장점:

1. **가독성**: 상태가 무엇인지 바로 알 수 있어서 가독성이 좋습니다.
2. **직관적**: 코드를 별도로 확인할 필요가 없으므로, 비개발자나 새로운 개발자에게도 직관적입니다.

#### 단점:

1. **데이터 일관성**: 문자열이므로 오타나 다른 문제로 인해 데이터 일관성을 잃을 위험이 있습니다.
2. **데이터 크기 증가**: 문자열을 사용하면 데이터베이스에 더 많은 공간이 필요합니다.
3. **검색 속도 저하**: 문자열 검색은 일반적으로 코드 검색보다 느립니다.
4. **국제화 어려움**: 다양한 언어로의 변환이 어렵습니다. 예를 들어, "배송중"을 다른 언어로 번역해야 할 경우 문제가 될 수 있습니다.


## 캐시 적립

### CashBackHistory 테이블

| 속성명         | 데이터 타입 | 설명                             |
| -------------- | ----------- | -------------------------------- |
| id             | int         | 고유 식별자 (Primary Key)        |
| customerId     | int         | 고객 ID (Foreign Key)            |
| cashBackAmount | float       | 적립 또는 사용된 캐시백 금액     |
| actionType     | string      | 적립('EARN') 또는 사용('USE')    |
| relatedOrderId | int         | 관련 주문 ID (Foreign Key, 옵션) |
| createdAt      | datetime    | 적립 또는 사용 일자              |
| description    | varchar     | 적립 또는 사용에 대한 설명       |

### Customers 테이블 반정규화

| 속성명     | 데이터 타입 | 설명                       |
| ---------- | ----------- | -------------------------- |
| id         | int         | 고유 식별자 (Primary Key)  |
| username   | varchar     | 사용자 이름                |
| email      | varchar     | 이메일 주소                |
| password   | varchar     | 비밀번호 (암호화된 형태)   |
| created_at | datetime    | 계정 생성일                |
| updated_at | datetime    | 마지막으로 업데이트된 일자 |
| cashBack   | float       | 캐시백 누적 금액           |

`cashBack` 필드가 `Customers` 테이블에 추가됨으로써, 고객 정보를 조회할 때마다 `CashBackHistory` 테이블을 참조하여 캐시백 금액을 계산할 필요가 없어집니다. 이는 특히 빈번한 조회가 발생하는 서비스에서 성능 향상을 가져올 수 있습니다.

#### 장점:

- 쿼리 성능이 향상될 수 있습니다.
- 캐시백 누적 금액을 빠르게 확인할 수 있습니다.
- 서비스 로직이 간단해질 수 있습니다.

#### 단점:

- `CashBackHistory` 테이블과 `Customers` 테이블 사이의 데이터 무결성을 유지하기 어렵습니다.
- 캐시백이 적립되거나 사용될 때, 두 테이블을 모두 업데이트 해야 합니다.
- 데이터가 중복되므로 저장 공간이 더 필요할 수 있습니다.

`cashBack`는 `CashBackHistory`의 데이터를 계산해서 사용할 수 있으나, 이 방법은 실시간으로 누적 금액을 계산해야 하므로 성능 저하를 가져올 수 있습니다. 또한, 누적 금액이 자주 변경될 경우 계산 로직이 복잡해질 수 있습니다. 따라서 반정규화를 통해 이러한 단점을 상쇄할 수 있습니다. 하지만 이것이 반드시 좋은 방법이라고 할 수 없으며, 시스템의 특성과 요구사항에 따라 적절히 판단해야 합니다.
