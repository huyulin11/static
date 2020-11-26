import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { submitForm } from "/s/buss/g/j/dynamic.rows.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { initForm } from "/s/buss/wms/j/base/wms.paper.add.init.js";

let _receipttype = gf.urlParam("receipttype");

let _tasktype = null;
let _paper = null;
export var formPaperid = null;

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
    formConf.tasktype = tasktype;
    formPaperid = gf.urlParam("paperid");
    _paper = sessionStorage.paper;
    if (formPaperid) {
        _initEditPage();
    } else {
        _initAddPage();
    }
}

let _initAddPage = () => {
    let __initAddPage = () => {
        $("#form").attr("action", `/${_tasktype}/detail/addEntity.shtml?receipttype=${_receipttype}`);
        if (_paper) {
            sessionStorage.paper = "";
            _paper = JSON.parse(_paper);
            _doInitPage(_paper);
            initRows(formConf, _paper.list);
            return;
        } else {
            initRows(formConf);
            return;
        }
    };
    initForm(formConf, __initAddPage);
};

let _initEditPage = () => {
    let _doInitEditPage = (s) => {
        let main = s.object.main;
        let details = s.object.detail;
        if (main["status"] != "NEW" || main["delflag"] != "0") {
            gf.layerMsg("该单无法修改！");
            parent.layer.close(parent.pageii);
            return;
        }
        _doInitPage(main);
        initRows(formConf, details);
    };
    if (_tasktype == "transfer" && localStorage.projectKey == "BJJK_HUIRUI") {
        $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml`);
    } else {
        $("#form").attr("action", `/${_tasktype}/detail/editEntity.shtml?paperid=${formPaperid}`);
    }
    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: formPaperid, receipttype: _receipttype }, "json", function (s) {
        formConf.data = s.object;
        initForm(formConf, () => { _doInitEditPage(s); });
    });
};

var _doInitPage = function (obj) {
    $("#panelBody").find("select,input").each(function () {
        let v = obj[$(this).attr("name")];
        let a = obj[$(this).data("alias")];
        if (v) { $(this).val(v); }
        else if (a) { $(this).val(a); }
        if (a || v) { $(this).trigger("init"); }
    });
}

$("#sub").on("click", function () {
    submitForm();
});