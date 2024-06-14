const groupMaxValues = {
    a01: {
        group: 'a01',
        value: 7781,
        title: '공공행정'
    },
    a02: {
        group: 'a02',
        value: 2955,
        title: '문화관광'
    },
    a03: {
        group: 'a03',
        value: 3074,
        title: '산업고용'
    },
    a04: {
        group: 'a04',
        value: 2733,
        title: '교통물류'
    },
    a05: {
        group: 'a05',
        value: 1758,
        title: '환경기상'
    },
    a06: {
        group: 'a06',
        value: 3883,
        title: '국토관리'
    },
    a07: {
        group: 'a07',
        value: 2256,
        title: '농축수산'
    },
    a08: {
        group: 'a08',
        value: 1672,
        title: '재정금융'
    },
    a09: {
        group: 'a09',
        value: 1681,
        title: '사회복지' 
    },
    a10: {
        group: 'a10',
        value: 3726,
        title: '보건의료'
    },
    a11: {
        group: 'a11',
        value: 2984,
        title: '재난안전'
    },
    a12: {
        group: 'a12',
        value: 1952,
        title: '교육'
    },
    a13: {
        group: 'a13',
        value: 2095,
        title: '식품건강' 
    },
    a14: {
        group: 'a14',
        value: 2064,
        title: '과학기술'
    }
};

