var initAllocColumn = function () {
    jQuery.ajax({
        url: "/json/wms/getAllocColumn.shtml?areaId=" + areaId,
        type: "post",
        dataType: "json",
        success: function (data) {
            var tmpStr;
            $.each(data, function (n, column) {
                var info;
                if (column.allowedSkuId == 0 && column.allowedSkuType == 0) {
                    info = "通用";
                } else {
                    if (column.allowedSkuId == -1) {
                        info = "空托盘";
                    }
                    if (column.allowedSkuId > 0) {
                        info = sku.value(column.allowedSkuId);
                    }
                    if (column.allowedSkuType > 0) {
                        info = (info ? (info + "<hr/>") : "") + sku.typevalue(column.allowedSkuType);
                    }
                }
                tmpStr = tmpStr + "<td><button class='inherit' "
                    + " data-colId='" + column.colId + "'"
                    + " data-allowedSkuId='" + column.allowedSkuId + "'"
                    + " data-allowedSkuType='" + column.allowedSkuType + "'"
                    + ">" + info + "</button></td>";
            });
            $("table.allocCol").append("<tr class='allocColTr'>" + tmpStr + "</tr>");
        },
        complete: function (data) {
        },
        error: function () {
        },
        timeout: 5000
    });
}

var areaId = 1;
areaId = window.urlSearcher.param("areaId");
if (!areaId) {
    areaId = 1;
}

setTimeout(function () {
    initAllocColumn();
    initAlloc();
}, 500);