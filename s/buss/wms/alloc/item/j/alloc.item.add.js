import { gf } from "/s/buss/g/j/g.f.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";

renderAll();
var checkDel = function () {
    if ($("div.item-group").length <= 1) {
        $("a.delOne").hide();
    } else {
        $("a.delOne").show();
    }
}

checkDel();

$("a.addOne").on("click", function () {
    if ($("div.item-group").length >= 8) {
        gf.layerMsg('最大取货量不能多于8个');
        return;
    }
    var apBody = $("div.item-group").first().clone()
        .attr("id", "itemBody" + $("div#panelBody").data("id"));
    apBody.find("input").val("").attr("id", "input" + $("div#panelBody").data("id"))
        .attr("name", "allocItemFormMap.allocItem" + "[" + $("div#panelBody").data("id") + "]");
    apBody.find("span.Validform_checktip").html("")
        .removeClass("Validform_wrong").removeClass("Validform_right");
    $("div#panelBody").append(apBody);
    $("div#panelBody").data("id", 1 + $("div#panelBody").data("id"));
    checkDel();
});

$("form").on("click", "a.delOne", function () {
    $(this).parents("div.item-group").remove();
    checkDel();
});

$("#form").validate({
    submitHandler: function (form) {// 必须写在验证前面，否则无法ajax提交
        gf.doAjaxSubmit(form, {// 验证新增是否成功
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.code >= 0) {
                    layer.confirm('添加成功!是否关闭窗口?', function (index) {
                        parent.datagrid.loadData();
                        parent.layer.close(parent.pageii);
                        return false;
                    });
                    $("#form")[0].reset();
                } else {
                    layer.alert('添加失败！' + data.msg, 3);
                }
            }
        });
    },
});