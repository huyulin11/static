import "/s/buss/wms/sku/info/j/wms.sku.js";
import "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import "/s/buss/g/j/g.p.js";
import "/s/buss/g/j/jquery/jquery.autofill.js";

gf.checkLoginError();
gf.currentUser(function (data) { $("#currentUser").html(data) });

var _container = "#frames";
var _menuContainer = "#menuContainer";
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
            gf.layerOpenBak({
                title: "AGV信息",
                area: ["70%", "100%"],
                offset: 'rb',
                content: url
            }); return;
        } else if (openType == "3") {
            window.open(url, '_self');
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
    if (localStorage.remember && openType != '3') localStorage.index = sn; else localStorage.index = '';
}

gf.loadPage = loadPage;

$("a#editUI").on("click", function () {
    window.pageii = gf.layerOpen({
        title: "编辑",
        type: 2,
        offset: "auto",
        content: '/user/selfInfo.shtml'
    });
});

gv.init();
$("body").fadeIn();
loadPage(localStorage.index ? localStorage.index : "首页,首页,/s/buss/g/h/welcome.html");

gf.doAjax({
    url: "/resources/menuTree.shtml",
    datatype: "JSON",
    success: function (data) {
        try {
            data = JSON.parse(data);
        } catch (error) {
            window.location.href = "/s/buss/g/h/login.html";
            return;
        }
        for (let index = 0; index < data.length; index++) {
            let key = data[index];
            let tip = `${key.name},${key.name},${key.resUrl}?id=${key.id},${key.openType}`;

            let tagLi = $("<li></li>");
            if (index == 0) { tagLi.addClass("active"); }
            let tagA = $("<a></a>");
            if (index == 0) { tagA.addClass("active"); }
            let ul = $('<ul class="nav lt"></ul>');
            key.children.sort((m, n) => { return m.sortflag - n.sortflag });
            if (key.children && key.children.length > 0) {
                let info = $("<i class='fa icon'></i>");
                if (index == 0) { info.addClass("bg-danger"); }
                else if (index == 1) { info.addClass("bg-warning"); }
                else if (index == 2) { info.addClass("bg-primary"); }
                else if (index == 3) { info.addClass("bg-info"); }
                else if (index == 4) { info.addClass("bg-success"); }
                $(tagA).append(info);
                $(tagA).append(`<span class="pull-right"> <i class="fa fa-angle-down text"></i>
                    <i class="fa fa-angle-up text-active"></i></span>`);

                for (let child of key.children) {
                    tip = `${key.name},${child.name},${child.resUrl}?id=${child.id},${child.openType}`;
                    $(ul).append(`<li class="active"><a class="active"
                        data-tip="${tip}"><i class="fa fa-angle-right"></i> 
                        <span>${child.name}</span></a></li>`);
                }
            } else {
                $(tagA).data("tip", tip);
            }
            $(tagA).append(`<span>${key.name}</span>`);
            $(tagLi).append(tagA);
            $(tagLi).append(ul);
            $(_menuContainer).append(tagLi);
        }

        $(_menuContainer).delegate("a", "click", function () {
            let that = this;
            if (!$(that).data("tip")) { return; }
            gf.checkLogin(function () {
                $(that).parents("nav").find("li").removeClass("current");
                $(that).parent("li").addClass("current");
                loadPage($(that).data("tip"));
            }, function () {
                window.location.href = "/s/buss/g/h/login.html";
            });
        });
    }, error: function () {
        window.location.href = "/s/buss/g/h/login.html";
    }
});