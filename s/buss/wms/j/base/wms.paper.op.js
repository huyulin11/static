import { gf } from "/s/buss/g/j/g.f.js";
import { gotoRfMgr, currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";

var _tasktype = null;

var del = function (that) {
    var cbox = gf.checkNotNull("paperid");
    if (!cbox) { return; }
    layer.confirm(`是否${that.name}${cbox}？`, function (index) {
        gf.ajax(that.url, { paperids: cbox.join(",") }, "json", function (s) {
            layer.msg(s.msg);
            window.datagrid.loadData();
        });
    });
}, edit = function (that) {
    var cbox = gf.checkOnlyOne("paperid");
    if (!cbox) { return; }

    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: cbox }, "json", function (s) {
        if (!s.object) {
            layer.msg(`该单无法${that.name}！`);
            return;
        }
        let main = s.object.main;
        if (!main || (main["status"] != "1") || main["delflag"] != "0") {
            layer.msg(`该单无法${that.name}！`);
            return;
        }
        window.pageii = layer.open({
            title: `${that.name}：` + cbox,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url + "?paperid=" + cbox
        });
    });
}, picking = function (that) {
    var cbox = gf.checkOnlyOne("paperid");
    if (!cbox) { return; }

    let url = `/${_tasktype}/main/findOneData.shtml`;
    gf.ajax(url, { paperid: cbox }, "json", function (s) {
        if (!s.object) {
            layer.msg(`该单无法${that.name}！`);
            return;
        }
        let main = s.object.main;
        if (!main || (main["status"] != "TAKED" && main["status"] != "SCANED") || main["delflag"] != "0") {
            layer.msg(`该单无法${that.name}！`);
            return;
        }
        window.pageii = layer.open({
            title: `${that.name}：` + cbox,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url + "?paperid=" + cbox
        });
    });
}, add = function (that) {
    window.pageii = layer.open({
        title: `${that.name}`,
        type: 2,
        area: localStorage.layerArea.split(","),
        content: that.url
    });
}, detail = function (that) {
    var cbox = gf.checkOnlyOne("paperid");
    if (!cbox) { return; }
    window.pageii = layer.open({
        title: `${that.name}：` + cbox,
        type: 2,
        area: localStorage.layerArea.split(","),
        content: that.url + cbox
    });
}, gotoRfShipment = function (that) {
    window.pageii = layer.open({
        title: `${that.name}`,
        type: 2,
        area: localStorage.layerArea.split(","),
        content: that.url
    });
}, doJob = function (param, that, callback) {
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
                layer.msg(`成功${that.name}！`);
                window.datagrid.loadData();
                if (callback) { callback(paperid); }
            } else {
                layer.msg(`${that.name}失败！` + s.msg);
            }
        });
    });
}, send = function (that) {
    doJob("send", that);
}, execute = function (that) {
    doJob("execute", that);
}, over = function (that) {
    doJob("over", that);
}, cancel = function (that) {
    doJob("cancel", that);
}, taked = function (that) {
    if (currentShipmentPaperid()) {
        let msg = function () {
            return ("当前有出库单尚未完成处理，是否前去处理？" + currentShipmentPaperid())
        };
        layer.confirm(msg(), {
            btn: ['是', '否，仍然接单']
        }, function () {
            gotoRfMgr("shipment");
        }, function () {
            doJob("taked", that, function (paperid) {
                setCurrentShipmentPaperid(paperid);
            });
        });
    } else {
        doJob("taked", that, function (paperid) {
            setCurrentShipmentPaperid(paperid);
        });
    }
}, whichAgv = function (that) {
    var cbox = gf.checkOnlyOne("paperid");
    if (!cbox) { return; }
    gf.ajax(that.url, { key: cbox + "%" }, "json", function (s) {
        var info = "";
        for (var item of s) {
            info = info + item.key + ":" + item.value + "<br/>";
        }
        if (!info) { info = "未找到执行信息！"; }
        layer.msg(info);
    });
}, whichOne = function (that) {
    var cbox = gf.checkOnlyOne("json");
    if (!cbox) { return; }
    var info = "";
    if (cbox) {
        Object.keys(cbox).forEach(function (key) {
            info = info + key + ":" + cbox[key] + "<br/>";
        });
    }
    if (!info) { info = "未找到相关信息！"; }
    layer.msg(info);
}

let allBtns = {};
var initBtns = function () {
    allBtns.add = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { add(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.detail = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { detail(this); },
        url: `/s/buss/wms/h/${_tasktype}Details.html?${_tasktype}MainFormMap.paperid=`
    }, allBtns.edit = {
        id: "edit", name: "修改", class: "btn-warning", bind: function () { edit(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }, allBtns.send = {
        id: "send", name: "下达", class: "btn-warning", bind: function () { send(this); },
        url: `/${_tasktype}/main/send.shtml`
    }, allBtns.execute = {
        id: "execute", name: "执行", class: "btn-warning", bind: function () { execute(this); },
        url: `/${_tasktype}/main/execute.shtml`
    }, allBtns.taked = {
        id: "taked", name: "接单", class: "btn-warning", bind: function () { taked(this); },
        url: `/${_tasktype}/main/taked.shtml`
    }, allBtns.over = {
        id: "over", name: "结束", class: "btn-danger", bind: function () { over(this); },
        url: `/${_tasktype}/main/over.shtml`
    }, allBtns.del = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { del(this); },
        url: `/${_tasktype}/main/deleteEntity.shtml`
    }, allBtns.cancel = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { cancel(this); },
        url: `/${_tasktype}/main/cancel.shtml`
    }, allBtns.refresh = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    }, allBtns.whichAgv = {
        id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { whichAgv(this); },
        url: `/bd/conf.shtml?table=task_agv`
    }, allBtns.whichOne = {
        id: "whichOne", name: "经办", class: "btn-info", bind: function () { whichOne(this); },
    }, allBtns.gotoRfShipment = {
        id: "gotoRfShipment", name: "出库操作", class: "btn-primary", bind: function () { gotoRfShipment(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    }, allBtns.picking = {
        id: "picking", name: "拣货", class: "btn-warning", bind: function () { picking(this); },
        url: `/s/buss/wms/rf/h/shipment.html`,
    };
}

export var overPaper = function (paperid) {
    let obj = {};
    Object.assign(obj, allBtns.over, { paperid: paperid });
    over(obj);
}

var initPaperOp = function (tasktype, rf) {
    _tasktype = tasktype;
    initBtns();
    let tempBtns = null;
    if (rf == "RF") {
        tempBtns = [allBtns.detail, allBtns.taked, allBtns.picking, allBtns.cancel, allBtns.refresh,];
    } else {
        if (localStorage.projectKey == "CSY_DAJ") {
            tempBtns = [allBtns.add, allBtns.detail, allBtns.edit, allBtns.send, allBtns.execute, allBtns.del, allBtns.refresh,];
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