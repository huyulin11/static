import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initSetting } from "/s/buss/wms/rf/j/rf.picking.setting.js";

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");
let _warehouse = gf.urlParam("warehouse");
let _type = gf.urlParam("type");
if (_type == "PICKED_COLD") {
    _warehouse = 2;
    $("#suTr").removeClass("hidden");
    $("#topCtrlContainer").hide();
} else {
    $("#suTr").addClass("hidden");
    _warehouse = "";
    initSetting();
}

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
        url: `/shipment/detail/addPickingItem.shtml`,
        data: { userdef3: tu, item: su, paperid: _paperid, warehouse: _warehouse, setting: localStorage.PICKED_SETTING, settingType: localStorage.PICKED_TYPE },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            layer.msg(data.msg + "tu:" + tu);
            if (data.code >= 0) {
                $("#tu").val("");
                $("#su").val("");
                initDatas();
            }
            $("#tu").focus();
        }
    });
}

let initDatas = function () {
    $("#datas iframe").attr("src", `/s/buss/wms/h/shipmentMainDetailMgr.html?status=2:SCANED&PICK=PICK&type=${_type}&warehouse=${_warehouse}`);
}

var initPick = function () {
    if (!$("#topCtrlContainer")) return;
    $("#topCtrlContainer").prepend("<div id='settingHideDiv' class='close hideToggle' data-target='div#settingContainer'></div>");

    if (_paperid) {
        let url = `/shipment/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                layer.msg(_paperid + s.msg);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "2" && main["status"] != "PICKED") || main["delflag"] != "0") {
                layer.msg(_paperid + "该单无法继续操作，如需查看详情，请移步出库管理！");
                return;
            }
        });
    }

    let title = function () {
        if (_paperid) {
            return ("正在拣货-" + _paperid);
        } else if (_warehouse) {
            return (`正在拣货-${gv.get("WAREHOUSE", _warehouse)}`);
        } else if (localStorage.PICKED_SETTING && localStorage.PICKED_SETTING != "[]") {
            let json = JSON.parse(localStorage.PICKED_SETTING);
            let str = (localStorage.PICKED_TYPE == "PICK" ? "按拣货点" : "按生产线") + ":";
            let items = [];
            for (let item of json) { items.push(item.name); }
            str += items.join("、");
            return (`正在拣货-${str}`);
        } else {
            return (`全库匹配拣货`);
        }
    };
    $(container).find("h2").html(title);
    $(document).attr("title", title);
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

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            initPick();
            if (_paperid) {
                $(container).find("#over").on("click", function () {
                    if (_paperid) {
                        overPaper(_paperid);
                    }
                });
            }
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
                sub();
            },
            suEnter: function () {
                sub();
            },
        }
    });
}

initRf();