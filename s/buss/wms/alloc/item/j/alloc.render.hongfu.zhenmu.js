import { sku } from "/s/buss/wms/sku/wms.sku.js";
import { gf } from "/s/buss/g/j/g.f.js";

var renderOne = function (allocationInfo) {
    var tmpStr = "";
    if (allocationInfo.delflag == '0') {
        var disabled = "";
        var showInfo;
        if (allocationInfo.text) {
            showInfo = allocationInfo.text;
        } else {
            showInfo = "位" + allocationInfo.id;
        }
        var skuTypeName = ((allocationInfo.status != 1) ? sku.value(allocationInfo.skuId) : "空");
        skuTypeName = (!skuTypeName) ? "普通货物" : skuTypeName;
        var skuInfo = "<font style='font-size: 10px;'>" + skuTypeName + "</font>";
        var weightNum = "<font style='font-weight: bolder;'>" + ((allocationInfo.status != 1) ? allocationInfo.num : "0") + "</font>";
        showInfo = skuInfo + "<hr/>" + weightNum + "<hr/>" + showInfo;
        tmpStr = "<td><div><button "
            + "data-id='" + allocationInfo.id + "'"
            + " data-rowId='" + allocationInfo.rowId + "'"
            + " data-colId='" + allocationInfo.colId + "'"
            + " data-zId='" + allocationInfo.zId + "'"
            + " data-text='" + allocationInfo.text + "'"
            + " data-num='" + allocationInfo.num + "'"
            + " data-status='" + allocationInfo.status + "'"
            + " data-skuid='" + allocationInfo.skuId + "'"
            + disabled + ">" + showInfo
            + "</button></div></td>";
    }
    return tmpStr;
}

var doRender = function (allAlloc) {
    var index = 1;
    var numInLine = 4;
    var tmpStr = "";
    for (var allocationInfo of allAlloc) {
        var tmpItemStr = renderOne(allocationInfo);
        if (!tmpItemStr) continue;
        tmpStr = tmpStr + tmpItemStr;
        if (index >= numInLine) {
            $("table.alloc").append("<tr class='allocTr'>" + tmpStr + "</tr>");
            index = 1;
            tmpStr = "";
        } else {
            index++;
        }
    }
    if (tmpStr) {
        $("table.alloc").append("<tr class='allocTr'>" + tmpStr + "</tr>");
    }
}

var dealData = function (data) {
    if (data.length > 1000) {
        return data.slice(0, 1000);
    }
    return data;
}

let flag = false;

export var render = function (data) {
    if (flag) return;
    try {
        flag = true;
        toRender(data);
    } finally {
        flag = false;
    }
}

var toRender = function (data) {
    if (!data || data.length == 0) return;
    var filterData = dealData(data);
    doRender(filterData);
    gf.resizeTable();
}