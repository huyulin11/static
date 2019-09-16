import { gf } from "/s/buss/g/j/g.f.js";

function del(url) {
    var cbox = gf.checkNotNull(window.datagrid);
    if (!cbox) { return; }
    layer.confirm('是否删除？', function (index) {
        gf.ajax(url, { ids: cbox.join(",") }, "json", function (s) {
            layer.msg(s.msg);
            window.datagrid.loadData();
        });
    });
}

function execute(url) {
    var cbox = gf.checkOnlyOne(window.datagrid);
    if (!cbox) { return; }
    layer.confirm('是否下达执行？（此动作不可撤回）', function (index) {
        gf.ajax(url, { id: cbox }, "json", function (s) {
            if (s.code >= 0) {
                layer.msg('成功下达！');
                window.datagrid.loadData();
            } else {
                layer.msg('下达失败！' + s.msg);
            }
        });
    });
}

function edit(url) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    window.pageii = layer.open({
        title: "编辑",
        type: 2,
        area: ["600px", "80%"],
        content: url + "?paperid=" + cbox
    });
}

function add(url) {
    window.pageii = layer.open({
        title: "新增",
        type: 2,
        area: localStorage.layerArea.split(","),
        content: url
    });
}
function detail(url) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    window.pageii = layer.open({
        title: "明细",
        type: 2,
        area: localStorage.layerArea.split(","),
        content: url + cbox
    });
}
function take(url) {
    var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
    if (!cbox) { return; }
    layer.confirm('是否接单？', function (index) {
        gf.ajax(url, { id: cbox }, "json", function (s) {
            if (s.code >= 0) {
                layer.msg('成功下达！');
                window.datagrid.loadData();
            } else {
                layer.msg('下达失败！' + s.msg);
            }
        });
    });
}

var _keyword = null;
var initPaperOp = function (keyword, rf) {
    _keyword = keyword;
    let btns = null;
    if (rf == "RF") {
        btns = [{
            id: "detail", name: "明细", class: "btn-primary", bind: function () {
                detail(`/s/buss/wms/h/${_keyword}Details.html?${_keyword}MainFormMap.paperid=`);
            }
        },
        {
            id: "add", name: "接单", class: "btn-primary", bind: function () {
                take(`/${_keyword}/main/take.shtml`);
            }
        },];
    } else {
        btns = [{
            id: "add", name: "增加", class: "btn-primary", bind: function () {
                add(`/s/buss/wms/h/${_keyword}AddUI.html`);
            }
        },
        {
            id: "del", name: "删除", class: "btn-danger", bind: function () {
                del(`/${_keyword}/main/deleteEntity.shtml`);
            }
        },
        {
            id: "edit", name: "修改", class: "btn-primary", bind: function () {
                edit(`/s/buss/wms/h/${_keyword}AddUI.html`);
            }
        },
        {
            id: "detail", name: "明细", class: "btn-primary", bind: function () {
                detail(`/s/buss/wms/h/${_keyword}Details.html?${_keyword}MainFormMap.paperid=`);
            }
        },
        {
            id: "execute", name: "下达", class: "btn-danger", bind: function () {
                execute(`/${_keyword}/main/execute.shtml`);
            }
        },];
    }
    if (_keyword == "inventory") {
        var whichAgv = function (url) {
            var cbox = gf.checkOnlyOne(window.datagrid, "paperid");
            if (!cbox) { return; }
            var s = gf.ajax(url, { key: cbox + "%" }, "json");
            var info = "";
            for (var item of s) {
                info = info + "<br/>" + item.key + ":" + item.value;
            }
            if (!info) { info = "未找到执行信息！"; }
            layer.msg(info);
        }
        btns = btns.concat({
            id: "whichAgv", name: "执行AGV", class: "btn-info", bind: function () {
                whichAgv(`/bd/conf.shtml?table=task_agv`);
            }
        });
    }
    gf.bindBtns("div.doc-buttons", btns);
}

export { initPaperOp };