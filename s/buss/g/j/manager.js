import "/s/buss/wms/sku/wms.sku.js";
import "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import "/s/buss/g/j/g.p.js";
import "/s/buss/g/j/jquery/jquery.autofill.js";

var _container = "#frames";
let _seq = 0;
let _num = 3;

var frameLoad = function (params) {
    $(this).contents().find("html").addClass("frame");
    let key = Math.random(0, 1);
    if (key > 0.7) {
        $(this).show();
    } else if (key > 0.4) {
        $(this).slideDown();
    } else {
        $(this).fadeIn();
    }
}

var loadPage = function (tip) {
    var sn = tip.split(",");
    let url = sn[2], openType = sn[3];
    if (openType) {
        if (url.indexOf("?", (url.indexOf("?") + 1)) > 0) {
            url = url.replace(/(.*)\?/, "$1&");
        }
        if (url.indexOf("{PROJECT_KEY}") >= 0) {
            url = url.replace("{PROJECT_KEY}", localStorage.projectKey);
        }
        if (openType == "1") {
            gf.appOpen(url);
            return;
        } else if (openType == "2") {
            gf.layerOpen({
                title: "AGV信息",
                area: ["70%", "100%"],
                offset: 'rb',
                content: url
            }); return;
        }
    }

    $(_container).find("iframe.loadhtml").addClass("hidden");

    let _frame = `iframe.loadhtml[src='${url}']`;
    if ($(_frame).length == 0) {
        _frame = $(`<iframe class="loadhtml"></iframe>`);
        $(_frame).data("tip", sn[1]);
        $(_frame).on("load", frameLoad);
        $(_container).append(_frame);
    }
    $(_frame).removeClass("hidden");
    $(_frame).data("seq", _seq++);

    if ($(".loadhtml").length > _num) {
        let a = $(".loadhtml").sort(function (a, b) { return $(a).data("seq") - $(b).data("seq"); }).filter(":eq(0)");
        a.remove();
    }
    gf.quoteModule(url, _frame);
    $("#nav").removeClass("nav-off-screen");
    $("#topli").html('');
    $(_container).find("iframe.loadhtml").each(function () {
        let a = $(`<a>${$(this).data("tip")}</a>`);
        $(a).data("seq", $(this).data("seq"));
        if (!$(this).hasClass("hidden"))
            $(a).addClass("orange");
        $(a).on("click", function () {
            $("#topli").find("a").removeClass("orange");
            $(this).addClass("orange");
            let seq = $(this).data("seq");
            $(_container).find("iframe.loadhtml").each(function () {
                if ($(this).data("seq") == seq) {
                    $(this).removeClass("hidden");
                } else {
                    $(this).addClass("hidden");
                }
            });
        });
        let li = $("<li></li>");
        li.append(a);
        $("#topli").append(li);
    });
    if (localStorage.remember) localStorage.index = sn;
}

$("[data-tip]").on("click", function () {
    $(this).parents("nav").find("li").removeClass("current");
    $(this).parent("li").addClass("current");
    loadPage($(this).data("tip"));
});

$("a#editUI").on("click", function () {
    window.pageii = layer.open({
        title: "编辑",
        type: 2,
        area: localStorage.layerArea.split(","),
        offset: "auto",
        content: '/user/selfInfo.shtml'
    });
});

localStorage.layerArea = ($(window).width() < 960) ? ["90%", "90%"] : ["900px", "80%"];
gv.init();
$("body").fadeIn();
loadPage(localStorage.index ? localStorage.index : "首页,首页,/s/buss/g/h/welcome.html");