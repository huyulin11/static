import { gf } from "/s/buss/g/j/g.f.js";

var $currentTd;
$("html").on("click", "a.editSite", function (e) {
    editSite(this);
    e.stopPropagation();
});
var editSite = function (that) {
    _toggle();
    $currentTd = $(that).parents("td");
    var orivalue = $currentTd.find("span").html();
    var tr = $(that).parents("tr");
    var data = $currentTd.find("span").html();
    $currentTd.find("div.changable").hide();
    $currentTd.append(`<div class='editable'>
            <input type='text' id='editSiteInput' 
            title='单击弹出数据列表，输入字符匹配过滤，回车保存！' 
            value='${orivalue}' class='editSiteInput associating-input'
            placeholder='单击弹出数据列表' name='allocItemFormMap.sitename' autocomplete='off'
            data-searchurl='/tasksite/findFirstPage.shtml?taskSiteFormMap.sitename='
            data-showcol='sitename' data-keycol='sitename'></div>`);
    $currentTd.find("input").focus();
}
$("html").on("click", function () {
    editSiteInputBlur();
});
var editSiteInputBlur = function () {
    if (!$currentTd) { return; }
    var data = $currentTd.find("input.editSiteInput").data("vvvvSitename");
    if (!data) { data = ""; }
    $currentTd.find("div.changable");
    _toggle();
}
$("html").on("keydown", "input.editSiteInput", function (e) {
    if (e && e.keyCode == 27) {
        editSiteInputBlur();
    } else if (e && e.keyCode == 13) {
        editSiteInputEnter();
    } else {
        $(this).data("id", "");
    }
});
$("html").on("change", "input.editSiteInput", function (e) {
    console.log("eee");
});
var editSiteInputEnter = function () {
    var tr = $currentTd.parents("tr");
    var data = $currentTd.find("input").data("vvvvId");
    if (!data) {
        layer.msg("数据需从下拉列表中选取！");
        $currentTd.find("input").focus();
        return;
    }
    var currentid = tr.find("input:checkbox").val();
    var url = '/alloc/item/editEntity.shtml';
    gf.ajax(url, {
        "allocItemFormMap.id": currentid,
        "allocItemFormMap.siteid": data
    }, "json", function (s) {
        if (s.code >= 0) {
            layer.msg('修改成功！');
            $currentTd.find("div.changable").find("span").html(data);
            _toggle();
            window.datagrid.loadData();
        } else {
            layer.msg('修改失败：' + s.msg);
            $currentTd.find("input").focus();
        }
    });
}


var _toggle = function () {
    $("html").find("div.editable").each(function () {
        $(this).parents("td").find("div.changable").show();
        $(this).parents("td").find("div.editable").remove();
    });
    $currentTd = null;
}