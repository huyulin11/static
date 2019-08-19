$(function () {
    $("html").on("click", "a.editLapName", function () {
        doEdit(this);
    });
    var doEdit = function (that) {
        var td = $(that).parents("td");
        var tr = $(that).parents("tr");
        var data = td.find("span").html();
        td.html("<input type='text' class='editLapNameInput' name='agvLapFormMap.lapName' value='" + data
            + "' data-orivalue='" + data + "' title='回车保存！'/>");
        td.find("input").focus();
    }
    $("html").on("blur", "input.editLapNameInput", function () {
        whenEditInputBlur(this);
    });
    var whenEditInputBlur = function (that) {
        var td = $(that).parents("td");
        var data = td.find("input").data("orivalue");
        td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a class='editLapName'><img src='/s/i/edit.png'/></a>");
    }
    $("html").on("keydown", "input.editLapNameInput", function (e) {
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
        var url = '/agv/lap/editEntity.shtml';
        var s = CommnUtil.ajax(url, {
            "agvLapFormMap.id": currentid,
            "agvLapFormMap.lapName": data
        }, "json");
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
            + "<a class='editLapName'><img src='/s/i/edit.png'/></a>");
    }

});