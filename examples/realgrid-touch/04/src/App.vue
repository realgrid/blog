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
                }
            ]
        };

        const detailed_template = {
            layout: "vlinear",
            height: "100%",
            children: [
                {
                    layout: "hlinear",
                    width: "100%",
                    height: "100%",
                    children: [
                        {
                            width: "20%",
                            layout: "vlinear",
                            children: [
                                {
                                    value: "주유소 명",
                                    style: {
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        color: '#555',
                                    }
                                },
                                { space: "1" },
                                { value: "도로명 주소" },
                                { value: "전화번호" },
                                { value: "위도" },
                                { value: "경도" },
                                { value: "수량" }
                            ],
                        },
                        {
                            height: "100%",
                            renderer: { type: "line", dir: "vertical", lineColor: "#777" }
                        },
                        { space: 10 },
                        {
                            width: "65%",
                            layout: 'vlinear',
                            children: [
                                {
                                    field: 'OILSTATN_NM',
                                    style: {
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        color: '#555'
                                    }
                                },
                                { space: "1" },
                                { field: 'LOCPLC_ROADNM_ADDR' },
                                { field: 'TELNO' },
                                { field: 'LAT' },
                                { field: 'LOGT' },
                                { field: 'QTY' }
                            ]
                        },
                        {
                            top: 1,
                            renderer: {
                                type: "button",
                                shape: "@edit",
                                borderless: true,
                                style: {
                                    fontSize: "14px"
                                },
                                onClick: (args) => {
                                    args.control.showEditPage(args.row);
                                    return true;
                                }
                            }
                        }
                    ]
                },
                { space: "1" },
                {
                    field: 'DATA_STD_DTM',
                    renderer: {
                        prefix: "생성 일자  "
                    },
                    style: {
                        fontSize: "12px",
                        color: "#777",
                    }
                }
            ]
        };

        const config = {
            options: {
                row: {
                    clickAction: 'detail',
                },
                infoPage: {
                    header: { caption: '요소수 정보' },
                    viewType: 'B',
                },
            },
            props: {
                templates: {
                    row: {
                        template: row_template,
                        detailed: detailed_template,
                    }
                },
            }
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