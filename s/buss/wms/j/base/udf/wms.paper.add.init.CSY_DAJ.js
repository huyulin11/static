import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let _tasktype;
var _initCols = function () {
    let _cols;
    if (_tasktype == 'inventory') {
        _cols = [
            { name: "盘点类型", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype" },
        ];
    } else if (_tasktype == 'receipt') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
            { name: "出入口", type: "jsSelect", patten: "ACS_CACHE_CABLE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
            { name: "出入口", type: "jsSelect", patten: "ACS_CACHE_CABLE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    }

    for (let col of _cols) {
        let obj = $(`<div class="col"><label>${col.name}</label></div>`);
        obj.append(getInput(col));
        if (col.hide) { obj.addClass("hidden"); }
        $("#cols").append(obj);
    }
    renderAll();
}

export var initUdf = function (tasktype, _conf) {
    _tasktype = tasktype;
    _initCols();
    if (_tasktype == 'inventory') {
        _conf.items = [{
            key: "allocItem",
            alias: "userdef1",
            name: "纵号/行号（全盘无需填写）",
            notnull: true,
            type: "input",
        },];
    } else if (localStorage.projectKey == 'CSY_DAJ') {
        $("#warehouse").data("notnull", false);
        let obj = {
            max: 6,
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
}