# RealChart - 축(Axis)에 대해서 알아보기

## 기본코드

``` html
<html>
<head>
    <title>Home</title>
    <link href="./realchart-style.css" rel="stylesheet">
    <script type="text/javascript" src="./realchart-lic.js"></script>
    <script type="text/javascript" src="./realchart.0.9.43.min.js"></script>
</head>
<body>
    <div id="chart">
    </div>
    <script>
        const config = {
            series: {
                data: [50, 25, 33, 57, 30, 54, 21, 49, 26, 40, 55, 45, 20, 68, 29, 23, 18]
            },
        };

        RealChart.createChart(document, 'chart', config);
    </script>
</body>
</html>
```

## Category

``` html
<html>
...
<body>
    <div id="chart">
    </div>
    <script>
        const config = {
            xAxis: {
                type: 'category', // categories가 선언되면 생략해도 자동으로 적용된다.
                categories: [
                    '서울', '부산', '대구', '인천', '광주', '대전', '울산',
                    '경기', '강원', '충북', '충남', '전북', '전남', '세종',
                    '경북', '경남', '제주'
                ],
            },
            series: {
                data: [50, 25, 33, 57, 30, 54, 21, 49, 26, 40, 55, 45, 20, 68, 29, 23, 18]
            },
        };

        RealChart.createChart(document, 'chart', config);
    </script>
</body>
</html>
```

## type

축의 타입 종류는 다음과 같다.
* log
* time
* linear
* category

``` html
<html>
...
<body>
    <div id="chart">
    </div>
    <script>
        const config = {
            ...
            yAxis: {
                type: 'log'
            },
            series: {
                data: [50, 25, 33, 57, 30, 54, 21, 49, 26, 40, 55, 45, 20, 68, 29, 23, 18]
            },
        };

        RealChart.createChart(document, 'chart', config);
    </script>
</body>
</html>
```

## tick

``` html
<html>
...
<body>
    <div id="chart">
    </div>
    <script>
        const config = {
            ...
            xAxis: {
                ...
                tick: {
                    visible: true,
                    length: 20,
                    style: {
                        stroke: 'red',
                        strokeWidth: '3px'
                    }
                },
            },
            yAxis: {
                tick: {
                    visible: true,
                    stepInterval: 10,
                    style: {
                        stroke: 'red',
                        strokeWidth: '3px'
                    }
                }
            },
            series: {
                data: [50, 25, 33, 57, 30, 54, 21, 49, 26, 40, 55, 45, 20, 68, 29, 23, 18]
            },
        };

        RealChart.createChart(document, 'chart', config);
    </script>
</body>
</html>
```

## label

``` html
<html>
...
<body>
    <div id="chart">
    </div>
    <script>
        const config = {
            ...
            xAxis: {
                ...
                label: {
                    rotation: 45,
                    style: {
                        fill: 'var(--color-0)',
                        fontWeight: 700,
                    }
                },
            },
            series: {
                data: [50, 25, 33, 57, 30, 54, 21, 49, 26, 40, 55, 45, 20, 68, 29, 23, 18]
            },
        };

        RealChart.createChart(document, 'chart', config);
    </script>
</body>
</html>
```

## 기타

### title

### grid

### reversed