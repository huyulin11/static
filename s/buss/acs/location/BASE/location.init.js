import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { show, hide } from "/s/buss/acs/location/BASE/render/location.button.js";
import { mouseEvent, bandBodyClick } from "/s/buss/acs/location/BASE/render/location.on.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";
import { doubleDToStrig } from "/s/buss/acs/location/BASE/path/double.path.draw.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { rectEvent } from "/s/buss/acs/location/BASE/rect/rect.event.js";

let confs = [];
bandBodyClick();
confs.push({ init: true, url: "/s/buss/agv/site/cache/h/site.cache.html", key: 'cache', target: 'div#cacheContainer', height: "90%", width: "90%" });
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
confs.push({
    key: 'mouse', click: function () {
        let flag = $(this).hasClass("close");
        datas.init();
        if (flag) {
            $(this).removeClass("close").addClass("open");
            mouseEvent(flag);
            layer.msg('编辑模式');
            conf.pathHome1.selectAll("path").data(datas.point).attr("d", function (d) {
                var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
                return dToStrig(result1[0], result2[0], result1[1], result2[1]);
            });
        } else {
            $(this).removeClass("open").addClass("close");
            mouseEvent(flag);
            layer.msg('查看模式');
            conf.pathHome1.selectAll("path").data(datas.point).attr("d", function (d) {
                var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
                if (!d.isDouble) {
                    return dToStrig(result1[0], result2[0], result1[1], result2[1]);
                } else {
                    return doubleDToStrig(result1[0], result2[0], result1[1], result2[1]);
                }
            });
        }
    }
});
confs.push({
    key: 'build', click: function () {
        let flag = $(this).hasClass("close");
        if (flag) {
            $(this).removeClass("close").addClass("open");
            rectEvent(flag);
        } else {
            $(this).removeClass("open").addClass("close");
            rectEvent(flag);
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
    gflayer.openBak({ content: url, area: ["60%", "75%"], title: "监控" + v, offset: 'rb' });
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