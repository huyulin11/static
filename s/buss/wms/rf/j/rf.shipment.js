import { currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

let container = "#rootContainer";

var sub = function () {
    let su = $("#su").val();
    let tu = $("#tu").val();
    if (!su || !tu) {
        gflayer.msg("tu与su均不能为空！");
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
                gflayer.msg(data.msg);
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
    let title = "出库操作";
    if (currentShipmentPaperid()) {
        let url = `/shipment/main/findOneData.shtml`;
        gf.ajax(url, { paperid: currentShipmentPaperid() }, "json", function (s) {
            if (s.code < 0) {
                gflayer.msg(currentShipmentPaperid() + s.msg);
                setCurrentShipmentPaperid("");
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "TOSEND" && main["status"] != "PICKING") || main["delflag"] != "0") {
                gflayer.msg(currentShipmentPaperid() + "该单无法继续操作，如需查看详情，请移步出库管理！");
                setCurrentShipmentPaperid("");
                return;
            } else {
                title = "正在出库" + currentShipmentPaperid();
            }
        });
    }
    $(container).find("h2").html(title);
    $(document).attr("title", title);
}

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
                $("#frame").attr("src", "/s/buss/wms/h/shipmentMainMgr.html?status=2:TAKED:PICKED");
            } else {
                $(container).find("table").show();
                $(container).find("#sub").on("click", function () { sub(); });
                initPaperOp("shipment");
                $(container).find("#over").on("click", function () {
                    if (currentShipmentPaperid()) {
                        overPaper(currentShipmentPaperid());
                    }
                });
                $("#su").focus();
            }

            $(container).find("#layout").on("click", function () {
                window.location.href = "/logout.shtml";
            });
            $(container).find("#back").on("click", function () {
                window.history.back();
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

initRf();