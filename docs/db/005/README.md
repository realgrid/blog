# 쇼핑몰 주문관리 시스템 구축하기 #2


## PK 결정

``` mermaid
erDiagram
    Customers {
        int id PK
    }

    Orders {
        int id PK
    }

    ShippingAddress {
        int id PK
    }

    OrderItems {
        int id PK
    }

    Cart {
        int id PK
    }

    Products {
        int id PK
    }
```


## PK 선정의 다양한 방법과 그 특성

### 자동 순번 (Auto-Incrementing Key)

#### 정의
- 데이터베이스에서 자동으로 증가하는 순번으로, 주로 숫자 형식입니다.

#### 장점
- 간단하고 쉬운 관리: 새로운 레코드가 추가될 때마다 데이터베이스 시스템이 자동으로 값을 할당합니다.
- 중복 위험 없음: 시스템이 자동으로 값을 관리하기 때문에 유일성이 보장됩니다.

#### 단점
- 의미 없는 값: 이 키는 단순히 유일성을 보장하기 위한 목적이므로, 비즈니스 로직에서 의미를 가지지 않습니다.
- 순차적 증가로 인한 보안 이슈: 순차적인 값은 예측이 가능하므로, 보안에 취약할 수 있습니다.

### 단일키 (Single Key)

#### 정의
- 하나의 속성 또는 열을 기본 키로 사용하는 것입니다.

#### 장점
- 단순성: 하나의 속성만 관리하면 되므로, 복잡성이 적습니다.
- 쿼리 성능: 하나의 열만 인덱싱하므로, 쿼리 성능이 좋을 수 있습니다.

#### 단점
- 유일성 확보의 어려움: 하나의 열로 유일성을 확보하기 어려울 수 있습니다.
- 변경 가능성: 비즈니스 요구사항의 변화로 인해 단일키가 변경될 수 있습니다.

### 복합키 (Composite Key)

#### 정의
- 두 개 이상의 속성 또는 열을 결합하여 기본 키로 사용하는 것입니다.

#### 장점
- 유일성 확보: 단일키만으로는 유일성을 보장하기 어려운 경우, 여러 열의 조합으로 유일성을 확보할 수 있습니다.

#### 단점
- 복잡성: 여러 열을 관리해야 하므로, 복잡성이 증가합니다.
- 쿼리 성능: 여러 열에 대한 인덱싱으로 인해 쿼리 성능이 단일키에 비해 떨어질 수 있습니다.


## 관계 찾기

###  Customers

``` mermaid
erDiagram
    Customers ||--o{ Orders : places
    Customers ||--o{ ShippingAddress : has
    Customers ||--o{ Cart : owns

    Customers {
        int id PK
    }

    Orders {
        int id PK
        int customerId FK
    }

    ShippingAddress {
        int id PK
        int customerId FK
    }

    Cart {
        int id PK
        int customerId FK
    }
```

### Orders

``` mermaid
erDiagram
    Orders ||--o| ShippingAddress : uses
    Orders ||--o{ OrderItems : contains

    Orders {
        int id PK
    }

    ShippingAddress {
        int id PK
        int orderId FK
    }

    OrderItems {
        int id PK
        int orderId FK
    }

    Cart {
        int id PK
    }
```
* 주문 버튼을 클릭하면 Cart에서 선택된 상품만 OrderItems로 옮겨집니다. 따라서 Orders와 Cart는 직접적인 연관은 없습니다.

### Products

``` mermaid
erDiagram
    Products ||--o{ Cart : listed_in
    Products ||--o{ OrderItems : has

    Products {
        int id PK
    }

    OrderItems {
        int id PK
        int productId FK
    }

    Cart {
        int id PK
        int productId FK
    }
```

### 결과

``` mermaid
erDiagram
    Customers ||--o{ Orders : places
    Customers ||--o{ ShippingAddress : has
    Customers ||--o{ Cart : owns
    Orders ||--o| ShippingAddress : uses
    Orders ||--o{ OrderItems : contains
    Products ||--o{ Cart : listed_in
    Products ||--o{ OrderItems : has

    Customers {
        int id PK
    }

    Orders {
        int id PK
        int customerId FK
    }

    ShippingAddress {
        int id PK
        int customerId FK
        int orderId FK
    }

    Cart {
        int id PK
        int customerId FK
        int productId FK
    }

    OrderItems {
        int id PK
        int orderId FK
        int productId FK
    }

    Products {
        int id PK
    }
```
