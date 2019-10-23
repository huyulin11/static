import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";

let _tasktype;
var _initCols = function () {
    let _cols;
    if (_tasktype == 'inventory') {
        _cols = [
            { label: "盘点类型", name: "inventorytype", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, id: "inventorytype" },
        ];
    } else if (_tasktype == 'receipt') {
        _cols = [
            { label: "目标仓库", name: "warehouse", type: "jsSelect", patten: "WAREHOUSE", notnull: true, id: "warehouse" },
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { label: "目标仓库", name: "warehouse", type: "jsSelect", patten: "WAREHOUSE", notnull: true, id: "warehouse" },
        ];
    } else if (_tasktype == "transfer") {
        _cols = [
            { label: "源仓库", name: "sourcewh", type: "jsSelect", patten: "WAREHOUSE", notnull: true, id: "sourcewh" },
            { label: "目标仓库", name: "targetwh", type: "jsSelect", patten: "WAREHOUSE", notnull: true, id: "targetwh" },
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
    } else if (_tasktype == 'receipt') {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "TU",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    } else if (_tasktype == 'shipment') {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "TU",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    }
}