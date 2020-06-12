import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";

var _detailid = gf.urlParam("detailid");
var _target, container;

let add = {
    url: `/s/buss/wms/h/AddUI.html?receipttype=`,
    id: "add", name: "开始预设", class: "btn-primary",
    bind: function () {
        add(this);
    },
}, detail = {
    url: `/s/buss/wms/h/Details.html?MainFormMap.paperid=`,
    id: "detail", name: "恢复初始状态", class: "btn-primary",
    bind: function () {
        detail(this);
    },
}, edit = {
    url: `/s/buss/wms/h/AddUI.html`,
    id: "edit", name: "暂时存储", class: "btn-warning",
    bind: function () {
        edit(this);
    },
}, send = {
    url: `//main/send.shtml`,
    id: "send", name: "确认执行", class: "btn-warning",
    bind: function () {
        doJob("send", this);
    },
}, back = {
    id: "back", name: "返回", class: "btn-warning",
    bind: function () {
        window.history.back();
    },
};

let doJob = (param, that, callback) => {
    var paperid;
    if (that.paperid) {
        paperid = that.paperid;
    } else {
        paperid = gf.checkOnlyOne("paperid");
    }
    if (!paperid) { return; }
    layer.confirm(`是否${that.name}${paperid}？`, function (index) {
        gf.ajax(that.url, { paperid: paperid }, "json", function (s) {
            if (s.code >= 0) {
                gf.layerMsg(`成功${that.name}！`);
                if (window.datagrid) window.datagrid.loadData();
                else if (parent.datagrid) parent.datagrid.loadData();
                if (callback) { callback(paperid); }
            } else {
                gf.layerMsg(`${that.name}失败！` + s.msg);
            }
        });
    });
};
export var init = function (target) {
    _target = target;
    container = $(target);
    // let table = $("<table></table>");
    // let tdStart = $("<tr><td></td></tr>");
    // let btnStart = $("<button></button>");
    // tdStart.append(btnStart);
    // table.append(tdStart);
    // container.append(table);
    let tempBtns = [add, detail, edit, send, back];
    gf.bindBtns("div#rootContainer", tempBtns);
}