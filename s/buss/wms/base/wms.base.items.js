import { initRows } from "/s/buss/sys/dic/j/dynamic.row.js";

var _conf;

if (localStorage.projectKey == 'CSY_DAJ') {
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
            key: "key",
            name: "键",
            notnull: true,
        }, {
            key: "name",
            name: "名称",
            notnull: true,
        }, {
            key: "notnull",
            name: "不能为空",
            type: "select",
            dic: "TRUE_OR_FALSE",
            notnull: true,
        },]
    }
}

initRows(_conf);