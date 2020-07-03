
import { gv } from "/s/buss/g/j/g.v.js";

export var getInput = (item, option, datas) => {
    let _data, _defaultValue, _serial, _width, _class;
    if (option) { _data = option.data, _defaultValue = option.value, _serial = option.serial, _width = option.width, _class = option.class; } else { _defaultValue = item.defaultValue; }
    _defaultValue = _defaultValue ? _defaultValue : "";
    let id, name, label = item.name, readonly = item.readonly;
    if (!_serial) {
        id = item.key, name = item.key;
    } else {
        id = item.key + _serial, name = item.key + "[" + _serial + "]";
    }
    if (readonly) { readonly = "readonly"; } else { readonly = ""; }
    let obj, after;
    obj = $(`<div class='row'></div>`);
    if ("select" == item.type) {
        $(obj).append(`<select id="${id}" name="${name}" data-notnull='${item.notnull}' ${readonly}></select>`);
        let dics = gv.getT(item.dic);
        let tmp = `<option value="">----选择【${label}】----</option>`;
        $(obj).find("select").append(tmp);
        for (let dic of dics) {
            let selectFlag = (_data && dic.key == _data[item.key]) ? "selected" : "";
            tmp = `<option ${selectFlag} value="${dic.key}">${dic.value}</option>`;
            $(obj).find("select").append(tmp);
        }
    } else if ("jsSelect" == item.type) {
        $(obj).append(`<select class="form-control ${item.type}" data-patten="${item.patten}" name="${name}"
            data-initval="${_defaultValue}" data-notnull="${item.notnull}" data-alias="${item.alias}" id="${id}" ${readonly}></select>`);
    } else if ("associating-input" == item.type) {
        let show = _defaultValue;
        let showModel = "";
        if (item.storeKey) {
            if (_defaultValue && item.showFun) show = item.showFun(_defaultValue); else show = _defaultValue;
            after = $(`<input type="hidden" id="${id}" name="${name}" value="${_defaultValue}">`);
            showModel = "show_";
        }
        $(obj).append(`<input type="text" id="${showModel}${id}" name="${showModel}${name}" 
        class="form-control associating-input" value="${show}"
        data-searchurl='${item.searchurl}' data-containerofinput="${item.containerofinput}" 
        data-showcol='${item.showcol}' placeholder="输入:${label}${item.notnull ? '*' : ''}" 
        data-notnull='${item.notnull}' autocomplete="off" ${readonly}>`);
    } else if ("textarea" == item.type) {
        $(obj).append(`<textarea id="${id}" name="${name}" 
            class="form-control" value="${_defaultValue}"
            placeholder="输入:${label}${item.notnull ? '*' : ''}" data-notnull='${item.notnull}' 
            style="${_width ? 'width:' + _width + '' : ''}"
            autocomplete="off" ${readonly}>${_defaultValue}</textarea>`);
    } else {
        $(obj).append(`<input type="text" id="${id}" name="${name}" 
            class="form-control" value="${_defaultValue}"
            placeholder="输入:${label}${item.notnull ? '*' : ''}" data-notnull='${item.notnull}' 
            style="${_width ? 'width:' + _width + '' : ''}"
            autocomplete="off" ${readonly}>`);
    }
    _bind(item, obj);
    if ("associating-input" == item.type && item.storeKey) {
        window.addEventListener('ASSOCIATING_VAL_CHOOSED' + 'show_' + id, function (event) {
            $("#" + id).val(event.detail.data[item.storeKey]);
        });
        $(obj).append(after);
    }
    if (option && option.rtnhtml) return obj[0].outerHTML;
    if (_class) {
        $(obj).find("select,input").addClass(_class);
    }
    if (datas) {
        for (let ii in datas) {
            $(obj).find("select,input").attr("data-" + ii, datas[ii]);
        }
    }
    return obj;
}


let _bind = (item, obj) => {
    let binds = item.bind;
    if (binds) {
        if (typeof binds == "function") {
            $(obj).find("select,input").bind("change", function () { binds(obj); });
        } else if (Array.isArray(binds)) {
            for (let eve of binds) {
                $(obj).find("select,input").bind(eve.event, function () { eve.work(obj); });
            }
        } else {
            $(obj).find("select,input").bind(binds.event, function () { binds.work(obj); });
        }
    }
}