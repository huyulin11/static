import { gf } from "/s/buss/g/j/g.f.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { allocData } from "/s/buss/wms/alloc/item/j/alloc.render.list.data.js";
import { allocRender } from "/s/buss/wms/alloc/item/j/alloc.render.list.work.js";

var _detailid = gf.urlParam("detailid");
var _target, container;

let play = {
    url: `/shipment/util/play.shtml`,
    id: "play", name: "开始预设", class: "btn-warning",
    bind: function () {
        doJob("play", this);
    },
}, restore = {
    url: `/shipment/util/restore.shtml`,
    id: "restore", name: "恢复初始状态", class: "btn-warning",
    bind: function () {
        doJob("restore", this);
    },
}, save = {
    url: `/shipment/util/save.shtml`,
    id: "save", name: "暂时存储", class: "btn-warning",
    bind: function () {
        doJob("save", this);
    },
}, exe = {
    url: `/shipment/util/exe.shtml`,
    id: "exe", name: "确认执行", class: "btn-warning",
    style: "background-color:chocolate",
    bind: function () {
        doJob("exe", this);
    },
}, back = {
    id: "back", name: "返回", class: "btn-warning",
    style: "background-color:gray",
    bind: function () {
        gf.ajax(`/alloc/item/util/clearSearch.shtml`);
        window.history.back();
    },
};

let doJob = (param, that, callback) => {
    let tmpJob = function (index) {
        gf.ajax(that.url, { detailid: _detailid }, "json", function (s) {
            if (s.code >= 0) {
                gf.layerMsg(`成功${that.name}！`);
                if (window.datagrid) window.datagrid.loadData();
                else if (parent.datagrid) parent.datagrid.loadData();
                if (callback) { callback(_detailid); }
            } else {
                gf.layerMsg(`${that.name}失败！` + s.msg);
            }
        });
    };
    if (that.id == 'play') tmpJob(); else
        layer.confirm(`确认开始执行改操作：${that.name}？`, tmpJob);
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
    let tempBtns = [exe, back];//play, restore, save, 
    let btnContainer = $("<div id='btns'><div>");
    container.append(btnContainer);
    gf.bindBtns(btnContainer, tempBtns);

    container.append(`<div>可选择货物↓↓↓↓↓↓</div>`);
    container.append(`<div><table class="alloc"></table></div>`);
    let _conf = { numInLine: 5, target: "table.alloc" };
    let allocRenderUdf = (data) => {
        allocRender(data, _conf);
    };
    setTimeout(function () {
        allocData(allocRenderUdf, {
            'allocItemFormMap.skuid': json.item,
            'allocItemFormMap.txm': json.txm,
            'allocItemFormMap.status': '3'
        });
    }, 500);
    setTimeout(function () {
        gf.resizeTable();
    }, 1000);
}


export var init = function (target) {
    gf.doAjax({
        url: `/shipment/detail/findJsonList.shtml`,
        data: { "shipmentDetailFormMap.id": _detailid },
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