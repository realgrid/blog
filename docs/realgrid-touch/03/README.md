Part 3. 헤더와 푸터 다루기


## 기본 코드 (App.vue)

지난 영상에서 작성한 코드 내용입니다.

``` html
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
```


## mounted()

``` html
...
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        ...
    },
    mounted() {
        this.data = RealGridTouch.createListData("", this.fields)
            .createView('view')
            .build();

        if (this.data) {
            this.list = RealGridTouch.createListControl(document, "realtouch");
            this.list.data = this.data;
            this.data.source.appendRows(yososu);

            this.list.setConfig({
                options: {
                    header: this.header,
                    footer: this.footer,
                    rowBar: this.rowBar,
                }
            });
        }
    },
    ...
}
</script>
...
```


## header

``` html
...
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        return {
            ...
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
        };
    },
    ...
}
</script>
...
```


## footer

``` html
...
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        return {
            ...
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
        };
    },
    ...
}
</script>
...
```


## rowBar

``` html
...
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        return {
            ...
            rowBar: {
                visible: true,
                display: "order",
            },
        };
    },
    ...
}
</script>
...
```


## Methods

``` html
...
import { yososu } from "@/datas/yososu.js";

export default {
    data() {
        ...
    },

    mounted() {
        ...
    },

    methods: {
        homeClicked() {
            alert(" home clicked.");
        },

        editClick(args) {
            if (args.button.label == "완료") {
                args.button.label = "편집";
                this.list.checkAll(false);
                this.list.options.rowBar.display = "order";
            } else {
                args.button.label = "완료";
                this.list.options.rowBar.display = "check";
            }

            this.list.options.header.setButton(args.button);
        },

        deleteClicked() {
            let rows = this.list.getCheckedRows();
            this.data.deleteRows(rows);
        },
    },
}
</script>
...
```