<template>
    <div id="realtouch"></div>
</template>

<script>
import RealGridTouch from "realgrid-touch"
import { mycards } from "@/datas/mycards.js";

export default {
    mounted() {
        const fields = {
            fields: [
                { name: 'image' },
                { name: 'name' },
            ],
        };
        const data = RealGridTouch.createListData("", fields)
            .createView('view')
            .build();
        data.source.appendRows(mycards);

        const row_template = {
            template: {
                layout: 'vlinear',
                itemsAlign: "center",
                children: [
                    {
                        field: 'image',
                        renderer: {
                            type: 'image',
                            url: 'https://touch.realgrid.com/asset/images/card/${@value}',
                            imageWidth: 80
                        },
                    },
                    { field: 'name' }
                ]
            }
        };

        const config = {
            options: {
                orientation: "horizontal",
            },
            props: {
                templates: {
                    row: row_template,
                }
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

#realtouch {
    position: absolute;
    overflow: scroll;
    width: 100%;
    height: 30vh;
    overflow: hidden;
}
</style>