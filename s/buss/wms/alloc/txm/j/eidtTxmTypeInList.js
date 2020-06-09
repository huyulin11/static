import { gf } from "/s/buss/g/j/g.f.js";

var $currentTd;
$("html").on("click", "a.editSkuType", function (e) {
    doEdit(this);
    e.stopPropagation();
});
var doEdit = function (that) {
    _toggle();
    $currentTd = $(that).parents("td");
    var orivalue = $currentTd.find("span").html();
    var tr = $(that).parents("tr");
    var data = $currentTd.find("span").html();
    $currentTd.find("div.changable").hide();
    $currentTd.append(`<div class='editable'>
            <input type='text' id='editSkuTypeInput'
            title='单击弹出数据列表，输入字符匹配过滤，回车保存！' 
            value='${orivalue}' class='editSkuTypeInput associating-input'
            placeholder='单击弹出数据列表' name='skuTypeFormMap.name' autocomplete='off'
            data-searchurl='/sku/type/findFirstPage.shtml?skuTypeFormMap.name='
            data-showcol='name' data-keycol='name'></div>`);
    $currentTd.find("input").focus();
}
$("html").on("click", function () {
    whenEditInputBlur();
});
var whenEditInputBlur = function () {
    if (!$currentTd) { return; }
    var data = $currentTd.find("input.editSkuTypeInput").data("vvvvskutypename");
    if (!data) { data = ""; }
    $currentTd.find("div.changable");
    _toggle();
}
$("html").on("keydown", "input.editSkuTypeInput", function (e) {
    if (e && e.keyCode == 27) {
        whenEditInputBlur();
    } else if (e && e.keyCode == 13) {
        whenEditInputEnter();
    } else {
        $(this).data("id", "");
    }
});
$("html").on("change", "input.editSkuTypeInput", function (e) {
    console.log("eee");
});
var whenEditInputEnter = function () {
    var tr = $currentTd.parents("tr");
    var data = $currentTd.find("input").val();
    var currentid = tr.find("input:checkbox").val();
    var url = '/sku/txm/editEntity.shtml';
    gf.ajax(url, {
        "skuInfoFormMap.id": currentid,
        "skuInfoFormMap.type": data
    }, "json", function (s) {
        localStorage.refreshSkuInfo = 1;
        if (s.code >= 0) {
            gf.layerMsg('修改成功！');
            $currentTd.find("div.changable").find("span").html(data);
            _toggle();
            window.datagrid.loadData();
        } else {
            gf.layerMsg('修改失败：' + s.msg);
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