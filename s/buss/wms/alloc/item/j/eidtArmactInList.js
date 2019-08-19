$(function () {
    var $currentTd;
    $("html").on("click", "a.editArmact", function (e) {
        editArmact(this);
        e.stopPropagation();
    });
    var editArmact = function (that) {
        _toggle();
        $currentTd = $(that).parents("td");
        var orivalue = $currentTd.find("span").html();
        var tr = $(that).parents("tr");
        var data = $currentTd.find("span").html();
        $currentTd.find("div.changable").hide();
        $currentTd.append(`<div class='editable'>
            <input type='text' id='editArmactInput' 
            title='单击弹出数据列表，输入字符匹配过滤，回车保存！' 
            value='${orivalue}' class='editArmactInput associating-input' 
            placeholder='单击弹出数据列表' name='allocItemFormMap.armactname' autocomplete='off'
            data-searchurl='/armact/findFirstPage.shtml?armactFormMap.armactname=' 
            data-showcol='armactname' data-keycol='armactname'> </div>`);
        $currentTd.find("input").focus();
    }
    $("html").on("click", function () {
        editArmactInputBlur();
    });
    var editArmactInputBlur = function () {
        if (!$currentTd) { return; }
        var data = $currentTd.find("input.editArmactInput").data("vvvvArmactname");
        if (!data) { data = ""; }
        $currentTd.find("div.changable");
        _toggle();
    }
    $("html").on("keydown", "input.editArmactInput", function (e) {
        if (e && e.keyCode == 27) {
            editArmactInputBlur();
        } else if (e && e.keyCode == 13) {
            editArmactInputEnter();
        } else {
            $(this).data("id", "");
        }
    });
    $("html").on("change", "input.editArmactInput", function (e) {
        console.log("eee");
    });
    var editArmactInputEnter = function () {
        var tr = $currentTd.parents("tr");
        var data = $currentTd.find("input").data("vvvvId");
        if (!data) {
            layer.msg("数据需从下拉列表中选取！");
            $currentTd.find("input").focus();
            return;
        }
        var currentid = tr.find("input:checkbox").val();
        var url = '/alloc/item/editEntity.shtml';
        var s = CommnUtil.ajax(url, {
            "allocItemFormMap.id": currentid,
            "allocItemFormMap.armactid": data
        }, "json");
        if (s == "success") {
            layer.msg('修改成功！');
            $currentTd.find("div.changable").find("span").html(data);
            _toggle();
            window.datagrid.loadData();
        } else {
            layer.msg('修改失败：' + s);
            $currentTd.find("input").focus();
        }
    }


    var _toggle = function () {
        $("html").find("div.editable").each(function () {
            $(this).parents("td").find("div.changable").show();
            $(this).parents("td").find("div.editable").remove();
        });
        $currentTd = null;
    }
});