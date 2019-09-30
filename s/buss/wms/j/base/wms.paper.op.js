import { gf } from "/s/buss/g/j/g.f.js";
import { initPaperUtil, paperUtil } from "/s/buss/wms/j/base/wms.paper.op.obj.js";

var _tasktype = null;

let allBtns = {};
var initBtns = function () {
    initPaperUtil(_tasktype);
    allBtns.add = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { paperUtil.add(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.detail = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { paperUtil.detail(this); },
        url: `/s/buss/wms/h/${_tasktype}Details.html?${_tasktype}MainFormMap.paperid=`
    }, allBtns.edit = {
        id: "edit", name: "修改", class: "btn-warning", bind: function () { paperUtil.edit(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.send = {
        id: "send", name: "下达", class: "btn-warning", bind: function () { paperUtil.send(this); },
        url: `/${_tasktype}/main/send.shtml`
    }, allBtns.execute = {
        id: "execute", name: "执行", class: "btn-warning", bind: function () { paperUtil.execute(this); },
        url: `/${_tasktype}/main/execute.shtml`
    }, allBtns.taked = {
        id: "taked", name: "接单", class: "btn-warning", bind: function () { paperUtil.taked(this); },
        url: `/${_tasktype}/main/taked.shtml`
    }, allBtns.over = {
        id: "over", name: "结束", class: "btn-danger", bind: function () { paperUtil.over(this); },
        url: `/${_tasktype}/main/over.shtml`
    }, allBtns.del = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { paperUtil.del(this); },
        url: `/${_tasktype}/main/deleteEntity.shtml`
    }, allBtns.cancel = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { paperUtil.cancel(this); },
        url: `/${_tasktype}/main/cancel.shtml`
    }, allBtns.refresh = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    }, allBtns.whichAgv = {
        id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { paperUtil.whichAgv(this); },
        url: `/bd/conf.shtml?table=task_agv`
    }, allBtns.whichOne = {
        id: "whichOne", name: "经办", class: "btn-info", bind: function () { paperUtil.whichOne(this); },
    }, allBtns.gotoRfShipment = {
        id: "gotoRfShipment", name: "出库操作", class: "btn-primary", bind: function () { paperUtil.gotoRfShipment(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    }, allBtns.picking = {
        id: "picking", name: "拣货", class: "btn-warning", bind: function () { paperUtil.picking(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    };
}

export var overPaper = function (paperid) {
    let obj = {};
    Object.assign(obj, allBtns.over, { paperid: paperid });
    paperUtil.over(obj);
}

var initPaperOp = function (tasktype, rf) {
    _tasktype = tasktype;
    initBtns();
    let tempBtns = null;
    if (rf == "RF") {
        tempBtns = [allBtns.detail, allBtns.taked, allBtns.picking, allBtns.cancel, allBtns.refresh,];
    } else {
        if (localStorage.projectKey == "CSY_DAJ") {
            tempBtns = [allBtns.add, allBtns.detail, allBtns.edit, allBtns.send, allBtns.execute, allBtns.cancel, allBtns.del, allBtns.refresh,];
            if (_tasktype == "inventory") {
                tempBtns = tempBtns.concat(allBtns.whichAgv);
            }
        } else {
            tempBtns = [allBtns.add, allBtns.detail, allBtns.edit, allBtns.send, allBtns.execute,
            allBtns.taked, allBtns.picking, allBtns.over, allBtns.del, allBtns.cancel,
            allBtns.refresh, allBtns.whichOne, allBtns.gotoRfShipment,];
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };