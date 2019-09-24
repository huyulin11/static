import { gotoRfMgr, currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";
import { initPaperOp, overPaper } from "/s/buss/wms/j/base/wms.paper.op.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            var paperid = gf.urlParam("paperid");
            if (paperid) setCurrentShipmentPaperid(paperid);
            initShipment();
            if (!currentShipmentPaperid()) {
                $(container).append(`<iframe class="frame" id="frame" style="width: 100%; height: 75%;"></iframe>`);
                $("#frame").attr("src", "/s/buss/wms/h/shipmentMainMgr.html?status=2");
            } else {
                $(container).find("h1").each(function () {
                    $(this).html("正在出库" + currentShipmentPaperid());
                    $(container).find("table").show();
                    $(container).find("#sub").on("click", function () { sub(); });
                    initPaperOp("shipment");
                    $(container).find("#over").on("click", function () {
                        if (currentShipmentPaperid()) {
                            overPaper(currentShipmentPaperid());
                        }
                    });
                    $("#su").focus();
                });
            }

            $(container).find("#layout").on("click", function () {
                window.location.href = "/logout.shtml";
            });
            $(container).find("#gotoRfMgr").on("click", function () {
                gotoRfMgr();
            });
            gf.resizeTable();
        },
        methods: {
            suEnter: function () {
                $("#tu").focus();
            },
            tuEnter: function () {
                sub();
            },
        }
    });
}

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
    if (currentShipmentPaperid()) {
        gf.doAjax({
            url: `/shipment/detail/addItem.shtml?paperid=${currentShipmentPaperid()}`,
            data: { item: su, userdef3: tu },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                layer.msg(data.msg + ":su:" + su + ",tu:" + tu);
                if (data.code >= 0) {
                    $("#su").val("");
                    $("#tu").val("");
                }
                $("#su").focus();
            }
        });
    } else {
        return;
    }
}

var initShipment = function () {
    if (currentShipmentPaperid()) {
        let url = `/shipment/main/findOneData.shtml`;
        gf.ajax(url, { paperid: currentShipmentPaperid() }, "json", function (s) {
            if (s.code < 0) {
                layer.msg(currentShipmentPaperid() + s.msg);
                setCurrentShipmentPaperid("");
                return;
            }
            let main = s.object.main;
            if (!main || main["status"] != "TAKED" || main["delflag"] != "0") {
                layer.msg(currentShipmentPaperid() + "该单无法继续操作，如需查看请移步出库单管理！");
                setCurrentShipmentPaperid("");
                return;
            } else {
                $(container).find("h1").each(function () {
                    $(this).html("正在出库" + currentShipmentPaperid());
                });
            }
        });
    }
}

initRf();