$("#sub").on("click", function () {
    submitForm();
});

var submitForm = function () {
    var hasNotNull = false;
    $("#form").find("input,select").each(function () {
        if ($(this).data("notnull") && !$(this).val()) {
            hasNotNull = true;
            layer.tips('不能为空', this, {
                tips: [1, '#3595CC'],
                time: 4000
            });
            return false;
        }
        return true;
    });
    if (hasNotNull) {
        return;
    }

    $("#form").ajaxSubmit({
        type: "post",
        dataType: "json",
        timeout: 2000,
        data: { dictype: $("#dictype").html() },
        error: function (data) {
            alert("连接错误！");
        },
        success: function (json) {
            if (json == "success") {
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
        }
    });
};