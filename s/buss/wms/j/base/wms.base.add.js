import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import "/s/buss/g/j/dynamic.rows.add.js";

let _tasktype = null;

export var setTasktype = function (tasktype) {
    _tasktype = tasktype;
}

export var init = function () {
    var _conf = {
        container: "div#rows",
        targetClass: "item-group",
        addBtn: "div.addOne",
        serial: 0,
        max: 20,
    };

    if (_tasktype == 'INVENTORY') {
        _conf.items = [{
            key: "allocItem",
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
                name: "货位名称",
                notnull: true,
                type: "associating-input",
                searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
                containerofinput: "#panelBody",
                showcol: 'text,getStatus(status)'
            },]
        }
        Object.assign(_conf, obj);
    } else {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
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
        Object.assign(_conf, obj);
    }
    initRows(_conf);
}