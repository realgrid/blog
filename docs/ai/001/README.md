# ChatGPT가 모르는 것을 ChatGPT에게 물어보기

## 실습방법

### 파이썬 설치 과정

1. 파이썬 3 버전 설치
2. pip install requests numpy nltk
   * 또는 pip3 install requests numpy nltk
4. OpenAI 웹사이트에서 API 키 발급
  * ChatGPT API를 이용한 프로젝트 전체 코드 분석 (OpenAI Key를 가져오는 방법에 대한 설명이 있습니다)
    * [https://youtu.be/e3eX5cCsPn0?si=qKDkHp3lMhQq5xZW](https://youtu.be/e3eX5cCsPn0?si=qKDkHp3lMhQq5xZW)

### 소스 코드 가져오기

깃헙에서 아래의 코드를 가져옵니다.

* [https://github.com/ryujt/openai-embeddings](https://github.com/ryujt/openai-embeddings)

### Embedding 데이터 생성

* emb_save.py 파일 오픈
  * API_KEY: OpenAI에서 받은 API 키를 입력
  * FOLDER_PATH: 분석하고 싶은 소스 코드가 있는 폴더 경로를 지정
  * EXTENSIONS: 분석할 파일의 확장자 입력
* emb_save.py 파일 실행

### 제공된 자료를 토대로 질문하기

* emb_ask.py 파일 오픈
  * API_KEY: OpenAI에서 받은 API 키를 입력
  * user_input 변수에 원하는 질문을 입력합니다.
* emb_ask.py 파일 실행
