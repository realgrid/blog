# ChatGPT API를 이용한 프로젝트 전체 코드 분석


## 코드 복사

``` python
import os
import requests
import tiktoken

# GPT-3.5-turbo API 설정
API_URL = "https://api.openai.com/v1/chat/completions"
API_KEY = "your-key"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

GPT_MODEL = "gpt-3.5-turbo"
TOKEN_LIMIT_RATIO = 0.8
TOKEN_LIMIT = 4096
TOKEN_THRESHOLD = int(TOKEN_LIMIT * TOKEN_LIMIT_RATIO)

tokenizer = tiktoken.get_encoding("p50k_base")

def count_tokens(text):
    try:
        return len(tokenizer.encode(text))
    except Exception as e:
        print(f"에러: {e}")
        return 0

def split_into_parts(content):
    lines = content.split('\n')
    parts = []
    part = ""
    for line in lines:
        if count_tokens(part + line) > TOKEN_THRESHOLD:
            parts.append(part)
            part = line + '\n'
        else:
            part += line + '\n'
    parts.append(part)
    return parts

def analyze_code(requirement, code):
    payload = {
        "model": GPT_MODEL,
        "temperature": 0.7,
        "messages": [
            {
                "role": "user",
                "content": f"{requirement}: \n```\n{code}\n```"
            }
        ]
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code != 200:
        print(f"API 요청 실패: HTTP 상태 코드 {response.status_code}")
        print(f"응답 내용: {response.text}")
        return None

    try:
        response_data = response.json()
    except ValueError:
        print("응답이 JSON 형식이 아닙니다.")
        return None

    return response_data['choices'][0]['message']['content'].strip()

current_folder = os.path.dirname(os.path.abspath(__file__))

def write_markdown_report(file_path, file_relative_path, parts_analysis, mode='a'):
    with open(file_path, mode, encoding='utf-8') as md_file:
        for part_number, analysis in parts_analysis.items():
            if len(parts_analysis) == 1:
                md_file.write(f"### {file_relative_path}\n")
            else:
                md_file.write(f"### {file_relative_path} - part {part_number}\n")
            md_file.write(f"\n{analysis}\n\n")

def process_large_files(directory, file_ext, requirement):
    report_file_path = os.path.join(current_folder, "report.md")
    if os.path.exists(report_file_path):
        os.remove(report_file_path)

    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if not file_name.endswith(file_ext):
                continue

            print("* " + file_name)

            file_path = os.path.join(root, file_name)
            file_relative_path = os.path.relpath(file_path, start=directory)

            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file_content:
                content = file_content.read()

            parts = split_into_parts(content)
            parts_analysis = {}
            for i, part in enumerate(parts, start=1):
                analysis = analyze_code(requirement, part)
                if analysis:
                    parts_analysis[str(i)] = analysis

            write_markdown_report(report_file_path, file_relative_path, parts_analysis)

folder_path = "D:/Projects/lib/ryulib-cpp"
file_ext = ".hpp"
requirement = "메모리 누수의 위험성이 있는 코드를 찾아서 알려줘."
# requirement = "코드를 리팩토링 대상을 찾아줘."
process_large_files(folder_path, file_ext, requirement)
```


## OpenAI 키 가져오기

* [https://openai.com/](https://openai.com/) 접속
* 로그인 후 [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) 페이지로 이동
* `Create new secret key` 버튼을 클릭
* 키에 대한 이름을 입력하고 다시 `Create new secret key` 버튼을 클릭
* 복사 버튼을 클릭해서 키 값을 복사하시고 코드의 API_KEY 키에 붙여 넣으세요.

## 실행방법

### Python 설치

제시된 파이썬 코드는 python 3.x 버전에서 테스트 되었습니다.

### tiktoken 모듈 설치

ChatGPT의 토큰 제한수를 미리 계산해서 이보다 긴 파일은 여러 파트로 조각을 내서 처리합니다.
이 때문에 토큰 개수를 계산하는 tiktoken 라이브러리가 필요합니다.

```
pip install tiktoken
```

### 프로그램 실행

아래 세 개의 변수를 자신의 프로젝트에 맞는 것으로 변경해주세요.

``` python
folder_path = "D:\Projects\Personal\ecam"
file_ext = ".pas"
requirement = "메모리 누수의 위험성이 있는 코드를 찾아서 알려줘."
```

이후 파이선 코드를 실행해주시면 같은 폴더에 report.md 파일로 요구사항에 맞는 보고서가 작성됩니다.

```
$ python main.py
```
