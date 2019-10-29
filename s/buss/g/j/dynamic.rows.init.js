import { gv } from "/s/buss/g/j/g.v.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

var _conf, _initData;
let _serial = 0;

export var getItem = (data) => {
    var ss = "";
    _serial++;
    for (let item of _conf.items) {
        var itemDesc = "";
        var value = "";
        if (data) {
            value = (data[item.key]) ? data[item.key] : "";
            if (!value && item.alias && data[item.alias]) { value = data[item.alias]; }
        } else {
            if (!value && item.default) { value = item.default; }
        }
        if (_conf.model == 'VIEW') {
            if ("select" == item.type) {
                let dics = gv.getT(item.dic);
                for (let dic of dics) {
                    if (data && dic.key == data[item.key]) { value = dic.value; break; }
                }
            }
            itemDesc = `${item.name + ':' + value}`;
        } else {
            itemDesc += getInput(item, { data: data, value: value, serial: _serial })[0].outerHTML;
        }
        ss += `<div class="row">${itemDesc}</div>`;
    }
    let _status = (data) ? "UPDATE" : "NEW";
    ss += `<div class="row" style="display:none;">
        <input type="text" id="_status${_serial}" name="_status[${_serial}]" 
        value="${_status}" data-value="${_status}" autocomplete="off"></div>`;
    let delOp = `<div title="删除" class="delOne op item-op"></div>`;
    return `
    <div class="${_conf.targetClass}" id="${_conf.targetClass}-${_serial}">
    ${ss}${_conf.model == 'VIEW' ? '' : delOp}
    </div>`;
}

var checkDel = () => {
    if ($(`div.${_conf.targetClass}`).length <= 0) {
        $("div.delOne").hide();
    } else {
        $("div.delOne").show();
    }
}

var addItem = (data) => {
    if ($(`div.${_conf.targetClass}:not(.delete)`).length >= _conf.max) {
        layer.msg(`最大数量不能多于${_conf.max}个`);
        return;
    }
    $(_conf.container).append(getItem(data));
    checkDel();
}

export var initRows = (conf, initData) => {
    _conf = conf;

    if (_conf.model == 'VIEW') {
        $(_conf.addBtn).hide();
        $(_conf.subBtn).hide();
    }

    _initData = initData;

    checkDel();
    $(_conf.container).html("");

    $(_conf.addBtn).off("click");
    $(_conf.container).off("click");

    if (_initData) {
        for (let data of _initData) {
            addItem(data);
        }
    }

    $(_conf.addBtn).on("click", function () {
        addItem();
    });

    $(_conf.container).on("click", "div.delOne", function () {
        let target = $(this).parents(`div.${_conf.targetClass}`);
        let status = target.find("[id^='_status']").data("value");
        if (_conf.dellogic && status != "NEW") {
            target.addClass("delete");
            target.find("[id^='_status']").val("DELETE");
        } else {
            target.remove();
        }
        checkDel();
    });

    $(_conf.container).on("focus", "input,select", function () {
        let tips = $(this).attr("placeholder");
        if (!tips) { tips = $(this).find("option[value='']").html(); }
        if (layer && tips) {
            layer.tips(tips, this, {
                tips: [1, '#3595CC'],
                time: 4000
            });
        }
    });
}
