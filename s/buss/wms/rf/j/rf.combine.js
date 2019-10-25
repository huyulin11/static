import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

let container = "#rootContainer";
let _warehouse = gf.urlParam("warehouse");

var sub = function () {
    let _su = $("#su").val();
    let _tu = $("#tu").val();
    let _paperid = $("#paperid").val();
    if (!_su || !_tu) {
        layer.msg("tu与su均不能为空！");
        if (!_su) {
            $("#su").focus();
        } else if (!_tu) {
            $("#tu").focus();
        }
        return;
    }
    gf.doAjax({
        url: `/shipment/detail/addCombinedItem.shtml`,
        data: { item: _su, userdef4: _tu, warehouse: _warehouse, paperid: _paperid },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            layer.msg(data.msg + ":su:" + _su + ",tu:" + _tu);
            if (data.code >= 0) {
                $("#su").val("");
                $("#paperid").val("");
                $("#paperTr").addClass("hidden");
                $("#su").focus();
            } else if (data.code == -100) {
                $("#paperTr").removeClass("hidden");
                $("#paperid").focus();
            } else {
                $("#su").focus();
            }
        }
    });
}

var initCombine = function () {
    let title = function () {
        if (_warehouse) {
            return `正在组盘-${gv.get("WAREHOUSE", _warehouse)}`;
        } else {
            return `未找到组盘识别数据`;
        }
    };
    $(container).find("h2").html(title);
    $(document).attr("title", title);
}

var getCombinedList = function () {
    var tuVal = $("#tu").val();
    if (!tuVal) { layer.msg("组盘货架号不能为空！"); $("#tu").focus(); return; }
    gf.doAjax({
        url: `/app/conf/findJsonList.shtml`,
        data: { TABLE_KEY: "COMBINED_TU_INFO", key: tuVal },
        success: function (data) {
            data = JSON.parse(data);
            if (data && data[0]) {
                let items = data[0].value;
                items = JSON.parse(items).items;
                if (items) {
                    let itemArr = [];
                    for (let item of items) {
                        itemArr.push(item.su);
                    }
                    layer.msg(tuVal + "托盘已组盘货物有：" + itemArr.join(','));
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
                getCombinedList();
            },
            suEnter: function () {
                sub();
                setTimeout(() => {
                    getCombinedList();
                }, 3000);
            },
        }
    });
}

initRf();