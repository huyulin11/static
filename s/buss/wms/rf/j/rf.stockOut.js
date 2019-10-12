import { gotoRfMgr, currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { overPaper } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

var initShipment = function () {
}

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            initShipment();
            $(container).append(`<iframe class="frame" id="frame" style="width: 100%; height: 75%;"></iframe>`);
            $("#frame").attr("src", "/s/buss/wms/h/shipmentMainMgr.html?status=2,TAKED,SCANED");

            $(container).find("#layout").on("click", function () {
                window.location.href = "/logout.shtml";
            });
            $(container).find("#gotoRfMgr").on("click", function () {
                gotoRfMgr();
            });
            gf.resizeTable();
        },
    });
}

initRf();