import { gotoRfMgr } from "/s/buss/wms/rf/j/rf.main.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";

let container = "#rootContainer";
let _warehouse = gf.urlParam("warehouse");

var sub = function () {
    let su = $("#su").val();
    let tu = $("#tu").val();
    if (!su || !tu) {
        layer.msg("tu与su均不能为空！");
        if (!su) {
            $("#su").focus();
        } else if (!tu) {
            $("#tu").focus();
        }
        return;
    }
    gf.doAjax({
        url: `/shipment/detail/addCombinedItem.shtml`,
        data: { item: su, userdef3: tu, warehouse: _warehouse },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            layer.msg(data.msg + ":su:" + su + ",tu:" + tu);
            if (data.code >= 0) {
                $("#su").val("");
            }
            $("#su").focus();
        }
    });
}

var initCombine = function () {
    $(container).find("h1").each(function () {
        if (_warehouse) {
            $(this).html(`正在组盘-${gv.get("WAREHOUSE", _warehouse)}`);
        } else {
            $(this).html(`未找到组盘识别数据`);
        }
    });
}

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            initCombine();

            $(container).find("table").show();
            $(container).find("#sub").on("click", function () { sub(); });
            initPaperOp("shipment");
            $("#tu").focus();

            $(container).find("#layout").on("click", function () {
                window.location.href = "/logout.shtml";
            });
            $(container).find("#gotoRfMgr").on("click", function () {
                gotoRfMgr();
            });
            gf.resizeTable();
        },
        methods: {
            tuEnter: function () {
                $("#su").focus();
            },
            suEnter: function () {
                sub();
            },
        }
    });
}

initRf();