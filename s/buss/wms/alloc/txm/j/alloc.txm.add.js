import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { submitForm } from "/s/buss/g/j/dynamic.rows.add.js";

var _conf;

let _alloc = gf.urlParam("alloc");
$("#alloc").val(_alloc);
_conf = {
    container: "div#rows",
    targetClass: "item-group",
    addBtn: "div.addOne",
    serial: 0,
    max: 20,
    items: [{
        key: "txm",
        name: "条形码",
        notnull: true,
    }, {
        key: "skuid",
        name: "对应SKU",
        notnull: true,
    }, {
        key: "name",
        name: "货物名称",
        notnull: true,
    }, {
        key: "num",
        name: "数量",
        notnull: true,
    },]
}

if (localStorage.projectKey == "BJJK_HUIRUI") {
    _conf = {
        container: "div#rows",
        targetClass: "item-group",
        addBtn: "div.addOne",
        serial: 0,
        max: 20,
        items: [{
            key: "txm",
            name: "条形码",
            notnull: true,
        }, {
            key: "alloc",
            name: "货位",
            notnull: true,
            hide: true,
            default: _alloc,
            readonly: _alloc ? true : false,
        }, {
            key: "num",
            name: "数量",
            notnull: true,
        },]
    }
}

$("#sub").on("click", function () {
    submitForm();
});

initRows(_conf);