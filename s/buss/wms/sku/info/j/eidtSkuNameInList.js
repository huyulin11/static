$(function () {
    $("html").on("click", "a.editSkuName", function () {
        doEdit(this);
    });
    var doEdit = function (that) {
        var td = $(that).parents("td");
        var tr = $(that).parents("tr");
        var data = td.find("span").html();
        td.html("<input type='text' class='editSkuNameInput' name='skuInfoFormMap.name' value='" + data
            + "' data-orivalue='" + data + "' title='回车保存！'/>");
        td.find("input").focus();
    }
    $("html").on("blur", "input.editSkuNameInput", function () {
        whenEditInputBlur(this);
    });
    var whenEditInputBlur = function (that) {
        var td = $(that).parents("td");
        var data = td.find("input").data("orivalue");
        td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a class='editSkuName'><img src='/s/i/edit.png'/></a>");
    }
    $("html").on("keydown", "input.editSkuNameInput", function (e) {
        if (e && e.keyCode == 27) {
            whenEditInputBlur(this);
        } else if (e && e.keyCode == 13) {
            whenEditInputEnter(this);
        }
    });
    var whenEditInputEnter = function (that) {
        var td = $(that).parents("td");
        var tr = $(that).parents("tr");
        var data = td.find("input").val();
        var currentid = tr.find("input:checkbox").val();
        var url = '/sku/info/editEntity.shtml';
        var s = CommnUtil.ajax(url, {
            "skuInfoFormMap.id": currentid,
            "skuInfoFormMap.name": data
        }, "json");
        localStorage.setItem("refreshSkuInfo", 1);
        if (s == "success") {
            layer.msg('修改成功！');
            window.datagrid.loadData();
        } else {
            layer.msg('修改失败：' + s);
            td.find("input").focus();
        }

        var td = $(that).parents("td");
        var data = td.find("input").data("orivalue");
        td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a class='editSkuName'><img src='/s/i/edit.png'/></a>");
    }

});