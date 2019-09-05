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