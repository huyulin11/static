import { gf } from "/s/buss/g/j/g.f.js";
import { doInitPaperOp, paperOp } from "/s/buss/wms/j/base/wms.paper.op.obj.js";

var _tasktype = null;

let allBtns = {};
var initBtns = function () {
    allBtns.add = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { paperOp.add(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.detail = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { paperOp.detail(this); },
        url: `/s/buss/wms/h/${_tasktype}Details.html?${_tasktype}MainFormMap.paperid=`
    }, allBtns.edit = {
        id: "edit", name: "修改", class: "btn-warning", bind: function () { paperOp.edit(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.send = {
        id: "send", name: "下达", class: "btn-warning", bind: function () { paperOp.send(this); },
        url: `/${_tasktype}/main/send.shtml`
    }, allBtns.execute = {
        id: "execute", name: "执行", class: "btn-warning", bind: function () { paperOp.execute(this); },
        url: `/${_tasktype}/main/execute.shtml`
    }, allBtns.taked = {
        id: "taked", name: "接单", class: "btn-warning", bind: function () { paperOp.taked(this); },
        url: `/${_tasktype}/main/taked.shtml`
    }, allBtns.over = {
        id: "over", name: "结束", class: "btn-danger", bind: function () { paperOp.over(this); },
        url: `/${_tasktype}/main/over.shtml`
    }, allBtns.del = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { paperOp.del(this); },
        url: `/${_tasktype}/main/deleteEntity.shtml`
    }, allBtns.cancel = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { paperOp.cancel(this); },
        url: `/${_tasktype}/main/cancel.shtml`
    }, allBtns.refresh = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    }, allBtns.whichAgv = {
        id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { paperOp.whichAgv(this); },
        url: `/bd/conf.shtml?table=task_agv`
    }, allBtns.whichOne = {
        id: "whichOne", name: "经办", class: "btn-info", bind: function () { paperOp.whichOne(this); },
    }, allBtns.gotoRfShipment = {
        id: "gotoRfShipment", name: "出库操作", class: "btn-primary", bind: function () { paperOp.gotoRfShipment(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    }, allBtns.picking = {
        id: "picking", name: "拣货", class: "btn-warning", bind: function () { paperOp.picking(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    }, allBtns.import = {
        id: "import", name: "导入", class: "btn-warning", bind: function () { paperOp.import(this); },
        url: `/s/buss/wms/rf/h/import.html`,
    };
}

export var overPaper = function (paperid) {
    let obj = {};
    Object.assign(obj, allBtns.over, { paperid: paperid });
    paperOp.over(obj);
}

var initPaperOp = function (tasktype, rf) {
    _tasktype = tasktype;
    doInitPaperOp(_tasktype);
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
            if (_tasktype == "shipment") {
                tempBtns = tempBtns.concat(allBtns.import);
            }
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };