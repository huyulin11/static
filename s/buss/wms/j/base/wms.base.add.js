import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import "/s/buss/g/j/dynamic.rows.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initUdf } from "./udf/wms.base.add.init.BJJK_HUIRUI.js";

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
    initUdf(_tasktype, _conf);
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