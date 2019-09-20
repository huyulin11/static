import { gf } from "/s/buss/g/j/g.f.js";

var _keyword = null;

function del(that) {
    var cbox = gf.checkNotNull(window.datagrid, "paperid");
    if (!cbox) { return; }
    layer.confirm(`是否${that.name}${cbox}？`, function (index) {
        gf.ajax(that.url, { paperids: cbox.join(",") }, "json", function (s) {
            layer.msg(s.msg);
            window.datagrid.loadData();
        });
    });
}

function edit(that) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    window.pageii = layer.open({
        title: `${that.name}：` + cbox,
        type: 2,
        area: ["600px", "80%"],
        content: that.url + "?paperid=" + cbox
    });
}

function add(that) {
    window.pageii = layer.open({
        title: `${that.name}`,
        type: 2,
        area: localStorage.layerArea.split(","),
        content: that.url
    });
}

function detail(that) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    window.pageii = layer.open({
        title: `${that.name}：` + cbox,
        type: 2,
        area: localStorage.layerArea.split(","),
        content: that.url + cbox
    });
}

function doJob(param, that) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    layer.confirm(`是否${that.name}${cbox}？`, function (index) {
        gf.ajax(that.url, { paperid: cbox }, "json", function (s) {
            if (s.code >= 0) {
                layer.msg(`成功${that.name}！`);
                window.datagrid.loadData();
            } else {
                layer.msg(`${that.name}失败！` + s.msg);
            }
        });
    });
}

function send(that) {
    doJob("send", that);
}

function execute(that) {
    doJob("execute", that);
}

function over(that) {
    doJob("over", that);
}

function cancel(that) {
    doJob("cancel", that);
}

function taked(that) {
    doJob("taked", that);
}

var whichAgv = function (that) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    gf.ajax(that.url, { key: cbox + "%" }, "json", function (s) {
        var info = "";
        for (var item of s) {
            info = info + item.key + ":" + item.value + "<br/>";
        }
        if (!info) { info = "未找到执行信息！"; }
        layer.msg(info);
    });
}

var whichOne = function (that) {
    var cbox = gf.checkOnlyOne(window.datagrid, "json");
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

var initPaperOp = function (keyword, rf) {
    _keyword = keyword;
    let btns = null;
    let addBtn = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { add(this); },
        url: `/s/buss/wms/h/${_keyword}AddUI.html`
    }, detailBtn = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { detail(this); },
        url: `/s/buss/wms/h/${_keyword}Details.html?${_keyword}MainFormMap.paperid=`
    }, editBtn = {
        id: "edit", name: "修改", class: "btn-warning", bind: function () { edit(this); },
        url: `/s/buss/wms/h/${_keyword}AddUI.html`
    }, sendBtn = {
        id: "send", name: "下达", class: "btn-warning", bind: function () { send(this); },
        url: `/${_keyword}/main/send.shtml`
    }, executeBtn = {
        id: "execute", name: "执行", class: "btn-warning", bind: function () { execute(this); },
        url: `/${_keyword}/main/execute.shtml`
    }, takedBtn = {
        id: "taked", name: "接单", class: "btn-warning", bind: function () { taked(this); },
        url: `/${_keyword}/main/taked.shtml`
    }, overBtn = {
        id: "over", name: "结束", class: "btn-danger", bind: function () { over(this); },
        url: `/${_keyword}/main/over.shtml`
    }, delBtn = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { del(this); },
        url: `/${_keyword}/main/deleteEntity.shtml`
    }, cancelBtn = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { cancel(this); },
        url: `/${_keyword}/main/cancel.shtml`
    }, refreshBtn = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    }, whichAgvBtn = {
        id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { whichAgv(this); },
        url: `/bd/conf.shtml?table=task_agv`
    }, whichOneBtn = {
        id: "whichOne", name: "经办", class: "btn-info", bind: function () { whichOne(this); },
    };
    if (rf == "RF") {
        btns = [detailBtn, takedBtn, cancelBtn, refreshBtn,];
    } else {
        if (localStorage.projectKey == "CSY_DAJ") {
            btns = [addBtn, detailBtn, editBtn, sendBtn, executeBtn, delBtn, refreshBtn,];
            if (_keyword == "inventory") {
                btns = btns.concat(whichAgvBtn);
            }
        } else {
            btns = [addBtn, detailBtn, editBtn, sendBtn, executeBtn,
                takedBtn, overBtn, delBtn, cancelBtn, refreshBtn, whichOneBtn,];
        }
    }
    gf.bindBtns("div.doc-buttons", btns);
}

export { initPaperOp };