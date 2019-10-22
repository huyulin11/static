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

var btns = [
    { srcid: "rf_priority", id: "priority", name: "优先级" },
    { srcid: "rf_receipt", id: "receipt", name: "冷库入库" },
    { srcid: "rf_picking", id: "picking", name: "拣配" },
    { srcid: "rf_shipment", id: "stockOut", name: "冷库出库" },
    { srcid: "rf_combine", id: "combine", name: "组盘" },
    { srcid: "rf_fail", id: "failure", name: "机台故障" },
    { srcid: "rf_alloc", id: "alloc", name: "查看库存" },
    { id: "logout", name: "退出" },
];

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
                let title = "RF主界面";
                $(container).find("h2").html(title);
                $(document).attr("title", title);

                let btnsStr = gf.getButtonsTable({
                    values: btns, numInLine: 2, style: `cellspacing="10px" cellspadding="1px"`,
                    choose: function (value) {
                        if (value.choosed == "ON") { return true; }
                        return false;
                    }, display: function (value) {
                        if (value.choosed == "ON") { return true; }
                        return false;
                    },
                });
                $("#rootContainer").append(btnsStr);

                $("#rootContainer").delegate("#logout", "click", function () {
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
                    window.location.href = `/s/buss/wms/h/shipmentMainMgr.html?status=2:TAKED:PICKED&type=${escape("冷库出库")}&warehouse=2`;
                });
                $("#rootContainer").find("#alloc").on("click", function () {
                    window.location.href = `/s/buss/wms/alloc/item/h/alloc.html`;
                });
                $(container).find("#agvOk").on("click", function () { agvOk(); });
            },
        },
    });
}