import { gf } from "/s/buss/g/j/g.f.js";
import "/s/j/vue/vue.min.js";

let container = "#rootContainer";

export var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            this.initMain();
            gf.resizeTable();
        },
        methods: {
            initMain: function () {
                $("#rootContainer").find("#logout").on("click", function () {
                    window.location.href = "/logout.shtml";
                });
                $("#rootContainer").find("#priority,#receipt,#picking,#groupdisk,#failure").on("click", function () {
                    gf.layerOpen({ content: `/s/buss/wms/rf/h/${$(this).attr('id')}.html` });
                });
                $("#rootContainer").find("#shipment").on("click", function () {
                    gf.layerOpen({ content: `/s/buss/wms/rf/h/${$(this).attr('id')}.html` });
                    // gf.layerOpen({ content: `/s/buss/wms/h/shipmentMainMgr.html?status=2` });
                });
                $("#rootContainer").find("#alloc").on("click", function () {
                    gf.layerOpen({ content: `/s/buss/wms/alloc/item/h/alloc.html` });
                });
            },
        },
    });
}