import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import "/s/j/vue/vue.min.js";
import { gv } from "/s/buss/g/j/g.v.js";
import "/s/buss/g/j/manager.js"
import { refreshAcsInfo } from "/s/buss/acs/FANCY/j/acs.info.js";
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";

gv.init();

let container = "#rootContainer";

export var currentShipmentPaperid = function () {
    return localStorage.__shipmentPaperId;
};
export var setCurrentShipmentPaperid = function (val) {
    return localStorage.__shipmentPaperId = val;
};

var btns;
if (localStorage.projectKey == 'BJJK_HUIRUI') {
    btns = [
        { resKey: "rf_picking", id: "picking", name: "发料拣配", "url": `/s/buss/wms/rf/h/rf.picking.html?type=PICKED_NORMAL` },
        { resKey: "rf_receipt", id: "receipt", name: "冷库入库", "url": `/s/buss/wms/rf/h/rf.receipt.html` },
        { resKey: "rf_combine", id: "combine", name: "发料组盘", "url": `/s/buss/wms/rf/h/rf.combine.html` },
        { resKey: "rf_shipment", id: "stockOut", name: "冷库出库", "url": `/s/buss/wms/rf/h/rf.picking.html?type=PICKED_COLD` },
        { resKey: "rf_trans", id: "trans", name: "发料撤回", "url": `/s/buss/wms/h/shipmentCombinedMgr.html?type=MGR` },
        { resKey: "rf_alloc", id: "alloc", name: "冷库库位", "url": `/s/buss/wms/alloc/item/h/alloc.html` },
        { resKey: "rf_fail", id: "failure", name: "产线设置", "url": `/s/buss/sys/lap/h/lapInfoMgr.html?type=PROD_LINE` },
        { resKey: "rf_priority", id: "priority", name: "优先等级", "url": ` /s/buss/wms/h/shipmentMainDetailMgr.html?type=PRIORITY&status=NEW:TOSEND:PICKING:PICKOVER:COMBINING:COMBOVER:ON_PCS:OVER_PCS` },
        { resKey: "rf_sequence", id: "sequence", name: "优先顺序", "url": ` /s/buss/wms/h/shipmentMainDetailMgr.html?type=PRODUCT` },
        { id: "logout", name: "退出", "url": "/logout.shtml" },
    ];
} else if (localStorage.projectKey == 'YZBD_NRDW') {
    btns = [
        { id: "inventoryScan", name: "盘点扫描", "url": `/s/buss/wms/rf/h/rf.inventoryScan.html` },
        { id: "instantBarcode", name: "入库扫码", "url": `/s/buss/wms/rf/h/rf.instant.barcode.html` },
        {
            id: "udfConfirm", name: "用户确认", "click": function () {
                taskexe.addCtrlTaskFromBtn(this, "确认信号", "UdfConfirm");
            }, nameRenderFun: function (obj, dataSupport) {
                $(obj).data('open', dataSupport.IS_UDF_CONFIRM).html("用户确认" + gf.htmlPiece(dataSupport.IS_UDF_CONFIRM));
            }, interval: 1000
        },
        { id: "logout", name: "退出", "url": "/logout.shtml" },
    ];
}

var initMain = function () {
    let title = "RF主界面";
    $(container).find("h2").html(title);
    $(document).attr("title", title);

    let conf = {
        dataSupport: refreshAcsInfo,
        values: btns, numInLine: 2,
        style: `cellspacing="10px" cellspadding="1px"`,
        choose: function (value) {
            if (value.choosed == "ON") { return true; }
            return false;
        },
    };
    if (localStorage.projectKey == 'YZBD_NRDW') {
        Object.assign(conf, { numInLine: 1 });
    }
    gfbtn.buttonsDomByRes(conf, function (btns) {
        $(container).append(btns);
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