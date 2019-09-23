import { gotoRfMgr, currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";

$("#rootContainer").find("#layout").on("click", function () {
    window.location.href = "/logout.shtml";
});
$("#rootContainer").find("button#gotoRfMgr").on("click", function () {
    gotoRfMgr();
});
if (currentShipmentPaperid()) {
    $("#rootContainer").find("h1").each(function () {
        $(this).html("正在出库" + currentShipmentPaperid());
    });
} else {
    $("#rootContainer").append(`<iframe class="frame" id="frame" style="width: 100%; height: 75%;"></iframe>`);
    $("#frame").attr("src", "/s/buss/wms/h/shipmentMainMgr.html?status=2");
}