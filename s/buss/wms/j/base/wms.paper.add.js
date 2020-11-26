import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { submitForm } from "/s/buss/g/j/dynamic.rows.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initForm } from "/s/buss/wms/j/base/wms.paper.add.init.js";

let _receipttype = gf.urlParam("receipttype");

let _tasktype = null;
let _paperid = null;
let _paper = null;

export let formConf = {
    container: "div#rows",
    targetClass: "item-group",
    addBtn: "div.addOne",
    serial: 0,
    max: 200,
};

export var hideAddFun = function () {
    $(formConf.addBtn).hide();
}, showAddFun = function () {
    $(formConf.addBtn).show();
};

export var init = function (tasktype) {
    _tasktype = tasktype;
    initForm(_tasktype, formConf, _initRows);
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
            initRows(formConf, _paper.list);
            return;
        } else {
            initRows(formConf);
            return;
        }
    }

    if (_tasktype == "transfer" && localStorage.projectKey == "BJJK_HUIRUI") {
        $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml`);
    } else {
        $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml?paperid=${_paperid}`);
    }
    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: _paperid, receipttype: _receipttype }, "json", function (s) {
        let main = s.object.main;
        let details = s.object.detail;
        if (main["status"] != "NEW" || main["delflag"] != "0") {
            gf.layerMsg("该单无法修改！");
            parent.layer.close(parent.pageii);
            return;
        }
        _initPage(main);
        initRows(formConf, details);
    });
}

$("#sub").on("click", function () {
    submitForm();
});