import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";
import "./rf.picking.setting.js";

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");
let _warehouse = gf.urlParam("warehouse");

var sub = function () {
    let tu = $("#tu").val();
    if (!tu) {
        layer.msg("tu不能为空！");
        if (!tu) {
            $("#tu").focus();
        }
        return;
    }

    gf.doAjax({
        url: `/shipment/detail/addPickingItem.shtml`,
        data: { userdef3: tu, paperid: _paperid, warehouse: _warehouse },
        success: function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            layer.msg(data.msg + "tu:" + tu);
            if (data.code >= 0) {
                $("#tu").val("");
            }
            $("#tu").focus();
        }
    });
}

var initPick = function () {
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
        } else {
            return (`未找到拣货识别数据`);
        }
    };
    $(container).find("h2").html(title);
    $(document).attr("title", title);

    $("#topCtrlContainer").prepend("<div id='settingHideDiv' class='close hideToggle' data-target='div#settingContainer'></div>");
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
        }
    });
}

initRf();