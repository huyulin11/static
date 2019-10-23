import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInputHtml } from "/s/buss/g/j/g.input.render.js";

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
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
            {
                name: "拣货点",
                key: "company",
                notnull: true,
                type: "associating-input",
                searchurl: "/sys/lap/findFirstPage.shtml?lapInfoFormMap.type=PICK&name=",
                containerofinput: "#panelBody",
                showcol: 'name'
            },
            {
                name: "产线",
                key: "name",
                notnull: true,
                type: "associating-input",
                searchurl: "/sys/lap/findFirstPage.shtml?lapInfoFormMap.type=PROD_LINE&name=",
                containerofinput: "#panelBody",
                showcol: 'name'
            },
        ];
    } else if (_tasktype == "transfer") {
        _cols = [
            { name: "源仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "sourcewh" },
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "targetwh" },
        ];
    }

    let html = "";
    for (let col of _cols) {
        let selectStr = getInputHtml(col);
        html += `<div class="col">
            <label>${col.name}</label>${selectStr}
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