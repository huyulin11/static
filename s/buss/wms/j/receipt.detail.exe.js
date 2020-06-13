import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";

var _detailid = gf.urlParam("detailid");
var _target, container;

let play = {
    url: `/receipt/detail/util/play.shtml`,
    id: "play", name: "开始预设", class: "btn-warning",
    bind: function () {
        doJob("play", this);
    },
}, init = {
    url: `/receipt/detail/util/init.shtml`,
    id: "init", name: "恢复初始状态", class: "btn-warning",
    bind: function () {
        doJob("init", this);
    },
}, save = {
    url: `/receipt/detail/util/save.shtml`,
    id: "save", name: "暂时存储", class: "btn-warning",
    bind: function () {
        doJob("save", this);
    },
}, exe = {
    url: `/receipt/detail/util/exe.shtml`,
    id: "exe", name: "确认执行", class: "btn-warning", style: "color: 'coffee'",
    bind: function () {
        doJob("exe", this);
    },
}, back = {
    id: "back", name: "返回", class: "btn-warning", style: "color: 'gray'",
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

var doInit = function (target, json) {
    // let table = $("<table></table>");
    // let tdStart = $("<tr><td></td></tr>");
    // let btnStart = $("<button></button>");
    // tdStart.append(btnStart);
    // table.append(tdStart);
    // container.append(table);
    _target = target;
    container = $(target);
    console.log(json);
    container.append(`<span>物料类型：${sku.value(json.item)}，数量：${json.itemcount}</span>`);
    let tempBtns = [play, init, save, exe, back];
    let btnContainer = $("<div id='btns'><div>");
    container.append(btnContainer);
    gf.bindBtns(btnContainer, tempBtns);
}


export var init = function (target) {
    gf.doAjax({
        url: `/receipt/detail/findJsonList.shtml`,
        data: { "receiptDetailFormMap.id": _detailid },
        success: function (data) {
            if (typeof data == 'string') data = JSON.parse(data);
            if (!data || data.length > 1) {
                alert("数据存在问题！");
                return;
            }
            let json = data[0];
            doInit(target, json);
        }
    });
}