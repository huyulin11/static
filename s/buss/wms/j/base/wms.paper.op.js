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

function execute(that) {
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

function cancel(that) {
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

function taked(that) {
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

var initPaperOp = function (keyword, rf) {
    _keyword = keyword;
    let btns = null;
    let addBtn = {
        id: "add", name: "增加", class: "btn-primary", bind: function () { add(this); },
        url: `/s/buss/wms/h/${_keyword}AddUI.html`
    }, editBtn = {
        id: "edit", name: "修改", class: "btn-primary", bind: function () { edit(this); },
        url: `/s/buss/wms/h/${_keyword}AddUI.html`
    }, detailBtn = {
        id: "detail", name: "明细", class: "btn-primary", bind: function () { detail(this); },
        url: `/s/buss/wms/h/${_keyword}Details.html?${_keyword}MainFormMap.paperid=`
    }, executeBtn = {
        id: "execute", name: "下达", class: "btn-danger", bind: function () { execute(this); },
        url: `/${_keyword}/main/execute.shtml`
    }, takedBtn = {
        id: "taked", name: "接单", class: "btn-primary", bind: function () { taked(this); },
        url: `/${_keyword}/main/taked.shtml`
    }, delBtn = {
        id: "del", name: "删除", class: "btn-danger", bind: function () { del(this); },
        url: `/${_keyword}/main/deleteEntity.shtml`
    }, cancelBtn = {
        id: "cancel", name: "撤销", class: "btn-danger", bind: function () { cancel(this); },
        url: `/${_keyword}/main/cancel.shtml`
    }, refreshBtn = {
        id: "refresh", name: "刷新", class: "btn-info", bind: function () { window.datagrid.loadData(); },
    };
    if (rf == "RF") {
        btns = [addBtn, takedBtn, cancelBtn, refreshBtn,];
    } else {
        btns = [addBtn, editBtn, detailBtn, executeBtn, takedBtn, delBtn, cancelBtn, refreshBtn,];
    }
    if (_keyword == "inventory") {
        var whichAgv = function (that) {
            var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
            if (!cbox) { return; }
            gf.ajax(that.url, { key: cbox + "%" }, "json", function (s) {
                var info = "";
                for (var item of s) {
                    info = info + "<br/>" + item.key + ":" + item.value;
                }
                if (!info) { info = "未找到执行信息！"; }
                layer.msg(info);
            });
        }
        let whichAgvBtn = {
            id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () { whichAgv(this); },
            url: `/bd/conf.shtml?table=task_agv`
        };
        btns = btns.concat(whichAgvBtn);
    }
    gf.bindBtns("div.doc-buttons", btns);
}

export { initPaperOp };