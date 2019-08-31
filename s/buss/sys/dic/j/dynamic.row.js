import { gv } from "/s/buss/g/j/g.v.js";

var _conf, _initData;

var getItem = (data) => {
    var ss = "";
    let serial = _conf.serial++;
    for (let item of _conf.items) {
        var itemDesc = "";
        var value = (data && data[item.key]) ? data[item.key] : (item.default ? item.default : "");
        if ("select" == item.type) {
            let dics = gv.getT(item.dic);
            itemDesc += `<option value="">----选择【${item.name}】----</option>`;
            for (let dic of dics) {
                itemDesc += `<option ${(data && dic.key == data[item.key]) ? "selected" : ""} value="${dic.key}">${dic.value}</option>`;
            }
            itemDesc = `<select id="${item.key}${serial}" name="${item.key}[${serial}]"
            data-notnull='${item.notnull}'>${itemDesc}</select>`;
        } else if ("associating-input" == item.type) {
            itemDesc = `
            <input type="text" id="${item.key}${serial}" name="${item.key}[${serial}]" 
                class="form-control associating-input" value="${value}"
                data-searchurl='${item.searchurl}' data-containerofinput="${item.containerofinput}" 
                data-showcol='${item.showcol}' placeholder="输入:${item.name}" 
                data-notnull='${item.notnull}' autocomplete="off">`;
        } else {
            itemDesc = `
            <input type="text" id="${item.key}${serial}" name="${item.key}[${serial}]" 
                class="form-control" value="${value}"
                placeholder="输入:${item.name}" data-notnull='${item.notnull}' autocomplete="off">`;
        }
        ss += `<div class="col">${itemDesc}</div>`;
    }
    let _status = (data) ? "UPDATE" : "NEW";
    ss += `<div class="col" style="display:none;">
    <input type="text" id="_status${serial}" name="_status[${serial}]" 
    value="${_status}" data-value="${_status}" autocomplete="off"></div>`;
    return `
    <div class="${_conf.targetClass} form-group" id="${_conf.targetClass}-${serial}">
    ${ss}<div title="删除" class="delOne op item-op"></div>
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
}
