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
            header: {
                visible: true,
                caption: "요소수 구입처",
                captionAlign: "center",
                buttons: [
                    {
                        name: "home",
                        position: "head",
                        label: "처음",
                        onClick: this.homeClicked,
                    },
                    {
                        name: "edit",
                        label: "편집",
                        style: { color: "blue" },
                        onClick: this.editClick,
                    }
                ],
            },
            footer: {
                visible: true,
                template: "footer",
                buttons: [
                    {
                        name: "delete",
                        label: "삭제",
                        position: "tail",
                        enabled: () => this.list.checkedRowCount > 0,
                        onClick: this.deleteClicked,
                        style: { color: "red" },
                    }
                ],
            },
        }
    },

    mounted() {
        this.data = RealGridTouch.createListData("", this.fields)
            .createView('view')
            .build();

        let config = {
            props: this.props,
            options: {
                header: this.header,
                footer: this.footer,
                row: this.row,
                rowBar: this.rowBar,
                emptyPage: this.emptyPage,
            }
        };

        if (this.data) {
            this.list = RealGridTouch.createListControl(document, "realtouch");
            this.list.setConfig(config);
            this.list.data = this.data;
            this.data.source.appendRows(yososu);
        }
    },

    methods: {
        homeClicked: function () {
            alert(" home clicked.");
        },

        editClick: function (args) {
            console.log("edit clicked.", args.button.label);

            if (args.button.label == "완료") {
                args.button.label = "편집";
                this.list.options.rowBar.visible = false;
                return;
            }

            args.button.label = "완료";
            this.list.options.rowBar.display = "check";
            this.list.checkAll(false);
            this.list.options.rowBar.visible = true;
        },

        deleteClicked: function () {
            let rows = this.list.getCheckedRows();
            this.data.deleteRows(rows);
        },
    },
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