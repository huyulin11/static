import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { hideAddFun, showAddFun, formConf } from "/s/buss/wms/j/base/wms.paper.add.js";

export var initDetailColsData = function (_tasktype, _conf) {
    $("head").append("<style>.block-tips div.item-group {width: 288px;}</style>");
    $("#warehouse").data("notnull", false);
    let obj = {
        max: 100,
    };
    if (_tasktype == 'inventory') {
        hideAddFun();
    } else if (_tasktype == 'receipt') {
        obj.items = [{
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
            key: "lot",
            name: "批次号",
            notnull: true,
        }, {
            key: "supplier",
            name: "供应商",
            notnull: false,
        }, {
            key: "txm",
            name: "条码",
            notnull: true,
        },];
    } else if (_tasktype == 'shipment') {
        obj.items = [{
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
            key: "txm",
            name: "条码",
            notnull: false,
        },];
    }
    Object.assign(_conf, obj);
}

export var initMainColsData = function (_tasktype) {
    let _cols;
    if (_tasktype == 'inventory') {
        _cols = [{
            name: "盘点类型", type: "jsSelect", patten: "WMS_INVENTORY_TYPE", notnull: true, key: "inventorytype", defaultValue: 'FULL',
            bind: {
                event: "change", work: function (obj) {
                    let inventorytype = $(obj).find('select').val();
                    $(formConf.container).html("");
                    console.log(inventorytype);
                    if ('FULL' == inventorytype) {
                        hideAddFun();
                        formConf.items = [];
                        return;
                    }
                    showAddFun();
                    if ('SUPPLIER' == inventorytype) {
                        formConf.items = [{
                            key: "supplier",
                            name: "供应商",
                            notnull: true,
                        },];
                    } else if ('BATCH' == inventorytype) {
                        formConf.items = [{
                            key: "lot",
                            name: "批次号",
                            notnull: true,
                        },];
                    } else if ('SKU' == inventorytype) {
                        formConf.items = [{
                            key: "item",
                            name: "类型",
                            notnull: true,
                            type: "associating-input",
                            searchurl: "/sku/info/findByName.shtml?skuInfoFormMap.name=",
                            containerofinput: "#panelBody",
                            showcol: 'name',
                            storeKey: "id",
                            showFun: (key) => { return sku.value(key); },
                        },];
                    }
                }
            },
        },];
    } else if (_tasktype == 'receipt') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse", defaultValue: '1', },
        ];
    } else if (_tasktype == 'shipment') {
        _cols = [
            { name: "目标仓库", type: "jsSelect", patten: "WAREHOUSE", notnull: true, key: "warehouse", defaultValue: '1', },
        ];
    }
    return _cols;
}