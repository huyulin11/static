var doRender = function (allAlloc) {
    allAlloc.forEach(function (rowAlloc) {
        var tmpStr = "";
        rowAlloc.forEach(function (colAlloc) {
            if (typeof colAlloc == "number") {
                return;
            }
            var tmpColStr = "";
            colAlloc.forEach(function (allocationInfo) {
                if (typeof allocationInfo == "number") {
                    return;
                }
                if (allocationInfo.delflag == '0') {
                    var disabled = "";
                    var showInfo;
                    if (allocationInfo.text) {
                        showInfo = allocationInfo.text;
                    } else {
                        showInfo = "位" + allocationInfo.id;
                    }
                    var skuInfo = "<font style='font-size: 10px;'>" + ((allocationInfo.status != 1) ? sku.value(allocationInfo.skuId) : "空") + "</font>";
                    var weightNum = "<font style='font-weight: bolder;'>" + ((allocationInfo.status != 1) ? allocationInfo.num : "0") + "</font>";
                    showInfo = skuInfo + "<hr/>" + weightNum + "<hr/>" + showInfo;
                    tmpColStr = tmpColStr + "<tr><td><div><button "
                        + "data-id='" + allocationInfo.id + "'"
                        + " data-rowId='" + allocationInfo.rowId + "'"
                        + " data-colId='" + allocationInfo.colId + "'"
                        + " data-zId='" + allocationInfo.zId + "'"
                        + " data-text='" + allocationInfo.text + "'"
                        + " data-num='" + allocationInfo.num + "'"
                        + " data-status='" + allocationInfo.status + "'"
                        + " data-skuid='" + allocationInfo.skuId + "'"
                        + disabled + ">" + showInfo + "</button></div></td></tr>";
                } else {
                    tmpColStr = tmpColStr + "<tr><td></td></tr>";
                }
                tmpColStr = tmpColStr;
            });
            tmpStr = tmpStr + "<td><table>" + tmpColStr + "</table></td>";
        });
        $("table.alloc").append(
            "<tr class='allocTr'>" + tmpStr + "</tr>");
    });
}

var dealData = function (data) {
    var allAlloc = new Map();
    var maxColumn = 0;
    for (var allocationInfo of data) {
        var rowAlloc = allAlloc.get(allocationInfo.rowId);
        if (!rowAlloc) {
            rowAlloc = new Map();
            rowAlloc.set("maxColumn", 0);
        }
        var colAlloc = rowAlloc.get(allocationInfo.colId);
        if (!colAlloc) {
            colAlloc = new Map();
            colAlloc.set("maxZ", 0);
        }
        colAlloc.set(allocationInfo.zId, allocationInfo);
        colAlloc.set("maxZ", colAlloc.get("maxZ") + 1);

        rowAlloc.set(allocationInfo.colId, colAlloc);

        rowAlloc.set("maxColumn", rowAlloc.get("maxColumn") + 1);
        allAlloc.set(allocationInfo.rowId, rowAlloc);
    }
    return allAlloc;
}

export var render = function (data) {
    var allAlloc = dealData(data);
    doRender(allAlloc);
}