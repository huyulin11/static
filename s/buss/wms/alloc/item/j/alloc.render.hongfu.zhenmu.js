import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gcol } from "/s/buss/g/j/g.col.js";

var renderOne = function (allocInfo) {
    var tmpStr = "";
    if (allocInfo.delflag == '0') {
        var disabled = "";
        var skuTypeName = ((allocInfo.status != 1) ? sku.value(allocInfo.skuId) : "空");
        skuTypeName = (!skuTypeName) ? "普通货物" : skuTypeName;
        var skuInfo = `<font style='font-size: 10px;'>${skuTypeName}</font>`;
        var weightNum = `<font style='font-weight: bolder;'>${((allocInfo.status != 1) ? allocInfo.num : "0")}</font>`;
        let showInfos = [];
        showInfos.push(skuInfo);
        showInfos.push(weightNum);
        showInfos.push(allocInfo.text);
        if (allocInfo.stock) {
            let detailInfo = [];
            let stockJson = JSON.parse(allocInfo.stock);
            for (let item of stockJson) {
                let oneInfo = [];
                for (let i in item) {
                    oneInfo.push(`${gcol.getColName(i)}-${item[i]}`);
                }
                detailInfo.push(oneInfo.join(";"));
            }
            showInfos.push("明细：" + `<div>${detailInfo.join("<hr/>")}</div>`);
        }
        tmpStr = `<div class='allocDiv'><button
            data-id='${allocInfo.id}'
            data-rowId='${allocInfo.rowId}'
            data-colId='${allocInfo.colId}'
            data-zId='${allocInfo.zId}'
            data-text='${allocInfo.text}'
            data-num='${allocInfo.num}'
            data-status='${allocInfo.status}'
            data-skuid='${allocInfo.skuId}'
            ${disabled} >${showInfos.join("<hr/>")}
            </button></div>`;
    }
    return tmpStr;
}

var dealData = function (data) {
    if (data.length > 1000) {
        return data.slice(0, 1000);
    }
    return data;
}

let flag = false;

var toRender = function (data) {
    if (!data || data.length == 0) return;
    var filterData = dealData(data);
    let conf = { data: filterData, numInLine: 4, render: renderOne, target: "table.alloc" };
    gf.renderBtnTable(conf);
    gf.resizeTable();
}

export var render = function (data) {
    if (flag) return;
    try {
        flag = true;
        toRender(data);
    } finally {
        flag = false;
    }
}