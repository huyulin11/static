$(function () {

    var getLapList = function () {
        jQuery.ajax({
            url: "/getLapList.shtml",
            type: "post",
            dataType: "json",
            success: function (data) {
                $.each(data, function (n, value) {
                    var tmpStr = "<td><div>" + value.lapName + "（对应AGV：" + value.agvIds + "）"
                        + "<button id='" + value.id + "'" + ">一键发送任务" + "</button></div></td>";
                    $("tr.lapOpTr").append("<td><div>"
                        + sku.select({ "skuId": value.skuId, "environment": value.environment }) +
                        "<button data-id='" + value.id + "' class='change'"
                        + ">" + "更新生产品种" + "</button>"
                        + "</div></td>");
                    $("tr.lapTr").append(tmpStr);
                });
            },
            error: function () {
                console.log("数据中断，稍后重试！");
                //window.location.href = "/";
            },
            timeout: 5000
        });
    }

    var changeSku = function (lapId, skuId) {
        jQuery.ajax({
            url: "/json/wms/changeSku.shtml?lapId=" + lapId + "&skuId=" + skuId,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data > 0) {
                    sku.getSkuInfo();
                    alert("更新成功");
                }
            },
            error: function () {
                console.log("数据中断，稍后重试！");
                //window.location.href = "/";
            },
            timeout: 5000
        });
    }

    var init = function () {
        $("tr.lapOpTr").delegate("button", "click", function () {
            var skuId = $(this).parents("td").find("select option:selected").attr("value");
            var skuName = $(this).parents("td").find("select option:selected").html();
            if (window.confirm('你确定要将' + $(this).data("id") + '号机械手的生产产品更换为：' + skuName + '吗？')) {
                changeSku($(this).data("id"), skuId);
            }
        });

        $("tr.lapTr").delegate("button", "click", function () {
            if (window.confirm('系统将发送任务到' + $(this).attr("id") + '号机械手对应的AGV，确定继续吗？')) {
                alert(agv.addATaskBySystem($(this).attr("id")));
            }
        });

        getLapList();
    }

    init();
});
