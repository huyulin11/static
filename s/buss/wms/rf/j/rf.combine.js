import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initSetting } from "/s/buss/wms/rf/j/rf.picking.setting.js";

gf.checkLoginError();

let container = "#rootContainer";
let _warehouse = gf.urlParam("warehouse");
let _setting;

var sub = function () {
    let _su = $("#su").val();
    let _tu = $("#tu").val();
    let _to = $("#to").val();
    let _line = $("#line").val();
    if (!_tu) {
        $("#tu").focus();
        layer.msg("TU不能为空！");
        return;
    }
    if (_tu.trim().length != 6) {
        $("#tu").focus();
        layer.msg("TU格式需为6位！");
        $("#tu").val("");
        return;
    }
    if (!_su) {
        if (!_line) {
            if (!window.confirm("SU为空时提交，托盘直接发往产线，是否继续？")) {
                $("#su").focus();
                return;
            }
            $("#lineTr").removeClass("hidden");
            $("#line").focus();
            return;
        }
    }
    gf.doAjax({
        url: `/shipment/util/addCombinedItem.shtml`,
        data: { item: _su.trim(), userdef4: _tu.trim(), warehouse: _warehouse, to: _to, line: _line },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            if (data.code >= 0) {
                gf.layerMsg(data.msg, function () {
                    $("#tu").focus();
                });
                $("#tu").val("");
                $("#su").val("");
                $("#to").val("");
                $("#toTr").addClass("hidden");
                $("#tu").focus();
                initDatas();
            } else if (data.code == -100) {
                $("#toTr").removeClass("hidden");
                $("#sub").focus();
                gf.layerMsg(data.msg, function () {
                    $("#to").focus();
                });
            } else {
                $("#sub").focus();
                gf.layerMsg(data.msg, function () {
                    $("#tu").focus();
                    $("#tu").val("");
                    $("#su").val("");
                    $("#to").val("");
                });
            }

        }
    });
}

let initDatas = function () {
    $("#datas iframe").attr("src", "/s/buss/wms/h/shipmentMainDetailMgr.html?PICK=COMBINE&type=COMBINE&detailstatus=PICKING");
    gf.suitFrameHeight("datasFrame");
}

var initCombine = function () {
    if (!$("#topCtrlContainer")) return;
    let style = $(`<style id='settingHideDiv_style'></style>`);
    $(style).append(`#settingHideDiv.close {background-image: url(/s//i/icon/settingClose.png);}`)
        .append(`#settingHideDiv.open {background-image: url(/s//i/icon/settingOpen.png);}`);
    $("head").append(style);
    $("#topCtrlContainer").prepend(`<div id='settingHideDiv' class='close hideToggle' data-target='div#settingContainer'></div>`);

    let title = function () {
        if (_warehouse) {
            return `正在组盘-${gv.get("WAREHOUSE", _warehouse)}`;
        } else if (_setting && _setting.SETTING && _setting.SETTING != "[]" && _setting.SETTING.length > 0) {
            let json = _setting.SETTING;
            let str = (_setting.TYPE == "PICK" ? "按拣配点" : "按生产线") + ":";
            let items = [];
            for (let item of json) { items.push(item.name); }
            str += items.join("、");
            return (`发料组盘<br/>${str}`);
        }
    };
    if (title)
        $(container).find("h2").html(title);
    initDatas();

    var showCtrl = function (that) {
        var thatTarget = $(that).data("target");
        $(thatTarget).show(100);
        $(that).removeClass("close");
        $(that).addClass("open");
    }

    var hideCtrl = function (that) {
        var thatTarget = $(that).data("target");
        $(thatTarget).hide(100);
        $(that).removeClass("open");
        $(that).addClass("close");
    }

    var hideAllCtrl = function (thatTarget) {
        $("#topCtrlContainer").find("div.hideToggle").each(function () {
            var target = $(this).data("target");
            if (target != thatTarget) {
                hideCtrl(this);
            }
        });
    }

    $("#topCtrlContainer").delegate("div.hideToggle", "click", function () {
        hideAllCtrl($(this).data("target"));
        if ($(this).hasClass("open")) {
            hideCtrl(this);
        } else {
            showCtrl(this);
        }
    });
}

var getCombinedList = function () {
    var tuVal = $("#tu").val();
    if (!tuVal) { return; }
    gf.doAjax({
        url: `/app/conf/findJsonList.shtml`,
        data: { TABLE_KEY: "COMBINED_TU_INFO", key: tuVal },
        success: function (data) {
            data = JSON.parse(data);
            if (data && data[0]) {
                let value = JSON.parse(data[0].value);
                let items = value.items;
                let target = value.name;
                target = target ? ("产线：" + target) : "";
                if (items) {
                    let itemArr = [];
                    for (let item of items) {
                        itemArr.push("<br/>" + item.su);
                    }
                    layer.msg(target + "<br/>" + tuVal + "&nbsp" + "托盘已组货物有：" + itemArr.join(',') + "!");
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
            gf.doAjax({
                url: `/app/conf/getByUser.shtml`,
                data: { TABLE_KEY: "COMBINE_SETTING" },
                dataType: "json",
                timeout: 2000,
                success: function (setting) {
                    _setting = setting;
                    initSetting(_setting);
                    initCombine();
                }
            });

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
            suInput: function () {
                if (!$("#lineTr").hasClass("hidden")) {
                    $("#lineTr").addClass("hidden");
                }
            },
            getCombinedList: function () {
                getCombinedList();
            },
            suEnter: function () {
                sub();
            },
            toEnter: function () {
                sub();
            },
            lineEnter: function () {
                sub();
            },
        }
    });
}

initRf();