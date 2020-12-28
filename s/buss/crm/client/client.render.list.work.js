import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { gcol } from "/s/buss/g/j/g.col.js";
import { renderCss } from "/s/buss/g/j/g.css.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";

let confs = [];
confs.push({ init: true, url: "/s/buss/crm/client/client.add.html", key: 'add', target: 'div#addContainer', height: "90%", width: "90%" });
renderModel(confs);
{
    let csss = [];
    csss.push(
        {
            name: "table.alloc tr td button", content: {
                "color": "#FFF",
                "background": "#496E77",
                "height": "auto",
            }
        },
    );
    renderCss("clientcss", 'body', csss);
}

var renderOne = function (item) {
    if (!item.value) { return; }
    let json = JSON.parse(item.value);
    let $btn = $(`<button class='item'></button>`);
    let infos = [];
    for (let detail in json) {
        infos.push(`<span>${detail}:${json[detail]}</span>`);
    }
    let allInfos;
    if (infos) {
        allInfos = infos.join("<hr/>");
        $($btn).append(allInfos);
    }
    let $div = $(`<div></div>`);
    $($div).append($btn);
    return $div;
}


let flag = false;
var toRender = function (data, conf) {
    if (!data || data.length == 0) return;
    let _conf = { data: data, numInLine: 3, numInPage: 1000, render: renderOne, target: "table.alloc", callback: () => gf.resizeTable() };
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