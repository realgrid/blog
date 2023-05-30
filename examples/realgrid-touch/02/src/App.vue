<template>
    <div id="realtouch"></div>
</template>

<script>
import RealGridTouch from "realgrid-touch"
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        return {
            fields: {
                fields: [
                    { name: 'OILSTATN_NM' },
                    { name: 'LOCPLC_ROADNM_ADDR' },
                    { name: 'TELNO' },
                    { name: 'QTY', type: 'number' },
                    { name: 'LAT', type: 'number' },
                    { name: 'LOGT', type: 'number' },
                    { name: 'DATA_STD_DTM' }
                ],
            },
        }
    },

    mounted() {
        this.data = RealGridTouch.createListData("", this.fields)
            .createView('view')
            .build();

        if (this.data) {
            this.list = RealGridTouch.createListControl(document, "realtouch");
            this.list.data = this.data;
            this.data.source.appendRows(yososu);
        }
    }
}
</script>

<style>
@import url('realgrid-touch/dist/realgrid-touch-style.css');

#realtouch {
    position: absolute;
    overflow: scroll;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>