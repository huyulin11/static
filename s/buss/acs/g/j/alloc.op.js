import { sku } from "/s/buss/acs/g/j/wms.sku.js";

export var allocOp = function (that) {
    var num = $("input.doChange").val();
    var selectSkuId = $("div#doChangeDiv").find("select").val();
    var selectSkuName = sku.value(selectSkuId);
    var status = $(that).data("status");
    if (status == 2 && num == 0) {
        if (!window.confirm('当前货位状态为锁定状态，将数量修改为0将会将状态修改为空，且会将对应货位正在执行的任务强制结束掉，是否继续？')) {
            return;
        }
    } else {
        if (!window.confirm('更换品种将修改该区域该列所有的货位内容为对应品种，' + '你确定要' + '修改' + $(that).data("text")
            + '货位的品种种类为' + selectSkuName + '，库存数量为' + num + '吗？')) {
            return;
        }
    }

    var param = "allocItemId=" + $(that).data("id") + "&num=" + num + "&skuId=" + selectSkuId;

    jQuery.ajax({
        url: "/json/wms/doChangeNum.shtml?" + param,
        type: "post",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
        error: function () {
            alert("更新失败！");
        },
        timeout: 5000
    });
}