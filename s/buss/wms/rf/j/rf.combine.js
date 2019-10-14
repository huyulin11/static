import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

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
        data: { item: su, userdef4: tu, warehouse: _warehouse },
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
    $(container).find("h2").each(function () {
        if (_warehouse) {
            $(this).html(`正在组盘-${gv.get("WAREHOUSE", _warehouse)}`);
        } else {
            $(this).html(`未找到组盘识别数据`);
        }
    });
}

var getCombinedList = function (tuVal) {
    if (!tuVal) { layer.msg("组盘货架号不能为空！"); $("#tu").focus(); return; }
    gf.doAjax({
        url: `/app/conf/findJsonList.shtml`,
        data: { TABLE_KEY: "COMBINED_TU_INFO", key: tuVal },
        success: function (data) {
            data = JSON.parse(data);
            if (data) {
                let items = data[0].value;
                items = JSON.parse(items).items;
                if (items) {
                    layer.msg(tuVal + "托盘已组盘货物有：" + items);
                }
            }
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
            $(container).find("#back").on("click", function () {
                window.history.back();
            });
            gf.resizeTable();
        },
        methods: {
            tuEnter: function () {
                $("#su").focus();
            },
            getCombinedList: function () {
                var tuVal = $("#tu").val();
                getCombinedList(tuVal);
            },
            suEnter: function () {
                sub();
            },
        }
    });
}

initRf();