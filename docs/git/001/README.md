# Github에 여러 계정의 SSH 키 설정하기


## 계정이 하나 일 때 SSH 키 등록

![](./pic-001.png)


## 계정이 하나 이상일 때 SSH 키 등록

### 파일 이름을 지정해서 SSH 키 생성하기

```
ssh-keygen -t rsa -C "이메일" -f "파일 이름"
```

### 새로운 계정 생성의 예

```
ssh-keygen -t rsa -C "hicast@gmail.com" -f "id_rsa_hicast"
```

![](./pic-002.png)


## config 파일 설정

```
Host github.com-hicast
    HostName github.com
    User HiCast
    IdentityFile ~/.ssh/id_rsa_hicast

```
