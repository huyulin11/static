import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { dictype } from "/s/buss/sys/dic/dic.type.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import "/s/buss/sys/dic/dic.type.add.js";

let _dictype = gf.urlParam("dictype");
let _new_table = false;

var _conf = {
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
        name: "非空",
        type: "select",
        dic: "TRUE_OR_FALSE",
        notnull: true,
    },]
}

var renderCtrl = function (new_table) {
    if (!new_table || new_table != "true") { return; }
    $("#new_table").trigger("click");
    _new_table = true;
}

var doInitRows = (dictypeinfo) => {
    $(_conf.addBtn).removeClass("hidden");
    if (dictypeinfo && (!$("#dictype0").val() || !$("#remark0").val())) {
        $("#dictype0").val(dictypeinfo.dictype);
        $("#remark0").val(dictypeinfo.remark);
    }
    if (dictypeinfo && dictypeinfo.json) {
        var json = JSON.parse(dictypeinfo.json);
        console.log(json.items);
        initRows(_conf, json.items);
        renderCtrl(json.new_table);
    } else {
        initRows(_conf);
    }
}

let checkChangeFun = function (that) {
    if (!_dictype) { return; }
    if (_new_table && !that.checked) { that.checked = true; }
}

if (_dictype) { dictype(_dictype, doInitRows); }
$("#new_table").click(function (e) { checkChangeFun(this); });

window.addEventListener('ASSOCIATING_VAL_CHOOSED', function (event) {
    console.log('选择操作的类型为：', event.detail.val);
    dictype(event.detail.val, doInitRows);
});

window.addEventListener('ASSOCIATING_VAL_CHANGED', function (event) {
    console.log('选择操作的类型值变化为：', event.detail.val);
    $(_conf.addBtn).addClass("hidden");
    initRows(_conf);
});