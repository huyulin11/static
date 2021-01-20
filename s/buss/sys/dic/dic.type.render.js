import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { dictype } from "/s/buss/sys/dic/dic.type.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import "/s/buss/sys/dic/dic.type.add.js";

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
    } else {
        initRows(_conf);
    }
}

window.addEventListener('ASSOCIATING_VAL_CHOOSED', function (event) {
    console.log('选择操作的类型为：', event.detail.val);
    dictype(event.detail.val, doInitRows);
});

window.addEventListener('ASSOCIATING_VAL_CHANGED', function (event) {
    console.log('选择操作的类型值变化为：', event.detail.val);
    $(_conf.addBtn).addClass("hidden");
    initRows(_conf);
});

if (gf.urlParam("dictype")) {
    dictype(gf.urlParam("dictype"), doInitRows);
}