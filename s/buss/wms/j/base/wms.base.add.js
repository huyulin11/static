import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import "/s/buss/g/j/dynamic.rows.add.js";

var _conf;

if (localStorage.projectKey == 'CSY_DAJ') {
    $("#warehouse").data("notnull", false);
    _conf = {
        container: "div#rows",
        targetClass: "item-group",
        addBtn: "div.addOne",
        serial: 0,
        max: 20,
        items: [{
            key: "allocItem",
            name: "货位名称",
            notnull: true,
            type: "associating-input",
            searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
            containerofinput: "#panelBody",
            showcol: 'text,getStatus(status)'
        },]
    }
} else {
    _conf = {
        container: "div#rows",
        targetClass: "item-group",
        addBtn: "div.addOne",
        serial: 0,
        max: 20,
        items: [{
            key: "allocItem",
            name: "货位名称",
            notnull: true,
            type: "associating-input",
            searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
            containerofinput: "#panelBody",
            showcol: 'text,getStatus(status)',
        }, {
            key: "itemcount",
            name: "数量",
            notnull: true,
            default: 1,
        }, {
            key: "item",
            name: "货物种类",
            notnull: true,
            default: 1,
        },]
    }
}

initRows(_conf);