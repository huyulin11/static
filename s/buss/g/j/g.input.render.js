
import { gv } from "/s/buss/g/j/g.v.js";

export var getInputHtml = (item, _defaultValue, _serial) => {
    let id, name;
    if (!_serial) {
        id = item.key, name = item.key;
    } else {
        id = item.key + _serial, name = item.key + "[" + _serial + "]";
    }
    var itemDesc = "";
    if ("select" == item.type) {
        let dics = gv.getT(item.dic);
        itemDesc += `<option value="">----选择【${item.name}】----</option>`;
        for (let dic of dics) {
            let selectFlag = (data && dic.key == data[item.key]) ? "selected" : "";
            itemDesc += `<option ${selectFlag} value="${dic.key}">${dic.value}</option>`;
        }
        itemDesc = `<select id="${id}" name="${name}" data-notnull='${item.notnull}'>${itemDesc}</select>`;
    } else if ("associating-input" == item.type) {
        itemDesc = `
        <input type="text" id="${id}" name="${name}" 
        class="form-control associating-input" value="${_defaultValue ? _defaultValue : ""}"
        data-searchurl='${item.searchurl}' data-containerofinput="${item.containerofinput}" 
        data-showcol='${item.showcol}' placeholder="输入:${item.name}" 
        data-notnull='${item.notnull}' autocomplete="off">`;
    } else {
        itemDesc = `
    <input type="text" id="${id}" name="${name}" 
        class="form-control" value="${_defaultValue ? _defaultValue : ""}"
        placeholder="输入:${item.name}" data-notnull='${item.notnull}' autocomplete="off">`;
    }
    return itemDesc;
}
