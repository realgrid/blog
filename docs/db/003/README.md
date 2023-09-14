# 쇼핑몰 주문관리 시스템 구축하기 #1


## 요구사항

### 개요

쇼핑몰의 주문을 효율적으로 관리하고 추적하기 위한 주문관리 프로그램을 개발합니다.
이 프로그램은 주문 접수부터 배송 및 결제 상태 확인, 고객 문의 관리까지 모든 주문 관련 프로세스를 중앙에서 관리할 수 있어야 합니다.

### 주요 기능 및 요구사항

#### 주문 관리
- **주문 접수**: 고객이 주문한 상품 정보, 수량, 배송 주소, 결제 방법 등의 주문 정보를 입력 및 저장합니다.
- **주문 상태 변경**: 주문 상태(주문 접수, 결제 완료, 상품 준비 중, 배송 중, 배송 완료 등)를 변경 및 확인할 수 있어야 합니다.
- **주문 검색 및 필터**: 주문 번호, 고객 이름, 주문 날짜 등 다양한 조건으로 주문을 검색하고 필터링할 수 있어야 합니다.

#### 재고 관리
- **재고 조회**: 상품별 재고 수량을 실시간으로 확인할 수 있어야 합니다.
- **재고 경고**: 재고 수량이 특정 수치 이하로 떨어질 경우 알림 기능이 있어야 합니다.

#### 배송 관리
- **배송 업체 선택**: 주문 상품에 따라 다른 배송 업체를 선택할 수 있어야 합니다.
- **배송 추적**: 배송 업체와 연동하여 실시간 배송 상태를 확인할 수 있어야 합니다.
- **배송 문의 관리**: 고객의 배송 관련 문의사항을 관리하고, 필요한 경우 배송 업체에 문의할 수 있어야 합니다.

#### 결제 관리
- **다양한 결제 방법 지원**: 신용카드, 실시간 계좌이체, 휴대폰 결제 등 다양한 결제 방법을 지원해야 합니다.
- **환불 처리**: 고객의 환불 요청 시, 환불 절차를 관리하고 환불 상태를 확인할 수 있어야 합니다.

#### 고객 관리
- **고객 정보 조회**: 고객의 주문 이력, 문의 이력, 결제 이력 등을 조회할 수 있어야 합니다.
- **고객 문의 관리**: 고객의 상품 및 주문 관련 문의사항을 관리하고, 담당자가 답변할 수 있어야 합니다.

#### 보안 및 접근 제어
- **다중 사용자 지원**: 여러 직원이 동시에 시스템을 사용할 수 있어야 합니다.
- **권한 관리**: 직원별로 접근 권한을 설정하여 특정 기능에 대한 접근을 제한할 수 있어야 합니다.

### 사용자 인터페이스 요구사항
- **대시보드**: 주요 주문 및 배송 상태, 재고 상태, 최근 문의사항 등을 한 눈에 볼 수 있는 대시보드가 필요합니다.
- **반응형 디자인**: 다양한 디바이스(데스크톱, 태블릿, 모바일)에서 사용할 수 있어야 합니다.
- **통계 및 보고서**: 주문량, 매출, 인기 상품 등 다양한 통계와 보고서를 생성할 수 있어야 합니다.


## 요구사항에서부터 도출한 테이블 목록

- **Orders**
- **Customers**
- **Products**
- **OrderDetails**
- **Shipping**
- **Payment**
- **Inquiries**
- **ShippingCompanies**
- **Admins**
- **Dashboard** (요약 및 캐싱)
- **Reports**


## 기능 목록

```
쇼핑몰 주문관리 프로그램
|
|-- 주문 관리
|   |-- 주문 생성 (POST /orders)
|   |-- 주문 조회 (GET /orders/{orderId})
|   |-- 주문 상태 변경 (PUT /orders/{orderId}/status)
|   |-- 주문 검색 및 필터 (GET /orders?search=...)
|
|-- 재고 관리
|   |-- 재고 조회 (GET /products/{productId}/inventory)
|   |-- 재고 업데이트 (PUT /products/{productId}/inventory)
|   |-- 재고 경고 알림 (GET /inventory/alerts)
|
|-- 배송 관리
|   |-- 배송 업체 선택 (POST /shipping/companies)
|   |-- 배송 상태 조회 (GET /shipping/{shippingId}/status)
|   |-- 배송 문의 관리 (GET, POST, PUT /shipping/inquiries)
|
|-- 결제 관리
|   |-- 결제 방법 추가 (POST /payments/methods)
|   |-- 결제 실행 (POST /payments)
|   |-- 환불 요청 (POST /payments/{paymentId}/refund)
|   |-- 환불 상태 확인 (GET /payments/{paymentId}/refund/status)
|
|-- 고객 관리
|   |-- 고객 정보 조회 (GET /customers/{customerId})
|   |-- 고객 주문 이력 조회 (GET /customers/{customerId}/orders)
|   |-- 고객 문의 관리 (GET, POST, PUT /customers/{customerId}/inquiries)
|
|-- 사용자 및 권한 관리
|   |-- 사용자 등록 (POST /users)
|   |-- 사용자 로그인 (POST /users/login)
|   |-- 사용자 권한 설정 (PUT /users/{userId}/permissions)
|
|-- 대시보드
|   |-- 주요 상태 요약 조회 (GET /dashboard/overview)
|
|-- 통계 및 보고서
|   |-- 통계 데이터 조회 (GET /reports/statistics)
|   |-- 보고서 생성 (POST /reports)
|   |-- 보고서 조회 (GET /reports/{reportId})
```

