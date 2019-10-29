
import { gv } from "/s/buss/g/j/g.v.js";

export var getInput = (item, option) => {
    let _data, _defaultValue, _serial;
    if (option) { _data = option.data, _defaultValue = option.value, _serial = option.serial; } else { _defaultValue = item.defaultValue; }
    let id, name, label = item.name;
    if (!_serial) {
        id = item.key, name = item.key;
    } else {
        id = item.key + _serial, name = item.key + "[" + _serial + "]";
    }
    let obj;
    if ("select" == item.type) {
        obj = $(`<select id="${id}" name="${name}" data-notnull='${item.notnull}'></select>`);
        let dics = gv.getT(item.dic);
        let tmp = `<option value="">----选择【${label}】----</option>`;
        obj.append(tmp);
        for (let dic of dics) {
            let selectFlag = (_data && dic.key == _data[item.key]) ? "selected" : "";
            tmp = `<option ${selectFlag} value="${dic.key}">${dic.value}</option>`;
            obj.append(tmp);
        }
    } else if ("jsSelect" == item.type) {
        obj = $(`
        <select class="form-control ${item.type}" data-patten="${item.patten}" name="${name}"
            autocomplete="off" data-notnull="${item.notnull}" data-alias="${item.alias}" id="${id}"></select>`);
    } else if ("associating-input" == item.type) {
        obj = $(`
        <input type="text" id="${id}" name="${name}" 
            class="form-control associating-input" value="${_defaultValue ? _defaultValue : ""}"
            data-searchurl='${item.searchurl}' data-containerofinput="${item.containerofinput}" 
            data-showcol='${item.showcol}' placeholder="输入:${label}" 
            data-notnull='${item.notnull}' autocomplete="off">`);
    } else {
        obj = $(`
        <input type="text" id="${id}" name="${name}" 
            class="form-control" value="${_defaultValue ? _defaultValue : ""}"
            placeholder="输入:${label}" data-notnull='${item.notnull}' autocomplete="off">`);
    }
    let binds = item.bind; if (binds) {
        if (typeof binds == "function") {
            $(obj).bind("change", function () { binds(obj); });
        } else if (Array.isArray(binds)) {
            for (let eve of binds) {
                $(obj).bind(eve.event, function () { eve.work(obj); });
            }
        } else {
            $(obj).bind(binds.event, function () { binds.work(obj); });
        }
    }
    return obj;
}
