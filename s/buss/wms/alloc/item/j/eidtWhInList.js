$(function () {
    var $currentTd;
    $("html").on("click", "a.editWh", function (e) {
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
            <input type='text' id='editWhInput' 
            title='单击弹出数据列表，输入字符匹配过滤，回车保存！' 
            value='${orivalue}' class='editWhInput associating-input' 
            placeholder='单击弹出数据列表' name='allocItemFormMap.whId' autocomplete='off'
            data-searchurl='/sys/dic/data/findByValue.shtml?sysDicDataFormMap.dictype=WAREHOUSE&dicvalue=' 
            data-showcol='dicvalue' data-keycol='dicvalue'> </div>`);
        $currentTd.find("input").focus();
    }
    $("html").on("click", function () {
        doEditInputBlur();
    });
    var doEditInputBlur = function () {
        if (!$currentTd) { return; }
        var data = $currentTd.find("input.editWhInput").data("vvvvWhId");
        if (!data) { data = ""; }
        $currentTd.find("div.changable");
        _toggle();
    }
    $("html").on("keydown", "input.editWhInput", function (e) {
        if (e && e.keyCode == 27) {
            doEditInputBlur();
        } else if (e && e.keyCode == 13) {
            doEditInputEnter();
        } else {
            $(this).data("id", "");
        }
    });
    $("html").on("change", "input.editWhInput", function (e) {
        console.log("eee");
    });
    var doEditInputEnter = function () {
        var tr = $currentTd.parents("tr");
        var data = $currentTd.find("input").data("vvvvDickey");
        if (!data) {
            layer.msg("数据需从下拉列表中选取！");
            $currentTd.find("input").focus();
            return;
        }
        var currentid = tr.find("input:checkbox").val();
        var url = '/alloc/item/editEntity.shtml';
        var s = CommnUtil.ajax(url, {
            "allocItemFormMap.id": currentid,
            "allocItemFormMap.whId": data
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