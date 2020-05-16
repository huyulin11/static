import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

gf.checkLoginError(function () {
    window.location.href = "/s/buss/g/h/login.html";
});

let container = "#rootContainer";
let _warehouse = gf.urlParam("warehouse");

var sub = function () {
    let _su = $("#su").val();
    let _tu = $("#tu").val();
    let _to = $("#to").val();
    if (!_su || !_tu) {
        gf.layerMsg("TU与SU均不能为空！");
        if (!_su) {
            $("#su").focus();
        } else if (!_tu) {
            $("#tu").focus();
        }
        return;
    }
    gf.doAjax({
        url: `/shipment/detail/addCombinedItem.shtml`,
        data: { item: _su.trim(), userdef4: _tu.trim(), warehouse: _warehouse, to: _to },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            gf.layerMsg(data.msg);
            if (data.code >= 0) {
                $("#tu").val("");
                $("#su").val("");
                $("#to").val("");
                $("#toTr").addClass("hidden");
                $("#tu").focus();
                initDatas();
            } else if (data.code == -100) {
                $("#toTr").removeClass("hidden");
                $("#to").focus();
            } else {
                $("#su").focus();
            }
        }
    });
}

let initDatas = function () {
    $("#datas iframe").attr("src", "/s/buss/wms/h/shipmentMainDetailMgr.html?PICK=COMBINE&type=COMBINE&detailstatus=PICKING");
}

var initCombine = function () {
    let title = function () {
        if (_warehouse) {
            return `正在组盘-${gv.get("WAREHOUSE", _warehouse)}`;
        } else {
            return `全库匹配组盘`;
        }
    };
    $(container).find("h2").html(title);
    $(document).attr("title", title);
    initDatas();
}

var getCombinedList = function () {
    var tuVal = $("#tu").val();
    if (!tuVal) { $("#tu").focus(); return; }
    gf.doAjax({
        url: `/app/conf/findJsonList.shtml`,
        data: { TABLE_KEY: "COMBINED_TU_INFO", key: tuVal },
        success: function (data) {
            data = JSON.parse(data);
            if (data && data[0]) {
                let value = JSON.parse(data[0].value);
                let items = value.items;
                let target = value.name;
                target = target ? ("<br/>目的地：" + target) : "";
                if (items) {
                    let itemArr = [];
                    for (let item of items) {
                        itemArr.push(item.su);
                    }
                    layer.msg(tuVal + "托盘已组盘货物有：" + itemArr.join(',') + "!" + target);
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
            $(container).find("#clean").on("click", function () { $("#su,#tu").val(""); });
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
                getCombinedList();
            },
            suEnter: function () {
                sub();
                setTimeout(() => {
                    getCombinedList();
                }, 3000);
            },
            toEnter: function () {
                sub();
                setTimeout(() => {
                    getCombinedList();
                }, 3000);
            },
        }
    });
}

initRf();