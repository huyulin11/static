import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import "/s/buss/g/j/dynamic.rows.add.js";
import { gf } from "/s/buss/g/j/g.f.js";

let _tasktype = null;
let _paperid = null;
let _conf = {
    container: "div#rows",
    targetClass: "item-group",
    addBtn: "div.addOne",
    serial: 0,
    max: 20,
};

export var init = function (tasktype) {
    _tasktype = tasktype;

    if (_tasktype == 'inventory') {
        _conf.items = [{
            key: "allocItem",
            alias: "userdef1",
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
    } else {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "allocItem",
                alias: "userdef1",
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
    _initPage();
}


var _initPage = function () {
    _paperid = gf.urlParam("paperid");

    if (!_paperid) {
        $("#form").attr("action", `/${_tasktype}/detail/addEntity.shtml`);
        initRows(_conf);
        return;
    }
    $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml?paperid=${_paperid}`);

    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: _paperid }, "json", function (s) {
        let main = s.object.main;
        let details = s.object.detail;
        if (main["status"] != "1" || main["delflag"] != "0") {
            alert("该单无法修改！");
            parent.layer.close(parent.pageii);
            return;
        }
        $("#panelBody").find("select,input").each(function () {
            let v = main[$(this).attr("name")];
            if (v) { $(this).val(v); }
            else if (main[$(this).data("alias")]) { $(this).val(main[$(this).data("alias")]); }
        });
        initRows(_conf, details);
    });
}