import { gf } from "/s/buss/g/j/g.f.js";

$("html").on("click", "a.editLapName", function () {
    doEdit(this);
});
var doEdit = function (that) {
    var td = $(that).parents("td");
    var tr = $(that).parents("tr");
    var data = td.find("span").html();
    td.html("<input type='text' class='editLapNameInput' name='lapInfoFormMap.name' value='" + data
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
    var url = '/sys/lap/editEntity.shtml';
    var s = gf.ajax(url, {
        "lapInfoFormMap.id": currentid,
        "lapInfoFormMap.name": data
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
        + "<a class='editLapName'><img src='/s/i/edit.png'/></a>");
}