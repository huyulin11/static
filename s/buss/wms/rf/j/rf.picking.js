import { gotoRfMgr } from "/s/buss/wms/rf/j/rf.main.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");

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
        url: `/shipment/detail/addPickingItem.shtml?paperid=${_paperid}`,
        data: { userdef3: tu },
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

var initShipment = function () {
    if (_paperid) {
        let url = `/shipment/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                layer.msg(_paperid + s.msg);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "TAKED" && main["status"] != "SCANED") || main["delflag"] != "0") {
                layer.msg(_paperid + "该单无法继续操作，如需查看请移步出库单管理！");
                return;
            } else {
                $(container).find("h1").each(function () {
                    $(this).html("正在出库" + _paperid);
                });
            }
        });
    }
}

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            initShipment();
            if (_paperid) {
                $(container).find("h1").each(function () {
                    $(this).html(`正在拣货${_paperid}`);
                });
                $(container).find("#over").on("click", function () {
                    if (_paperid) {
                        overPaper(_paperid);
                    }
                });
            } else {
                $(container).find("h1").each(function () {
                    $(this).html("正在拣货-混合拣货");
                });
            }
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
                sub();
            },
        }
    });
}

initRf();