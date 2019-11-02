import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let _tasktype;
var _initCols = function () {
    let _cols;
    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
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
            break;
        }
        case "BJJK_HUIRUI": {
            if (_tasktype == 'inventory') {
                _cols = [
                    { name: "盘点类型", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype" },
                ];
            } else if (_tasktype == 'receipt') {
                _cols = [
                    { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
                ];
            } else if (_tasktype == 'shipment') {
                let isHide = function (a) {
                    if ($("#warehouse").val() != "1") { $(a).parents("div.col").addClass("hidden"); }
                    else { $(a).parents("div.col").removeClass("hidden"); }
                }
                _cols = [
                    {
                        name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse",
                    },
                    {
                        name: "目的地", key: "name", notnull: true, type: "associating-input",
                        searchurl: "/sys/lap/findFirstPage.shtml?lapInfoFormMap.type=PROD_LINE&name=",
                        containerofinput: "#panelBody", showcol: 'name', bind: { event: "init", work: isHide },
                    },
                ];
            } else if (_tasktype == "transfer") {
                _cols = [
                    { name: "源仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "sourcewh" },
                    { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "targetwh" },
                ];
            }
            break;
        }
        default: {
            if (_tasktype == 'inventory') {
                _cols = [
                    { name: "盘点类型", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype" },
                ];
            } else if (_tasktype == 'receipt') {
                _cols = [
                    { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse" },
                ];
            } else if (_tasktype == 'shipment') {
                let isHide = function (a) {
                    if ($("#warehouse").val() != "1") { $(a).parents("div.col").addClass("hidden"); }
                    else { $(a).parents("div.col").removeClass("hidden"); }
                }
                _cols = [
                    {
                        name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse",
                    },
                    {
                        name: "目的地", key: "name", notnull: true, type: "associating-input",
                        searchurl: "/sys/lap/findFirstPage.shtml?lapInfoFormMap.type=PROD_LINE&name=",
                        containerofinput: "#panelBody", showcol: 'name', bind: { event: "init", work: isHide },
                    },
                ];
            } else if (_tasktype == "transfer") {
                _cols = [
                    { name: "源仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "sourcewh" },
                    { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "targetwh" },
                ];
            }
        }
    }
    for (let col of _cols) {
        let obj = $(`<div class="col"><label>${col.name}</label></div>`);
        obj.append(getInput(col));
        if (typeof col.hide == "boolean" && col.hide) { obj.addClass("hidden"); }
        if (typeof col.hide == "function" && col.hide()) { obj.addClass("hidden"); }
        $("#cols").append(obj);
    }
    renderAll();
}

export var initUdf = function (tasktype, _conf) {
    _tasktype = tasktype;
    _initCols();

    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
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
            break;
        }
        case "BJJK_HUIRUI": {
            if (_tasktype == 'inventory') {
                _conf.items = [{
                    key: "allocItem",
                    alias: "userdef1",
                    name: "纵号/行号（全盘无需填写）",
                    notnull: true,
                    type: "input",
                },];
            } else if (_tasktype == 'receipt') {
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
            break;
        }
    }
}