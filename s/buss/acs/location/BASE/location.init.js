import { gf } from "/s/buss/g/j/g.f.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { show, hide } from "/s/buss/acs/location/BASE/render/location.button.js";

let confs = [];
confs.push({ init: true, url: "/s/buss/agv/site/cache/cache.html", key: 'cache', target: 'div#cacheContainer' });
confs.push({
    key: 'id', click: function () {
        let flag = $(this).hasClass("close");
        if (flag) {
            $(this).removeClass("close").addClass("open");
            hide();
            d3.select(".doc-buttons").select("#show").text("显示");
        } else {
            $(this).removeClass("open").addClass("close");
            show();
            d3.select(".doc-buttons").select("#show").text("隐藏");
        }
    }
});
renderModel(confs);

var keyNum = 1;
var toggleColor = function () {
    var key = $("html").data("key");
    key = key % 4;
    if (!key || key == 0) {
        $("html").css("background", "#036");
    } else if (key == 1) {
        $("html").css("background", "white");
    } else if (key == 2) {
        $("html").css("background", "url(/s/i/back/mowen.jpg)");
    } else if (key == 3) {
        $("html").css("background", "url(/s/i/back/muban.jpg)");
    }
    $("html").data("key", keyNum++);
}

var watch = function (v) {
    var url;
    if (v == 1) {
        url = 'http://212.64.34.125:10800/play.html?channel=28&iframe=yes';
    }
    if (v == 2) {
        url = 'http://212.64.34.125:10800/play.html?channel=8&iframe=yes';
    }
    if (v == 3) {
        url = '/json/open/yufeng/startup.shtml';
        if (!confirm('是否确认执行该操作?')) { return; }
        doWork(url);
        return;
    }
    if (v == 4) {
        url = '/json/open/yufeng/pause.shtml';
        if (!confirm('是否确认执行该操作?')) { return; }
        doWork(url);
        return;
    }
    gf.layerOpenBak({ content: url, area: ["60%", "75%"], title: "监控" + v, offset: 'rb' });
}
$("#toggleColor").on("click", toggleColor);
$("div.watch").on("click", function () { watch($(this).data("id")); });
toggleColor();

var doWork = function (url) {
    jQuery.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
        timeout: 6000
    });
}