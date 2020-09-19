import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initSetting } from "/s/buss/wms/rf/j/rf.picking.setting.js";

gf.checkLoginError();

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");
let _warehouse = gf.urlParam("warehouse");
let _type = gf.urlParam("type");
let _setting;

var sub = function () {
    let tu = $("#tu").val();
    let su = $("#su").val();

    if (!tu) {
        $("#tu").focus();
        return;
    }

    if (_type == "PICKED_COLD") {
        if (!su) {
            $("#su").focus();
            return;
        }
    }

    gf.doAjax({
        url: `/shipment/util/addPickingItem.shtml`,
        data: { userdef3: tu.trim(), item: su.trim(), paperid: _paperid, warehouse: _warehouse, },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            gf.layerMsg(data.msg, function () {
                if (data.code >= 0) {
                    $("#tu").val("");
                    $("#su").val("");
                    initDatas();
                }
                $("#tu").val("");
                $("#tu").focus();
            });
        }
    });
}

let initDatas = function () {
    $("#datas iframe").attr("src", `/s/buss/wms/h/shipmentMainDetailMgr.html?detailstatus=NEW:TOSEND&PICK=PICK&type=${_type}&warehouse=${_warehouse}`);
    let check = () => {
        gf.changeFrameHeight("datasFrame");
    }
    $("#datas iframe").on("load", check);
    window.οnresize = check;
}

var initPick = function () {
    if (!$("#topCtrlContainer")) return;
    let style = $(`<style id='settingHideDiv_style'></style>`);
    $(style).append(`#settingHideDiv.close {background-image: url(/s//i/icon/settingClose.png);}`)
        .append(`#settingHideDiv.open {background-image: url(/s//i/icon/settingOpen.png);}`);
    $("head").append(style);
    $("#topCtrlContainer").prepend(`<div id='settingHideDiv' class='close hideToggle' data-target='div#settingContainer'></div>`);

    if (_paperid) {
        let url = `/shipment/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                gf.layerMsg(_paperid + s.msg);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "TOSEND" && main["status"] != "PICKING") || main["delflag"] != "0") {
                gf.layerMsg(_paperid + "该单无法继续操作，如需查看详情，请移步出库管理！");
                return;
            }
        });
    }

    let title = "发料拣配";
    if (_warehouse)
        title = "冷库出库";
    $(document).attr("title", title);
    title = function () {
        if (_paperid) {
            return ("正在拣货-" + _paperid);
        } else if (_warehouse) {
            return (`${gv.get("WAREHOUSE", _warehouse)}出库`);
        } else if (_setting && _setting.SETTING && _setting.SETTING != "[]" && _setting.SETTING.length > 0) {
            let json = _setting.SETTING;
            let str = (_setting.TYPE == "PICK" ? "按拣货点" : "按生产线") + ":";
            let items = [];
            for (let item of json) { items.push(item.name); }
            str += items.join("、");
            return (`发料拣配<br/>${str}`);
        } else {
            return "发料拣配";
        }
    };
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

    if (_paperid) {
        $(container).find("#over").on("click", function () {
            if (_paperid) {
                overPaper(_paperid);
            }
        });
    }
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
}

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            if (_type == "PICKED_COLD") {
                _warehouse = 2;
                $("#suTr").removeClass("hidden");
                $("#topCtrlContainer").hide();
                initPick();
            } else {
                $("#suTr").addClass("hidden");
                _warehouse = "";
                gf.doAjax({
                    url: `/app/conf/getByUser.shtml`,
                    data: { TABLE_KEY: "PICKING_SETTING" },
                    dataType: "json",
                    timeout: 5000,
                    success: function (setting) {
                        _setting = setting;
                        initSetting(_setting);
                        initPick();
                    }
                });
            }
        },
        methods: {
            tuEnter: function () {
                sub();
            },
            suEnter: function () {
                sub();
            },
        }
    });
}

initRf();