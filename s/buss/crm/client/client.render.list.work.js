import { gf } from "/s/buss/g/j/g.f.js?f=crmv000001";
import { gfdiv } from "/s/buss/g/j/g.f.divs.js?f=crmv000001";

let separator = `<span style='color:#EEE;'> | </span>`;


var renderOne = function (item) {
    if (!item.value) { return; }
    let json = JSON.parse(item.value);
    let $btn = $(`<button class='item'></button>`);
    let $delBtn = $(`<button class='delete'><img src='/s//i/icon/delete.png'></button>`);
    if (item.delflag == 1) $($delBtn).html("已删除");
    let $callBtn = $(`<button class='call'><img src='/s//i/icon/call.png'></button>`);
    $($btn).data('key', item.key);
    $($delBtn).css("width", "49%");
    $($callBtn).css("width", "49%");
    let infos = [];
    let infos1 = [];
    for (let detail in json) {
        $($btn).data(detail, json[detail]);
        $($delBtn).data(detail, json[detail]);
        $($callBtn).data(detail, json[detail]);
        if (detail != '备注') {
            infos1.push(`<span>${json[detail]}</span>`);
        }
    }
    infos.push(infos1.join(separator));
    let remark = json.备注;
    if (remark === null || remark === undefined) remark = "--";
    if (!$("#showList").is(":checked")) {
        infos.push(`<span>备注:${remark}</span>`);
    }
    let allInfos;
    if (infos) {
        allInfos = infos.join("<hr/>");
        $($btn).append(allInfos);
    }
    $($btn).append("<hr/>");
    let $div = $(`<div></div>`);
    $($div).append($btn);
    let $callA = $(`<a class='call' href='tel:${json.电话}'></a>`);
    $($callA).append($callBtn);
    $($delBtn).data("key", item.key);
    if (!$("#showList").is(":checked")) {
        $($div).append($callA);
        $($div).append($delBtn);
    }
    $($div).addClass(json.状态);
    return $div;
}


let flag = false;
var toRender = function (data, conf) {
    if (!data || data.length == 0) return;
    let _conf = { data: data, numInPage: 1000, render: renderOne, target: "div#target", callback: () => gf.resizeTable() };
    Object.assign(_conf, conf);
    gfdiv.renderDivs(_conf);
}

export var render = function (data, conf) {
    if (flag) return;
    try {
        flag = true;
        toRender(data, conf);
    } finally {
        flag = false;
    }
}