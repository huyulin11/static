(function ($) {
    var showTips = function () {
        open("1");
        return;
    }

    var open = function (id) {
        layer.closeAll();
        openUrl = 'info.html?id=' + id;
        window.open(openUrl);
    }

    var fun = function (pageName) {
        $("#info_content").load(pageName);
        $(document).scrollTop(3000);
    }

    $("div#bdDiv").css("min-height", window.innerHeight - 34);
    $("div#bdHead").load("tips/bdHead.html");
    $("div#bdFoot").load("tips/bdFoot.html");

    $("body").delegate("a.service,a.tips,a.avatar", "click", function (event) {
        window.location.href = "" + $(this).attr("data-id") + ".html";
    });

    $("div#bdHead").delegate("a.nav0", "click", function (event) {
        window.location.href = "index.html";
    });
    $("img.ii").lazyload({
        effect: "fadeIn"
    });
})(jQuery);
