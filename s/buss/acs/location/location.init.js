import { init as initData, datas } from "/s/buss/acs/location/location.data.js";
import { markerDef } from "/s/buss/acs/location/path/def.marker.radian.js";
import { renderSvg } from "/s/buss/acs/location/location.render.js";
import { dataAgvLocation } from "/s/buss/acs/location/location.data.js";
import { drawAgv } from "/s/buss/acs/location/agv/draw.agv.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { mouseEvent, bandBodyClick } from "/s/buss/acs/location/location.event.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { doubleDToStrig } from "/s/buss/acs/location/path/double.path.draw.js";
import { dToStrig } from "/s/buss/acs/location/path/path.direction.js";
import { rectEvent } from "/s/buss/acs/location/rect/rect.event.js";

let confs = [];
initData();
markerDef();
renderSvg();
dataAgvLocation();
setInterval(() => {
    dataAgvLocation();
    drawAgv();
}, 3000);
bandBodyClick();
confs.push({
    init: true, url: "/s/buss/sys/conf/h/traffic.area.html",
    key: 'area', target: 'div#areaContainer', height: "70%", width: "50%"
});
confs.push({
    init: true, url: "/s/buss/agv/site/cache/h/site.cache.html",
    key: 'cache', target: 'div#cacheContainer', height: "70%", width: "50%"
});
confs.push({
    key: 'mouse', click: function () {
        let flag = $(this).hasClass("close");
        $('.open').attr('class', 'close hideToggle');
        datas.init();
        if (flag) {
            $(this).removeClass("close").addClass("open");
            mouseEvent(flag);
            layer.msg('编辑模式');
            conf.pathHome1.selectAll("path").data(datas.path).attr("d", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
                return dToStrig(result1[0], result2[0], result1[1], result2[1]);
            });
        } else {
            $(this).removeClass("open").addClass("close");
            mouseEvent(flag);
            layer.msg('查看模式');
            conf.pathHome1.selectAll("path").data(datas.path).attr("d", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
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
        $('.open').attr('class', 'close hideToggle');
        if (flag) {
            $(this).removeClass("close").addClass("open");
            d3.selectAll('rect').style('cursor', 'move');
            rectEvent(flag);
        } else {
            $(this).removeClass("open").addClass("close");
            rectEvent(flag);
            d3.selectAll('rect').style('cursor', 'default');
            d3.selectAll('.changeCircle').style('display', 'none');
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

toggleColor();
$("#toggleColor").on("click", toggleColor);
$("div.watch").on("click", function () { watch($(this).data("id")); });

$("body").append("<div id='msgOfAgv' style='display:none;color:white;position:fixed;right:2%;top:20%;'></div>");
for (let i in datas.color) {
    if (i.startsWith("agv")) {
        $("div#msgOfAgv").append("<span style='color:" + datas.color[i] + ";'>" + i + "----" + "</span><br/>");
    }
}