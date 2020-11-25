import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { gcol } from "/s/buss/g/j/g.col.js";

var renderOne = function (allocInfo) {
    if (allocInfo.delflag != '0') {
        return "";
    }
    var tmpStr = "";
    var disabled = "";
    var skuTypeName = ((allocInfo.status != 1) ? sku.value(allocInfo.skuId) : "空");
    skuTypeName = (!skuTypeName) ? "普通货物" : skuTypeName;
    var skuInfo = `<font style='font-size: 10px;'>${skuTypeName}</font>`;
    var num = `<font style='font-weight: bolder;'>${((allocInfo.status != 1) ? allocInfo.num : "0")}</font>`;
    let showInfos = [];
    showInfos.push("物料:" + skuInfo);
    showInfos.push("数量:" + num);
    showInfos.push("货位:" + allocInfo.text);
    if (allocInfo.stock) {
        let stockJson = JSON.parse(allocInfo.stock);
        if (stockJson instanceof Array) {
            let detailInfo = [];
            for (let item of stockJson) {
                let oneInfo = [];
                for (let i in item) {
                    oneInfo.push(`${gcol.getColName(i)}-${item[i]}`);
                }
                detailInfo.push(oneInfo.join(";"));
            }
            showInfos.push("明细:" + `<div>${detailInfo.join("<hr/>")}</div>`);
        } else if (stockJson instanceof Object) {
            showInfos.push("批次:" + stockJson.lot);
            showInfos.push("条码:" + stockJson.txm);
        }
    }
    tmpStr = `<button class='item'
            data-id='${allocInfo.id}' data-rowId='${allocInfo.rowId}'
            data-colId='${allocInfo.colId}' data-zId='${allocInfo.zId}'
            data-text='${allocInfo.text}' data-num='${allocInfo.num}'
            data-status='${allocInfo.status}' data-skuid='${allocInfo.skuId}'
            ${disabled} >${showInfos.join("<hr/>")} </button>`;
    if (localStorage.projectKey == 'BJJK_HUIRUI') {
        let shipmentBtn = `<button class='shipment'
            data-id='${allocInfo.id}' data-rowId='${allocInfo.rowId}'
            data-colId='${allocInfo.colId}' data-zId='${allocInfo.zId}'
            data-text='${allocInfo.text}' data-num='${allocInfo.num}'
            data-status='${allocInfo.status}' data-skuid='${allocInfo.skuId}'
            ${disabled} style='min-height:30px;width: 49%;'>发起出库</button>`;
        let receiptBtn = `<button class='receipt'
            data-id='${allocInfo.id}' data-rowId='${allocInfo.rowId}'
            data-colId='${allocInfo.colId}' data-zId='${allocInfo.zId}'
            data-text='${allocInfo.text}' data-num='${allocInfo.num}'
            data-status='${allocInfo.status}' data-skuid='${allocInfo.skuId}'
            ${disabled}  style='min-height:30px;width: 49%;'>发起入库</button>`;
        tmpStr += shipmentBtn + receiptBtn;
    }
    tmpStr = `<div class='allocDiv'>${tmpStr}</div>`;
    return tmpStr;
}


let flag = false;
var toRender = function (data, conf) {
    if (!data || data.length == 0) return;
    let _conf = { data: data, numInLine: 4, numInPage: 1000, render: renderOne, target: "table.alloc", callback: () => gf.resizeTable() };
    Object.assign(_conf, conf);
    gfbtn.renderBtnTable(_conf);
}

export var allocRender = function (data, conf) {
    if (flag) return;
    try {
        flag = true;
        toRender(data, conf);
    } finally {
        flag = false;
    }
}