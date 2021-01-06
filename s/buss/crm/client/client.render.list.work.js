import { gf } from "/s/buss/g/j/g.f.js?f=crmv000001";
import { gfdiv } from "/s/buss/g/j/g.f.divs.js?f=crmv000001";

let separator = `<span style='color:#EEE;'> | </span>`;

let map = {};
let findManager = (id, call) => {
    // if (map[id]) { call(map[id]); return; }
    gf.doAjax({
        dataType: 'json',
        url: '/user/findOne.shtml',
        data: {
            "UserFormMap.id": id
        },
        success: (data) => { map[id] = data; call(data); console.log(id); }
    });
};

var renderOne = function (item) {
    if (!item.value) { return; }
    let json = JSON.parse(item.value);
    let $div = $(`<div></div>`);
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
        let value = json[detail];
        $($btn).data(detail, value);
        $($delBtn).data(detail, value);
        $($callBtn).data(detail, value);
        if (['manager'].includes(detail)) {
            findManager(value, (data) => { $($div).append(`<span class='currenttip'>责任人：${data.userName}</span>`); });
        } else if (!['备注', 'manager'].includes(detail)) {
            infos1.push(`<span>${value}</span>`);
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