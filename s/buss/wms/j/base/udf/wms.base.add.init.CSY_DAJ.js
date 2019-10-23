import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";

let _tasktype;
var _initCols = function () {
    let _cols;
    if (_tasktype == 'inventory') {
        _cols = [
            { label: "盘点类型", name: "inventorytype", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype" },
        ];
    } else if (_tasktype == 'receipt') {
        _cols = [
            { label: "目标仓库", name: "warehouse", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
            { label: "出入口", name: "targetPlace", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { label: "目标仓库", name: "warehouse", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
            { label: "出入口", name: "targetPlace", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "targetPlace", alias: "name" },
        ];
    }

    let html = "";
    for (let col of _cols) {
        html += `<div class="col">
            <label>${col.label}</label>
            <select class="form-control ${col.type}" data-patten="${col.patten}" name="${col.name}"
                autocomplete="off" data-notnull="${col.notnull}" data-alias="${col.alias}" id="${col.id}"></select>
        </div>`;
    }
    $("#cols").html(html);
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