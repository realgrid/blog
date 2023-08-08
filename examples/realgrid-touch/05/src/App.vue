<template>
    <div id="realtouch"></div>
</template>

<script>
import RealGridTouch from "realgrid-touch"
import { yososu } from "@/datas/yososu.js";

export default {
    mounted() {
        const fields = {
            fields: [
                { name: 'OILSTATN_NM', label: '주유소명' },
                { name: 'LOCPLC_ROADNM_ADDR', label: '도로명주소' },
                { name: 'TELNO', label: '전화번호' },
                { name: 'QTY', label: '수량', type: 'text' },
                { name: 'LAT', label: '위도', type: 'number' },
                { name: 'LOGT', label: '경도', type: 'number' },
                { name: 'DATA_STD_DTM', label: '데이터입력일시', type: 'text' }
            ]
        };
        const data = RealGridTouch.createListData("", fields)
            .createView('view')
            .build();
        data.source.appendRows(yososu);

        const row_template = {
            layout: 'vlinear',
            children: [
                {
                    field: 'OILSTATN_NM',
                    left: 0,
                    style: { fontSize: '17px', fontWeight: 'bold', color: '#555' },
                },
                {
                    field: 'LOCPLC_ROADNM_ADDR',
                    left: 0,
                    style: { fontSize: '14px', color: '#777' },
                },
                {
                    layout: 'hlinear',
                    width: '100%',
                    style: { paddingBottom: '2px' },
                    children: [
                        {
                            value: '수량',
                            style: { color: 'blue' }
                        },
                        {
                            space: '*'
                        },
                        {
                            field: 'QTY',
                            style: { color: '#333', fontSize: '17px', fontWeight: 'bold' }
                        }
                    ]
                },
            ]
        };

        const config = {
            options: {
                orientation: 'horizontal',
                row: {
                    template: 'row'
                },
                singleRow: {
                    visible: true,
                    fillHeight: true
                },
                scrollBar: false,
            },
            props: {
                templates: {
                    row: {
                        template: row_template,
                        rowStyle: {
                            paddingTop: '16px',
                            paddingBottom: '16px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                        }
                    }
                },
            },
        };

        this.list = RealGridTouch.createListControl(document, "realtouch");
        this.list.setConfig(config);
        this.list.data = data;
    },
}
</script>

<style>
@import url('realgrid-touch/dist/realgrid-touch-style.css');

html {
    margin: 0px;
}

body {
    margin: 0px;
}

#realtouch {
    position: absolute;
    overflow: scroll;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>