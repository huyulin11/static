import { init as initData, datas } from "/s/buss/acs/location/location.data.js";
import { markerDef } from "/s/buss/acs/location/path/path.marker.js";
import { renderSvg } from "/s/buss/acs/location/location.render.js";
import { dataAgvLocation } from "/s/buss/acs/location/location.data.js";
import { drawAgv } from "/s/buss/acs/location/agv/draw.agv.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { mouseEvent } from "/s/buss/acs/location/location.event.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { rectEvent } from "/s/buss/acs/location/rect/rect.event.js";
import { undoStack, redoStack } from "/s/buss/acs/location/location.stack.js";
import { bodyEvent } from "/s/buss/acs/location/event/event.body.js";
import { rightClickBody } from "/s/buss/acs/location/body/body.rightclick.js";
import { createMap } from "/s/buss/acs/location/body/body.add_map.js";

let confs = [];
initData();
markerDef(true);
renderSvg();
dataAgvLocation();
setInterval(() => {
    dataAgvLocation();
    drawAgv();
}, 3000);
confs.push({
    init: true, title: "交管区域设计", url: "/s/buss/sys/conf/h/traffic.area.html",
    key: 'area', target: 'div#areaContainer', height: "70%", width: "50%"
});
confs.push({
    init: true, title: "站点缓存设计", url: "/s/buss/agv/site/cache/h/site.cache.html",
    key: 'cache', target: 'div#cacheContainer', height: "70%", width: "50%"
});
confs.push({
    key: 'clear', title: "清空缓存", click: function () {
        if (!confirm('是否确认执行该操作?')) { return; }
        gf.doAjax({
            url: `/tasksite/cache/clear.shtml`, type: "POST"
        });
    }
});
confs.push({
    key: 'mouse', title: "查看/编辑地图", click: function () {
        let flag = $(this).hasClass("close");
        $('.open').attr('class', 'close hideToggle');
        if (flag) {
            $(this).removeClass("close").addClass("open");
            mouseEvent(flag);
            rectEvent(flag);
            bodyEvent(flag);
            rightClickBody(flag);
            markerDef(!flag);
            createMap();
            layer.msg('编辑模式');
            d3.select('#shape_panel').style('display', 'block')
            conf.pathHome1.selectAll("path").data(datas.path).attr("d", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
                return pathTool.dPath(result1[0], result2[0], result1[1], result2[1]);
            });
            d3.selectAll('rect').style('cursor', 'move');
        } else {
            $(this).removeClass("open").addClass("close");
            mouseEvent(flag);
            rectEvent(flag);
            bodyEvent(flag);
            rightClickBody(flag);
            markerDef(!flag);
            undoStack.splice(0, undoStack.length);
            redoStack.splice(0, redoStack.length);
            layer.msg('查看模式');
            d3.select('#shape_panel').style('display', 'none');
            conf.pathHome1.selectAll("path").data(datas.path).attr("d", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
                d3.selectAll('rect').style('cursor', 'default');
                d3.selectAll('.changeCircle').style('display', 'none');
                if (!d.isDouble) {
                    return pathTool.dPath(result1[0], result2[0], result1[1], result2[1]);
                } else {
                    return pathTool.dDoublePath(result1[0], result2[0], result1[1], result2[1]);
                };
            });
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

var leftShape = d3.select('#shape_panel')
    .attr('style', "z-index:10;top:0px;left:0px;position:fixed;height:auto; width: " + $(window).width() * 0.13 + "px;background-color: #ddd; display:none");
var basePictrue = leftShape.append('div')
    .attr('id', 'panel_basic')
    .attr('class', 'content')
    .style('width', '164px');
var circle = basePictrue.append('div')
    .attr('class', 'panel_box')
    .attr('shapename', 'site')
    .attr('style', 'top:0px;left:0px;display:inline;')
    .append('img')
    .attr('id', 'circleimg')
    .attr('src', '/s/buss/acs/location/redpoint.png')
    .attr('style', 'width:40px;height:40px;');
var rect = basePictrue.append('div')
    .attr('class', 'panel_box')
    .attr('shapename', 'build')
    .attr('style', 'top:0px;left:0px;display:inline;')
    .append('img')
    .attr('id', 'rectimg')
    .attr('src', '/s/buss/acs/location/yellowrect.png')
    .attr('style', 'width:40px;height:40px;');

var addMap = leftShape.append('input')
    .attr('id', 'map_frame')
    .attr('class', 'content')
    .attr('type', 'file')
    .style('width', '164px');
var submitMap = leftShape.append('input')
    .attr('id', 'sub_btn')
    .attr('class', 'content')
    .attr('type', 'submit')
    .style('width', '164px');