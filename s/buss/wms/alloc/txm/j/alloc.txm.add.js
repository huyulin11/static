import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import "/s/buss/g/j/dynamic.rows.add.js";

var _conf;

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

initRows(_conf);