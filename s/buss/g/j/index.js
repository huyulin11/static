function onloadurl() {
    $("[data-url]").each(function () {
        var tb = $(this);
        tb.html(CommnUtil.loadingImg());
        tb.load(tb.attr("data-url"));
    });
}
layer.config({
    extend: ['default/layer.css'], //加载新皮肤
    fix: false,// 用于设定层是否不随滚动条而滚动，固定在可视区域。
    skin: 'layer-ext-myskin' //一旦设定，所有弹层风格都采用此主题。
});
/**
 * options:
 * url : 获取select数据的路径
 * name : input name
 * textFiled :显示
 * valueFiled:value
 * data : 查询条件{}
 * value ：默认值
 */
function getSelectEx(byId, options) {
    if (byId && options) {
        if (options.url && options.textFiled && options.valueFiled
            && options.name) {
            $.ajax({
                type: "post", //使用get方法访问后台
                dataType: "json", //json格式的数据
                async: true, //同步   不写的情况下 默认为true
                url: options.url,
                data: options.data,
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var selectObj = $("#" + byId).find("ul");
                        if (selectObj) {
                            if (options.value == "" && i == 0) {
                                $("#" + byId).append(
                                    "<button data-toggle='dropdown' class='btn btn-sm btn-default dropdown-toggle'> "
                                    + "<span class='dropdown-label'>"
                                    + data[i][options.textFiled]
                                    + "</span> <span class='caret'></span></button>");
                                $("#" + byId).find("ul").append(
                                    "<li class='active'><a href='#'><input type='radio' name=" + options.name +
                                    " value=" + data[i][options.valueFiled] + " checked='checked'>"
                                    + data[i][options.textFiled]
                                    + "</a></li>");
                            } else {
                                if (options.value == data[i][options.valueFiled]) {
                                    $("#" + byId).append(
                                        "<button data-toggle='dropdown' class='btn btn-sm btn-default dropdown-toggle'> "
                                        + "<span class='dropdown-label'>"
                                        + data[i][options.textFiled]
                                        + "</span> <span class='caret'></span></button>");
                                    $("#" + byId).find("ul").append(
                                        "<li class='active'><a href='#'><input type='radio' name=" + options.name +
                                        " value=" + data[i][options.valueFiled] + " checked='checked'>"
                                        + data[i][options.textFiled]
                                        + "</a></li>");
                                } else {
                                    $("#" + byId).find("ul").append(
                                        "<li class=''><a href='#'><input type='radio' name=" + options.name +
                                        " value=" + data[i][options.valueFiled] + " >"
                                        + data[i][options.textFiled]
                                        + "</a></li>");
                                }
                            }
                        }
                    }
                }
            });

        }
    }
}