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
        layer.msg('最大取货量不能多于8个');
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

var demo = $("#form").Validform({
    tiptype: 3,
    label: ".label",
    showAllError: true,
    datatype: {
        "zh1-6": /^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
    },
    ajaxPost: true,
    callback: function (json) {
        localStorage.setItem("refreshSkuInfo", 1);
        if (json == "success") {
            $.Hidemsg();
            parent.datagrid.loadData();

            var to = setTimeout(() => {
                parent.layer.close(parent.pageii);
            }, 2000);

            layer.confirm('新增成功！是否继续添加？（两秒钟后自动关闭）', {
                btn: ['继续', '关闭']
            }, function () {
                clearTimeout(to);
                layer.msg('继续添加！');
                window.location.reload();
            }, function () {
                parent.layer.close(parent.pageii);
            });
        } else {
            layer.alert("新增失败！！" + json, {
                icon: 3,
                offset: 'auto'
            });
        }
        ;
    }
});