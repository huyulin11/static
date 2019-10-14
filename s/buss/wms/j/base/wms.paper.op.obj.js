import { gf } from "/s/buss/g/j/g.f.js";
import { currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";

var _tasktype = null;

let _receipttype = gf.urlParam("receipttype");

export var btns = {};
var initBtns = function () {
    btns.add = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { paperOp.add(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html?receipttype=${_receipttype}`
    }; btns.detail = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { paperOp.detail(this); },
        url: `/s/buss/wms/h/${_tasktype}Details.html?${_tasktype}MainFormMap.paperid=`
    }; btns.edit = {
        id: "edit", name: "修改", class: "btn-warning", bind: function () { paperOp.edit(this); },
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`
    }; btns.send = {
        id: "send", name: "下达", class: "btn-warning", bind: function () { paperOp.send(this); },
        url: `/${_tasktype}/main/send.shtml`
    }; btns.execute = {
        id: "execute", name: "执行", class: "btn-warning", bind: function () { paperOp.execute(this); },
        url: `/${_tasktype}/main/execute.shtml`
    }; btns.taked = {
        id: "taked", name: "接单", class: "btn-warning", bind: function () { paperOp.taked(this); },
        url: `/${_tasktype}/main/taked.shtml`
    }; btns.over = {
        id: "over", name: "结束", class: "btn-danger", bind: function () { paperOp.over(this); },
        url: `/${_tasktype}/main/over.shtml`
    }; btns.del = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { paperOp.del(this); },
        url: `/${_tasktype}/main/deleteEntity.shtml`
    }; btns.cancel = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { paperOp.cancel(this); },
        url: `/${_tasktype}/main/cancel.shtml`
    }; btns.refresh = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    }; btns.whichAgv = {
        id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { paperOp.whichAgv(this); },
        url: `/bd/conf.shtml?table=task_agv`
    }; btns.whichOne = {
        id: "whichOne", name: "经办", class: "btn-info", bind: function () { paperOp.whichOne(this); },
    }; btns.stockOut = {
        id: "stockOut", name: "RF-出库", class: "btn-primary", bind: function () { paperOp.stockOut(this); },
        url: `/s/buss/wms/h/shipmentMainMgr.html?status=2,TAKED,SCANED&type=RF${escape("出库")}`,
    }; btns.pickOne = {
        id: "pickOne", name: "RF-按单拣货", class: "btn-warning", bind: function () { paperOp.pickOne(this); },
        url: `/s/buss/wms/rf/h/picking.html`,
    }; btns.pickMore = {
        id: "pickMore", name: "RF-VNA拣货", class: "btn-warning", bind: function () { paperOp.pickMore(this); },
        url: `/s/buss/wms/rf/h/picking.html?warehouse=1`,
    }; btns.combineVna = {
        id: "combineVna", name: "RF-VNA组盘", class: "btn-warning", bind: function () { paperOp.combine(this); },
        url: `/s/buss/wms/rf/h/combine.html?warehouse=1`,
    }; btns.back = {
        id: "combineVna", name: "返回", class: "btn-info", bind: function () { window.history.back(); },
    };
}

class PaperOp {
    del(that) {
        var cbox = gf.checkNotNull("paperid");
        if (!cbox) { return; }
        layer.confirm(`是否${that.name}${cbox}？`, function (index) {
            gf.ajax(that.url, { paperids: cbox.join(",") }, "json", function (s) {
                layer.msg(s.msg);
                window.datagrid.loadData();
            });
        });
    }; edit(that) {
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
    }; pickOne(that) {
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
            window.location.href = that.url + "?paperid=" + cbox
        });
    }; pickMore(that) {
        window.location.href = that.url
    }; combine(that) {
        window.location.href = that.url
    }; add(that) {
        window.pageii = layer.open({
            title: `${that.name}`,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url
        });
    }; detail(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }
        window.pageii = layer.open({
            title: `${that.name}：` + cbox,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url + cbox
        });
    }; stockOut(that) {
        window.location.href = that.url;
    }; doJob(param, that, callback) {
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
                    if (window.datagrid) window.datagrid.loadData();
                    else if (parent.datagrid) parent.datagrid.loadData();
                    if (callback) { callback(paperid); }
                } else {
                    layer.msg(`${that.name}失败！` + s.msg);
                }
            });
        });
    }; send(that) {
        paperOp.doJob("send", that);
    }; execute(that) {
        paperOp.doJob("execute", that);
    }; over(that) {
        paperOp.doJob("over", that, function (paperid) {
            if (paperid == currentShipmentPaperid()) {
                setCurrentShipmentPaperid("");
            }
            if (parent && parent.layer) { parent.layer.close(parent.pageii); }
        });
    }; cancel(that) {
        paperOp.doJob("cancel", that);
    }; taked(that) {
        paperOp.doJob("taked", that, function (paperid) {
            setCurrentShipmentPaperid(paperid);
        });
    }; whichAgv(that) {
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
    }; whichOne(that) {
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
    }; import(that) {
        var info = "";
        if (!info) { info = "未找到相关信息！"; }
        layer.msg(info);
    }
}

var paperOp = new PaperOp();

var doInitPaperOp = function (tasktype) {
    _tasktype = tasktype;
    initBtns();
}

export var overPaper = function (paperid) {
    let obj = {};
    Object.assign(obj, btns.over, { paperid: paperid });
    paperOp.over(obj);
}

export { doInitPaperOp, paperOp };