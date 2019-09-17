

import { gf } from "/s/buss/g/j/g.f.js";

$("html").on("click", "a.editAllocName", function () {
    editAllocName(this);
});
var editAllocName = function (that) {
    var td = $(that).parents("td");
    var tr = $(that).parents("tr");
    var data = td.find("span").html();
    td.html("<input type='text' class='editAllocNameInput' name='allocItemFormMap.text' value='" + data
        + "' data-orivalue='" + data + "' title='回车保存！'/>");
    td.find("input").focus();
}
$("html").on("blur", "input.editAllocNameInput", function () {
    editAllocNameInputBlur(this);
});
var editAllocNameInputBlur = function (that) {
    var td = $(that).parents("td");
    var data = td.find("input").data("orivalue");
    td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<a class='editAllocName'><img src='/s/i/edit.png'/></a>");
}
$("html").on("keydown", "input.editAllocNameInput", function (e) {
    if (e && e.keyCode == 27) {
        editAllocNameInputBlur(this);
    } else if (e && e.keyCode == 13) {
        editAllocNameInputEnter(this);
    }
});
var editAllocNameInputEnter = function (that) {
    var td = $(that).parents("td");
    var tr = $(that).parents("tr");
    var data = td.find("input").val();
    var currentid = tr.find("input:checkbox").val();
    var url = '/alloc/item/editEntity.shtml';
    var s = gf.ajax(url, {
        "allocItemFormMap.id": currentid,
        "allocItemFormMap.text": data
    }, "json");
    if (s.code >= 0) {
        layer.msg('修改成功！');
        window.datagrid.loadData();
    } else {
        layer.msg('修改失败：' + s.msg);
        td.find("input").focus();
    }

    var td = $(that).parents("td");
    var data = td.find("input").data("orivalue");
    td.html("<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<a class='editAllocName'><img src='/s/i/edit.png'/></a>");
}