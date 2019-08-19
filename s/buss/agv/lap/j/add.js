var $input = $('#skuId');
$('#sub').click(function(){
    $input.val($input.parent().find('input').data('vvvvId'));
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
            layer.alert(json, {
                icon: 3,
                offset: 'auto'
            });
        }
        ;
    }
});