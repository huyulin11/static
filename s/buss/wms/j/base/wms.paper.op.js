import { gf } from "/s/buss/g/j/g.f.js";

export function delRm() {
    var cbox = window.datagrid.getSelectedCheckbox();
    if (cbox == "") {
        layer.msg("请选择删除项！！");
        return;
    }
    layer.confirm('是否删除？', function (index) {
        var url = '/receipt/main/deleteEntity.shtml';
        gf.ajax(url, { ids: cbox.join(",") }, "json", function (s) {
            if (s == "success") {
                layer.msg('删除成功');
                window.datagrid.loadData();
            } else {
                layer.msg('删除失败');
            }
        });
    });
}

export function executeRm(id) {
    layer.confirm('是否下达执行？（此动作不可撤回）', function (index) {
        var url = '/receipt/main/execute.shtml';
        gf.ajax(url, { id: id }, "json", function (s) {
            if (s == "success") {
                layer.msg('成功下达！');
                window.datagrid.loadData();
            } else {
                layer.msg('下达失败！' + s);
            }
        });
    });
}



export function delSm() {
    var cbox = window.datagrid.getSelectedCheckbox();
    if (cbox == "") {
        layer.msg("请选择删除项！！");
        return;
    }
    layer.confirm('是否删除？', function (index) {
        var url = '/shipment/main/deleteEntity.shtml';
        gf.ajax(url, { ids: cbox.join(",") }, "json", function (s) {
            if (s == "success") {
                layer.msg('删除成功');
                window.datagrid.loadData();
            } else {
                layer.msg('删除失败');
            }
        });
    });
}

export function executeSm(id) {
    layer.confirm('是否下达执行？（此动作不可撤回）', function (index) {
        var url = '/shipment/main/execute.shtml';
        gf.ajax(url, { id: id }, "json", function (s) {
            if (s == "success") {
                layer.msg('成功下达！');
                window.datagrid.loadData();
            } else {
                layer.msg('下达失败！');
            }
        });
    });
}
export function delIm() {
    var cbox = window.datagrid.getSelectedCheckbox();
    if (cbox == "") {
        layer.msg("请选择删除项！！");
        return;
    }
    layer.confirm('是否删除？', function (index) {
        var url = '/inventory/main/deleteEntity.shtml';
        gf.ajax(url, { ids: cbox.join(",") }, "json", function (s) {
            if (s == "success") {
                layer.msg('删除成功');
                window.datagrid.loadData();
            } else {
                layer.msg('删除失败');
            }
        });
    });
}

export function executeIm(id) {
    layer.confirm('是否下达此执行？（此动作不可撤回）', function (index) {
        var url = '/inventory/main/execute.shtml';
        gf.ajax(url, { id: id }, "json", function (s) {
            if (s == "success") {
                layer.msg('成功下达！');
                window.datagrid.loadData();
            } else {
                layer.msg('下达失败！');
            }
        });
    });
}