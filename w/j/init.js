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
    // $("div#bdHead").load("/w/tips/bdHead.html");
    // $("div#bdFoot").load("/w/tips/bdFoot.html");

    $("body").delegate("a.service,a.tips,a.avatar", "click", function (event) {
        if ($(this).attr("data-id")) {
            window.location.href = "/w/tip/" + $(this).attr("data-id") + ".html";
        }
    });
    $("img.ii").attr('src', '/w/i/loading2.gif');

    if (!(window.location.host.startsWith("192.168") || window.location.host.startsWith("127.0.0.1"))) {
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: '', // 分享标题
                desc: '致力于工业自动化与企业信息化', // 分享描述
                imgUrl: 'http://www.calculatedfun.com/w/i/index/agv.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    alert("感谢您的分享");
                },
                cancel: function () {
                }
            });
            wx.onMenuShareTimeline({
                title: '', // 分享标题
                desc: '致力于工业自动化与企业信息化', // 分享描述
                imgUrl: 'http://www.calculatedfun.com/w/i/index/agv.png', // 分享图标
                success: function () {
                    alert("感谢您的分享");
                },
                cancel: function () {
                }
            });
        });
    }
})(jQuery);

$(document).ready(function () {
    setTimeout(function () {
        $("img.ii").lazyload({
            load: function () {
                if ($(this).hasClass("width100")) {
                    $(this).css({
                        width: $(window).width() > 1200 ? "960" : "100%"
                    });
                }
            },
            effect: "fadeIn"
        });
    }, 1000);
});
