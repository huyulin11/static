import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { gcol } from "/s/buss/g/j/g.col.js";
import { renderCss } from "/s/buss/g/j/g.css.js";

{
    let csss = [];
    csss.push({
        name: "table.alloc tr td button", content: {
            "color": "#FFF",
            "background": "#496E77",
            "height": "auto",
        }
    }, {
        name: "table.alloc tr td button.潜力", content: {
            "background": "#FA3744",
        },
    }, {
        name: "table.alloc tr td button.基础", content: {
            "background": "#FE9900",
        },
    }, {
        name: "table.alloc tr td button.成功", content: {
            "background": "#7A6263",
        },
    });
    renderCss("clientcss", 'body', csss);
}

var renderOne = function (item) {
    if (!item.value) { return; }
    let json = JSON.parse(item.value);
    let $btn = $(`<button class='item'></button>`);
    $($btn).data('key', item.key);
    $($btn).addClass(json.状态);
    let infos = [];
    for (let detail in json) {
        $($btn).data(detail, json[detail]);
        infos.push(`<span>${detail}:${json[detail]}</span>`);
    }
    let allInfos;
    if (infos) {
        allInfos = infos.join("<hr/>");
        $($btn).append(allInfos);
    }
    let $div = $(`<div></div>`);
    $($div).append($btn);
    $($div).append(`<a class='call' href='tel:${json.电话}'><img src='/s//i/icon/call.png'></a>`);
    let $delete = $(`<a class='delete'><img src='/s//i/icon/delete.png'></a>`);
    for (let detail in json) {
        $($delete).data(detail, json[detail]);
    }
    $($delete).data("key", item.key);
    $($div).append($delete);
    return $div;
}


let flag = false;
var toRender = function (data, conf) {
    if (!data || data.length == 0) return;
    let _conf = { data: data, numInLine: 2, numInPage: 1000, render: renderOne, target: "table.alloc", callback: () => gf.resizeTable() };
    Object.assign(_conf, conf);
    gfbtn.renderBtnTable(_conf);
}

export var allocRender = function (data, conf) {
    if (flag) return;
    try {
        flag = true;
        toRender(data, conf);
    } finally {
        flag = false;
    }
}