const seriesData = [
    {
        id: 'a01',
        name: '공공행정',
        color: '#33A382',
        value: 0
    },
    {
        id: 'a02',
        name: '문화관광',
        color: '#D96BB5',
        value: 0
    },
    {
        id: 'a03',
        name: '산업고용',
        color: '#F16C48',
        value: 0
    },
    {
        id: 'a04',
        name: '교통물류',
        color: '#7573EC',
        value: 0
    },
    {
        id: 'a05',
        name: '환경기상',
        color: '#306ec0',
        value: 0
    },
    {
        id: 'a06',
        name: '국토관리',
        color: '#CF4926',
        value: 0
    },
    {
        id: 'a07',
        name: '농축수산',
        color: '#399EBF',
        value: 0
    },
    {
        id: 'a08',
        name: '재정금융', 
        color: '#714ad3',
        value: 0
    },
    {
        id: 'a09',
        name: '사회복지',
        color: '#c05459', 
        value: 0
    },
    {
        id: 'a10',
        name: '보건의료',
        color: '#4ca952',
        value: 0
    },
    {
        id: 'a11',
        name: '재난안전',
        color: '#919191',
        value: 0
    },
    {
        id: 'a12',
        name: '교육',
        color: '#919191',
        value: 0
    },
    {
        id: 'a13',
        name: '식품건강',
        color: '#919191',
        value: 0
    },
    {
        id: 'a14',
        name: '과학기술',
        color: '#919191',
        value: 0
    },
    {
        name: '일반행정',
        value: 7781,
        group: 'a01'
    },
    {
        name: '국가통계',
        value: 985,
        group: 'a01'
    },
    {
        name: '재정지원',
        value: 754,
        group: 'a01'
    },
    {
        name: '정부자원관리',
        value: 369,
        group: 'a01'
    },
    {
        name: '국정홍보',
        value: 140,
        group: 'a01'
    },
    {
        name: '인권',
        value: 53,
        group: 'a01'
    },
    {
        name: '공정거래',
        value: 68,
        group: 'a01'
    },
    {
        name: '정부조달',
        value: 28,
        group: 'a01'
    },
    {
        name: '법제',
        value: 106,
        group: 'a01'
    },
    {
        name: '국정운영', 
        value: 78,
        group: 'a01'
    },
    {
        name: '관광',
        value: 2955,
        group: 'a02'
    },
    {
        name: '문화예술',
        value: 2307,
        group: 'a02'
    },
    {
        name: '문화재',
        value: 1927,
        group: 'a02' 
    },
    {
        name: '문화체육관광일반',
        value: 1770,
        group: 'a02'
    },
    {
        name: '체육',
        value: 788,
        group: 'a02'
    },
    {
        name: '산업-중소기업 일반',
        value: 3074,
        group: 'a03'
    },
    {
        name: '에너지및자원개발',
        value: 2589,
        group: 'a03'
    },
    {
        name: '고용노동',
        value: 867,
        group: 'a03'
    },
    {
        name: '산업진흥-고도화',
        value: 263,
        group: 'a03'
    },
    {
        name: '통상',
        value: 94,
        group: 'a03'
    },
    {
        name: '산업기술지원',
        value: 258,
        group: 'a03'
    },
    {
        name: '원자력기술',
        value: 85,
        group: 'a03'
    },
    {
        name: '도로',
        value: 2733,
        group: 'a04'
    },
    {
        name: '물류등기타',
        value: 1489,
        group: 'a04'
    },
    {
        name: '철도',
        value: 1571,
        group: 'a04'
    },
    {
        name: '항공',
        value: 301,
        group: 'a04'  
    },
    {
        name: '항만',
        value: 363,
        group: 'a04'
    },
    {
        name: '환경 일반',
        value: 1758,
        group: 'a05'
    },
    {
        name: '폐기물',
        value: 1150,
        group: 'a05'
    },
    {  
        name: '상하수도-수질',
        value: 1123,
        group: 'a05'
    },
    {
        name: '자연',
        value: 906,
        group: 'a05'
    },
    {
        name: '대기',
        value: 785,
        group: 'a05'
    },
    {
        name: '해양환경',
        value: 283,
        group: 'a05'
    },
    {
        name: '지역및도시',
        value: 3883,
        group: 'a06'
    },
    {
        name: '주택',
        value: 823,
        group: 'a06'
    },
    {
        name: '수자원',
        value: 371,
        group: 'a06'
    },
    {
        name: '산업단지',
        value: 156,
        group: 'a06'
    },
    {
        name: '농업,농촌',
        value: 2256,
        group: 'a07'
    },
    {
        name: '임업,산촌',
        value: 1806,
        group: 'a07'
    },
    {
        name: '해양수산,어촌',
        value: 966,
        group: 'a07'
    },
    {
        name: '재정,금융', 
        value: 1671,
        group: 'a08'
    },
    {
        name: '세제',
        value: 1511, 
        group: 'a08'
    },
    {
        name: '재정,금융',
        value: 1672,
        group: 'a08'  
    },
    {
        name: '산업금융',
        value: 984,
        group: 'a08'
    },
    {
        name: '무역및투자유치',
        value: 328,
        group: 'a08' 
    },
    {
        name: '금융',
        value: 300,
        group: 'a08'  
    },
    {
        name: '사회복지일반',
        value: 1681,
        group: 'a09'
    },
    {
        name: '보육-가족및여성',
        value: 937,
        group: 'a09'
    },
    {
        name: '노인-청소년',
        value: 807,
        group: 'a09'
    },
    {
        name: '공적연금',
        value: 463,
        group: 'a09'
    },
    {
        name: '취약계층지원',
        value: 427,
        group: 'a09'
    },
    {
        name: '보건의료',
        value: 3726,
        group: 'a10'
    },  
    {
        name: '건강보험',
        value: 381,
        group: 'a10'
    },
    {
        name: '안전관리',
        value: 2984,
        group: 'a11'
    },
    {
        name: '경찰',
        value: 613,
        group: 'a11'
    },
    {
        name: '해경',
        value: 406,
        group: 'a11'
    },
    {
        name: '교육일반',
        value: 1952,
        group: 'a12'
    },
    {
        name: '평생-직업교육',
        value: 945, 
        group: 'a12'
    },
    {
        name: '초,중등교육',
        value: 529,
        group: 'a12'
    },
    {
        name: '고등교육',
        value: 423,
        group: 'a12' 
    },
    {
        name: '식품건강',
        value: 2095,
        group: 'a13'
    },
    {  
        name: '과학기술',
        value: 2064,
        group: 'a14'
    }
];