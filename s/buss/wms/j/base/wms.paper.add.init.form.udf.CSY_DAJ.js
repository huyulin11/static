import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";

export var initDetailColsData = function (_tasktype, _conf) {
    $("#warehouse").data("notnull", false);
    let obj = {
        max: 100,
        items: [{
            key: "allocItem",
            alias: "userdef1",
            name: "货位名称",
            notnull: true,
            type: "associating-input",
            searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
            containerofinput: "#panelBody",
            showcol: 'text,getStatus(status)'
        },]
    }
    Object.assign(_conf, obj);
}

export var initMainColsData = function (_tasktype) {
    let _cols;
    if (_tasktype == 'inventory') {
        _cols = [
            { name: "盘点类型", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype" },
        ];
    } else if (_tasktype == 'receipt') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse", defaultValue: '1', },
            { name: "出入口", type: "jsSelect", patten: "ACS_CACHE_CABLE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse", defaultValue: '1', },
            { name: "出入口", type: "jsSelect", patten: "ACS_CACHE_CABLE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    }
    return _cols;
}