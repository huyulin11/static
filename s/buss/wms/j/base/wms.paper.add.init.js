import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { initMainColsData } from "/s/buss/wms/j/base/wms.paper.add.init.form.main.js";
import { initDetailColsData } from "/s/buss/wms/j/base/wms.paper.add.init.form.detail.js";

let _tasktype;

var _initCols = function () {
    let _cols = initMainColsData(_tasktype);
    for (let col of _cols) {
        let obj = $(`<div class="col"><label>${col.notnull ? "*" : ""}${col.name}</label></div>`);
        obj.append(getInput(col));
        if (typeof col.hide == "boolean" && col.hide) { obj.addClass("hidden"); }
        if (typeof col.hide == "function" && col.hide()) { obj.addClass("hidden"); }
        $("#cols").append(obj);
    }
    renderAll();
}

export var initForm = function (tasktype, _conf, callback) {
    doInitForm(tasktype, _conf, callback);
}

var doInitForm = function (tasktype, _conf, callback) {
    _tasktype = tasktype;
    _initCols();
    initDetailColsData(_tasktype, _conf);
    callback();
}