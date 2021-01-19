import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { drawPoints, drawPointId } from "/s/buss/acs/location/point/point.draw.js";
import { drawPath } from "/s/buss/acs/location/path/draw.path.js";
import { drawRect } from "/s/buss/acs/location/rect/draw.rect.js";

//绘制坐标轴  
function drawAxis() {
    var xAxis = d3.svg.axis().scale(conf.xScale).orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(conf.yScale).orient("left").ticks(5);
    conf.yScale.range([conf.yAxisWidth, 0]);

    //绘制x轴  
    var svggx;
    var svggy;
    if (conf.svg.selectAll("g").size() > 0) {
        svggx = conf.svg.selectAll("g.xaxis");
        svggy = conf.svg.selectAll("g.yaxis");
    } else {
        svggx = conf.svg.append("g").attr("class", "xaxis");
        svggy = conf.svg.append("g").attr("class", "yaxis");
    }
    svggx.attr("transform", "translate(" + conf.padding.left + "," + (conf.height - conf.padding.bottom) + ")").call(xAxis);
    svggy.attr("transform", "translate(" + conf.padding.left + "," + (conf.height - conf.padding.bottom - conf.yAxisWidth) + ")").call(yAxis);

    //绘制完坐标轴将值域变回去  
    conf.yScale.range([0, conf.yAxisWidth]);
}

var render = function () {
    drawPoints(datas.udfPoints);
    setTimeout(() => drawPoints(datas.udfPoints), 3000);
    drawPointId(datas.udfPoints);
    drawPath(datas.path);
    drawRect(datas.rect);
    if (conf.withAxis) { drawAxis(); }
}

var isRunning = false;
var renderSvgFunc = function (callback) {
    if (isRunning) { return; }
    isRunning = true;
    var datasss = [];
    for (var i in datas.datasetMap) {
        if (i != 9999) {
            if ((i != 9999 && datas.datasetMap[i] && datas.datasetMap[i].length > 5000) || conf.svg.selectAll("circle").size() == 0) {
                datasss = [].concat(datas.udfPoints);
                conf.datasetDetaMap = {};
                datas.datasetMap[i] = [];
            }
        }
    }

    for (var currentAgvNum in datas.datasetMap) {
        if (currentAgvNum == 9999) {
            datas.lastTaskPath = datas.datasetMap[9999];
        } else {
            if (conf.datasetDetaMap[currentAgvNum] && conf.datasetDetaMap[currentAgvNum].length > 0) {
                datasss = datasss.concat(conf.datasetDetaMap[currentAgvNum]);
                conf.datasetDetaMap[currentAgvNum] = [];
            }
        }
    }
    render();
    if (callback) callback();
    isRunning = false;
}

export var renderSvg = function (callback) {
    if (document.hidden) { return; }
    renderSvgFunc(callback);
};