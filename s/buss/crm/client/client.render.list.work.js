import { gf } from "/s/buss/g/j/g.f.js?f=crmv000001";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js?f=crmv000001";
import { renderCss } from "/s/buss/g/j/g.css.js?f=crmv000001";

{
    let csss = [];
    csss.push({
        name: "table.alloc tr td div", content: {
            "border-radius": "4px",
        }
    }, {
        name: "table.alloc tr td button", content: {
            "color": "#FFF",
            "background": "inherit",
            "height": "auto",
            "min-height": "10px",
            "border": "none",
        }
    }, {
        name: "table.alloc tr td div.潜在", content: {
            "background": "#A8CD87",
        },
    }, {
        name: "table.alloc tr td div.基础", content: {
            "background": "#FE9900",
        },
    }, {
        name: "table.alloc tr td div.成功", content: {
            "background": "#26421C",
        },
    }, {
        name: "table.alloc tr td div.冻结", content: {
            "background": "#7A6263",
        },
    }, {
        name: "table.alloc tr td div.失败", content: {
            "background": "#3F3F3F",
        },
    });
    renderCss("clientcss", 'body', csss);
}

var renderOne = function (item) {
    if (!item.value) { return; }
    let json = JSON.parse(item.value);
    let $btn = $(`<button class='item'></button>`);
    let $delBtn = $(`<button class='delete'><img src='/s//i/icon/delete.png'></button>`);
    let $callBtn = $(`<button class='call'><img src='/s//i/icon/call.png'></button>`);
    $($btn).data('key', item.key);
    $($delBtn).css("width", "49%");
    $($callBtn).css("width", "49%");
    let infos = [];
    for (let detail in json) {
        $($btn).data(detail, json[detail]);
        $($delBtn).data(detail, json[detail]);
        $($callBtn).data(detail, json[detail]);
        infos.push(`<span>${detail}:${json[detail]}</span>`);
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
    $($div).append($callA);
    for (let detail in json) {
        $($delBtn).data(detail, json[detail]);
    }
    $($delBtn).data("key", item.key);
    $($div).append($delBtn);
    $($div).addClass(json.状态);
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