import { gf } from "/s/buss/g/j/g.f.js";
import "/s/j/vue/vue.min.js";
import { gv } from "/s/buss/g/j/g.v.js";
gv.init();

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
                gf.layerMsg(data.msg);
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
    { resKey: "rf_picking", id: "picking", name: "发料拣配" },
    { resKey: "rf_receipt", id: "receipt", name: "冷库入库" },
    { resKey: "rf_combine", id: "combine", name: "发料组盘" },
    { resKey: "rf_shipment", id: "stockOut", name: "冷库出库" },
    { resKey: "rf_trans", id: "trans", name: "发料撤回" },
    { resKey: "rf_alloc", id: "alloc", name: "冷库库位" },
    { resKey: "rf_fail", id: "failure", name: "产线设置" },
    { resKey: "rf_priority", id: "priority", name: "优先等级" },
    { id: "logout", name: "退出" },
];
var initMain = function () {
    let title = "RF主界面";
    $(container).find("h2").html(title);
    $(document).attr("title", title);

    gf.getButtonByRes({
        values: btns, numInLine: 2, style: `cellspacing="10px" cellspadding="1px"`,
        choose: function (value) {
            if (value.choosed == "ON") { return true; }
            return false;
        },
    }, function (btnsStr) {
        $(container).append(btnsStr);
        $(container).delegate("#logout", "click", function () {
            window.location.href = "/logout.shtml";
        });
        $(container).find("#failure").on("click", function () {
            window.location.href = `/s/buss/sys/lap/h/lapInfoMgr.html?type=PROD_LINE`;
        });
        $(container).find("#trans").on("click", function () {
            window.location.href = `/s/buss/wms/h/shipmentCombinedMgr.html?type=MGR`;
        });
        $(container).find("#priority").on("click", function () {
            window.location.href = ` /s/buss/wms/h/shipmentMainDetailMgr.html?type=PRIORITY&status=NEW:TOSEND:PICKING:PICKOVER:COMBINING:COMBOVER:TRANSSTART`;
        });
        $(container).find("#picking").on("click", function () {
            window.location.href = `/s/buss/wms/rf/h/rf.picking.html?type=PICKED_NORMAL`;
        });
        $(container).find("#combine").on("click", function () {
            window.location.href = `/s/buss/wms/rf/h/rf.combine.html`;
        });
        $(container).find("#receipt").on("click", function () {
            window.location.href = `/s/buss/wms/rf/h/rf.receipt.html`;
        });
        $(container).find("#stockOut").on("click", function () {
            window.location.href = `/s/buss/wms/rf/h/rf.picking.html?type=PICKED_COLD`;
        });
        $(container).find("#alloc").on("click", function () {
            window.location.href = `/s/buss/wms/alloc/item/h/alloc.html`;
        });
        $(container).find("#agvOk").on("click", function () { agvOk(); });
    });
};

export var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            initMain();
            gf.resizeTable();
        },
        methods: {
        },
    });
}