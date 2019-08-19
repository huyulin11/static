$(function () {
    $("html").on("click", "a.editTaskSeq", function () {
        doEdit(this);
    });
    var doEdit = function (that) {
        var td = $(that).parents("td");
        var tr = $(that).parents("tr");
        var data = td.find("span").html();
        td.html("<input type='text' class='editTaskSeqInput' value='" + data
            + "' data-orivalue='" + data + "' title='数字越大，优先级越高。回车保存！'/>");
        td.find("input").focus();
    }
    $("html").on("blur", "input.editTaskSeqInput", function () {
        whenEditInputBlur(this);
    });
    var whenEditInputBlur = function (that) {
        var td = $(that).parents("td");
        var data = td.find("input").data("orivalue");
        td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a class='editTaskSeq'><img src='/s/i/edit.png'/></a>");
    }
    $("html").on("keydown", "input.editTaskSeqInput", function (e) {
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
        var taskexesid = tr.children('td').eq(2).html();
        var url = '/agvImmediateTask/editEntity.shtml';
        var s = CommnUtil.ajax(url, {
            "ImmediateTaskFormMap.taskexesid": taskexesid,
            "ImmediateTaskFormMap.json": data
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
            + "<a class='editTaskSeq'><img src='/s/i/edit.png'/></a>");
    }

});