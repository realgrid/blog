
const row_template = {
    vars: {
        nameStyle: { color: 'blue' },
        valueStyle: { color: '#333', fontSize: '17px', fontWeight: 'bold' },
        lineStyle: { paddingBottom: '2px' }
    },
    template: {
        layout: 'vlinear',
        itemsAlign: 'left',
        children: [
            {
                value: '출금',
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#555'
                },
            },
            {
                layout: 'hlinear',
                itemGap: 2,
                children: [
                    {
                        field: '출금',
                        renderer: {
                            numberFormat: ','
                        },
                        style: {
                            fontFamily: 'Verdana',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#555'
                        },
                    },
                    {
                        value: '원',
                        bottom: 0
                    }
                ]
            },
            {
                field: '날짜',
                style: { color: '#99f', fontSize: '14px', paddingTop: '4px' }
            },
            {
                renderer: { type: 'spacer', height: 50 }
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [{
                    value: '받는 계좌',
                    style: '--nameStyle'
                }, {
                    space: '*'
                }, {
                    field: '받는계좌',
                    style: '--valueStyle'
                }]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '받는 은행',
                        style: '--nameStyle',
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '받는은행',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '받는 분',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '받는분',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                renderer: { type: 'spacer', height: 50 }
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '출금 계좌',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '출금계좌',
                        renderer: { textFormat: '(\\d{3})(\\d{4})(\\d{4})(\\d{2});$1-$2-$3-$4' },
                        style: '--valueStyle'
                    }
                ]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '잔액',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '잔액',
                        value: '${@value;;,} 원',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '내 통장 표시',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '내통장표시',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '거래 구분',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '거래구분',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                layout: 'hlinear',
                width: '100%',
                style: '--lineStyle',
                children: [
                    {
                        value: '메모',
                        style: '--nameStyle'
                    },
                    {
                        space: '*'
                    },
                    {
                        field: '메모',
                        style: '--valueStyle'
                    }
                ]
            },
            {
                space: '*'
            },
            {
                value: '자세한 내용은 이쳬계좌내역조회에서 확인바랍니다.',
                left: 10,
                style: { fontSize: '14px', color: '#555', paddingBottom: '2px' }
            },
            {
                value: '이체내역조회 바로가기',
                left: 10,
                renderer: {
                    type: 'link',
                    // link: 'http://daum.net',
                    linkField: '내역조회'
                },
                style: { fontSize: '15px' }
            }
        ]
    },
    rowStyle: {
        paddingTop: '11px',
        paddingBottom: '11px',
        paddingLeft: '10px',
        paddingRight: '10px',
    }
};

const config = {
    landscape: {
        rowBar: {
            visible: true,
            display: 'order'
        }
    },
    portrait: {
    }
};

function createListData(dataurl, callback) {
    $.ajax({
        url: dataurl,
        method: 'GET',
        dataType: 'json'
    })
        .done(function (json) {
            const d = RealTouch.createListData('', {}, json);
            data = d.createView().sort(['SIGUN_NM', 'DIV']).build();
            callback();
        })
        .fail(function (xhr, status, error) {
            alert(error + ': ' + status);
        });
}

function init() {
    console.log('RealTouch v' + RealTouch.getVersion());
    RealTouch.setLogging(true);
    RealTouch.setDebugging(true);

    createListData('../data/sangsegeore.json', () => {
        list = RealTouch.createListControl(document, 'realtouch');
        list.setConfig(config);
        list.data = data;
    })
}