## 엔티티-테이블 매핑

### 요구사항으로부터 정리된 것

| Process             | Table             | CRUD |
| ------------------- | ----------------- | ---- |
| 주문 생성           | Orders            | C    |
| 주문 조회           | Orders            | R    |
| 주문 상태 변경      | Orders            | U    |
| 주문 검색 및 필터   | Orders            | R    |
| 재고 조회           | Products          | R    |
| 재고 업데이트       | Products          | U    |
| 재고 경고 알림      | Products          | R    |
| 배송 업체 선택      | ShippingCompanies | C    |
| 배송 상태 조회      | Shipping          | R    |
| 배송 문의 관리      | Inquiries         | CRUD |
| 결제 방법 추가      | PaymentMethods    | C    |
| 결제 실행           | Payments          | C    |
| 환불 요청           | Payments          | U    |
| 환불 상태 확인      | Payments          | R    |
| 고객 정보 조회      | Customers         | R    |
| 고객 주문 이력 조회 | Orders            | R    |
| 고객 문의 관리      | Inquiries         | CRUD |
| 사용자 등록         | Users             | C    |
| 사용자 로그인       | Users             | R    |
| 사용자 권한 설정    | Users             | U    |
| 주요 상태 요약 조회 | Dashboard         | R    |
| 통계 데이터 조회    | Reports           | R    |
| 보고서 생성         | Reports           | C    |
| 보고서 조회         | Reports           | R    |

### 매핑 세분화

#### 주문생성 프로세스의 예

| Process  | Table             | CRUD |
| -------- | ----------------- | ---- |
| 주문생성 | Orders            | C    |
|          | Customers         | R    |
|          | Products          | R    |
|          | ProductDetails    | R    |
|          | PaymentMethods    | R    |
|          | ShippingCompanies | R    |
|          | Coupons           | CR   |
|          | Discounts         | CR   |
|          | BillingAddress    | CRU  |
|          | ShippingAddress   | CRU  |
|          | OrderItems        | C    |
|          | Cart              | R    |
|          | Stock             | R    |
|          | Reviews           | R    |
|          | Recommendations   | R    |
|          | Tax               | R    |
|          | Promotions        | R    |
|          | ReturnPolicy      | R    |
|          | GiftCards         | CR   |
|          | LoyaltyPoints     | CR   |


## 엔티티 속성 도출

1. **Orders**:
    - **목적**: 고객이 쇼핑몰에서 주문한 모든 정보를 저장합니다.
    - **포함하는 정보**:
        - `OrderID`: 각 주문의 고유 식별자.
        - `CustomerID`: 주문을 한 고객의 식별자.
        - `OrderDate`: 주문이 생성된 날짜와 시간.
        - `ShippingAddress`: 배송 주소.
        - `PaymentMethod`: 결제 방법.
        - `TotalAmount`: 총 주문 금액.
        - `OrderStatus`: 주문 상태 (예: 주문 접수, 결제 완료 등).
2. **OrderItems**:
    - **목적**: 고객의 주문에 포함된 각 상품의 상세 정보를 저장합니다.
    - **포함하는 정보**:
        - `OrderItemID`: 주문 항목의 고유 식별자.
        - `OrderID`: 어떤 주문에 속한 항목인지를 나타내는 주문의 식별자.
        - `ProductID`: 주문된 상품의 식별자.
        - `Quantity`: 주문된 상품의 수량.
        - `Price`: 주문 시점의 상품 가격.
        - `Subtotal`: 해당 항목에 대한 총 가격 (가격 × 수량).
3. **Customers**:
    - **목적**: 쇼핑몰의 고객 정보를 저장합니다.
    - **포함하는 정보**:
        - `CustomerID`: 각 고객의 고유 식별자.
        - `Name`: 고객 이름.
        - `Email`: 고객 이메일 주소.
        - `Phone`: 고객 전화번호.
        - `RegisteredDate`: 고객이 회원 가입한 날짜.
4. **Products**:
    - **목적**: 쇼핑몰에서 판매하는 모든 상품의 정보를 저장합니다.
    - **포함하는 정보**:
        - `ProductID`: 각 상품의 고유 식별자.
        - `ProductName`: 상품 이름.
        - `Description`: 상품에 대한 설명.
        - `Price`: 상품 가격.
        - `StockQuantity`: 현재 재고량.
        - `Category`: 상품의 분류나 카테고리.
        - `ProductImage`: 상품 이미지.
5. **Shipping**:
    - **목적**: 주문된 상품의 배송 정보를 저장합니다.
    - **포함하는 정보**:
        - `ShippingID`: 각 배송의 고유 식별자.
        - `OrderID`: 어떤 주문의 배송인지 나타내는 주문의 식별자.
        - `ShippingCompany`: 배송 업체 정보.
        - `TrackingNumber`: 배송 추적 번호.
        - `ShippingStatus`: 배송 상태 (예: 배송 준비 중, 배송 중, 배송 완료).
6. **Payment**:
    - **목적**: 주문에 대한 결제 정보를 저장합니다.
    - **포함하는 정보**:
        - `PaymentID`: 각 결제의 고유 식별자.
        - `OrderID`: 어떤 주문의 결제인지 나타내는 주문의 식별자.
        - `PaymentMethod`: 결제 방법 (예: 신용카드, 실시간 계좌이체 등).
        - `PaymentStatus`: 결제 상태 (예: 결제 대기, 결제 완료, 환불
