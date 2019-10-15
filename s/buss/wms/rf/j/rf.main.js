import { gf } from "/s/buss/g/j/g.f.js";
import "/s/j/vue/vue.min.js";

let container = "#rootContainer";

export var currentReceiptPaperid = function () {
    return localStorage.__receiptPaperId;
};
export var setCurrentReceiptPaperid = function (val) {
    return localStorage.__receiptPaperId = val;
};

export var currentShipmentPaperid = function () {
    return localStorage.__shipmentPaperId;
};
export var setCurrentShipmentPaperid = function (val) {
    return localStorage.__shipmentPaperId = val;
};

var agvOk = function () {
    if (window.confirm("该功能仅为测试使用，点击后，所有入库单的状态都将从下达变成完成，是否继续？")) {
        gf.doAjax({
            url: `/receipt/main/agvOk.shtml`,
            success: function (data) {
                data = JSON.parse(data);
                layer.msg(data.msg);
                if (data.code >= 0) {
                    setCurrentReceiptPaperid("");
                    setCurrentShipmentPaperid("");
                    window.location.reload();
                }
            }
        });
    }
};

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
                $("#rootContainer").find("#priority,#failure").on("click", function () {
                    layer.msg("尚未开通！");
                });
                $("#rootContainer").find("#picking").on("click", function () {
                    window.location.href = `/s/buss/wms/rf/h/rf.${$(this).attr('id')}.html`;
                });
                $("#rootContainer").find("#combine").on("click", function () {
                    window.location.href = `/s/buss/wms/rf/h/rf.${$(this).attr('id')}.html`;
                });
                $("#rootContainer").find("#receipt").on("click", function () {
                    window.location.href = `/s/buss/wms/rf/h/rf.${$(this).attr('id')}.html`;
                });
                $("#rootContainer").find("#stockOut").on("click", function () {
                    window.location.href = `/s/buss/wms/h/shipmentMainMgr.html?status=2:TAKED:SCANED&type=${escape("冷库出库")}&warehouse=2`;
                });
                $("#rootContainer").find("#alloc").on("click", function () {
                    window.location.href = `/s/buss/wms/alloc/item/h/alloc.html`;
                });
                $(container).find("#agvOk").on("click", function () { agvOk(); });
            },
        },
    });
}