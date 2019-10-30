import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { submitForm } from "/s/buss/g/j/dynamic.rows.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initUdf } from "./udf/wms.paper.add.init.js";

let _receipttype = gf.urlParam("receipttype");

let _tasktype = null;
let _paperid = null;
let _paper = null;

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
    _initRows();
}

var _initPage = function (obj) {
    $("#panelBody").find("select,input").each(function () {
        let v = obj[$(this).attr("name")];
        let a = obj[$(this).data("alias")];
        if (v) { $(this).val(v); }
        else if (a) { $(this).val(a); }
        if (a || v) { $(this).trigger("init"); }
    });
}

var _initRows = function () {
    _paperid = gf.urlParam("paperid");
    _paper = sessionStorage.paper;

    if (!_paperid) {
        $("#form").attr("action", `/${_tasktype}/detail/addEntity.shtml?receipttype=${_receipttype}`);
        if (_paper) {
            sessionStorage.paper = "";
            _paper = JSON.parse(_paper);
            _initPage(_paper);
            initRows(_conf, _paper.list);
            return;
        } else {
            initRows(_conf);
            return;
        }
    }

    $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml?paperid=${_paperid}`);
    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: _paperid, receipttype: _receipttype }, "json", function (s) {
        let main = s.object.main;
        let details = s.object.detail;
        if (main["status"] != "1" || main["delflag"] != "0") {
            layer.msg("该单无法修改！");
            parent.layer.close(parent.pageii);
            return;
        }
        _initPage(main);
        initRows(_conf, details);
    });
}

$("#sub").on("click", function () {
    submitForm();
});