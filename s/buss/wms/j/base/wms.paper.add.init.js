import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { initMainColsData, initDetailColsData } from "/s/buss/wms/j/base/wms.paper.add.init.form.conf.js";

export var initForm = function (_conf, callback) {
    doInitForm(_conf, callback);
}

var doInitForm = function (_conf, callback) {
    let _cols = initMainColsData(_conf.tasktype);
    for (let col of _cols) {
        let obj = $(`<div class="col"><label>${col.notnull ? "*" : ""}${col.name}</label></div>`);
        obj.append(getInput(col));
        if (typeof col.hide == "boolean" && col.hide) { obj.addClass("hidden"); }
        if (typeof col.hide == "function" && col.hide()) { obj.addClass("hidden"); }
        $("#cols").append(obj);
    }
    renderAll();
    initDetailColsData(_conf);
    callback();
}