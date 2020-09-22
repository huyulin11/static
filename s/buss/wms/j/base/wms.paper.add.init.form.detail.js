import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";

let CSY_DAJ = (_tasktype, _conf) => {
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
};

let YZBD_NRDW = (_tasktype, _conf) => {
    $("head").append("<style>.block-tips div.item-group {width: 288px;}</style>");
    $("#warehouse").data("notnull", false);
    let obj;
    if (_tasktype == 'inventory') {
    } else if (_tasktype == 'receipt') {
        obj = {
            max: 100,
            items: [{
                key: "item",
                name: "类型",
                notnull: true,
                type: "associating-input",
                searchurl: "/sku/info/findByName.shtml?skuInfoFormMap.name=",
                containerofinput: "#panelBody",
                showcol: 'name',
                storeKey: "id",
                showFun: (key) => { return sku.value(key); },
            }, {
                key: "itemcount",
                name: "数量",
                notnull: true,
            }, {
                key: "userdef3",
                name: "尺寸",
                notnull: true,
            }, {
                key: "lot",
                name: "批次号",
                notnull: true,
            }, {
                key: "supplier",
                name: "供应商",
                notnull: false,
            },]
        }
    } else if (_tasktype == 'shipment') {
        obj = {
            max: 100,
            items: [{
                key: "item",
                name: "类型",
                notnull: true,
                type: "associating-input",
                searchurl: "/sku/info/findByName.shtml?skuInfoFormMap.name=",
                containerofinput: "#panelBody",
                showcol: 'name',
                storeKey: "id",
                showFun: (key) => { return sku.value(key); },
            }, {
                key: "itemcount",
                name: "数量",
                notnull: true,
            },]
        };
    }
    Object.assign(_conf, obj);
};

let BJJK_HUIRUI = (_tasktype, _conf) => {
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
            max: 200,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "货位号",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    } else if (_tasktype == 'shipment') {
        let obj = {
            max: 200,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "货位号",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    } else if (_tasktype == 'transfer') {
        let obj = {
            max: 200,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "货位（FROM）",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    }
};

export var initDetailColsData = function (_tasktype, _conf) {
    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
            CSY_DAJ(_tasktype, _conf);
            return;
        }
        case "YZBD_NRDW": {
            YZBD_NRDW(_tasktype, _conf);
            return;
        }
        case "BJJK_HUIRUI": {
            BJJK_HUIRUI(_tasktype, _conf);
            return;
        }
    }
}