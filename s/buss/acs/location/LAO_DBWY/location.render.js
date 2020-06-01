import { conf } from "/s/buss/acs/location/BASE/location.data.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.data.tool.js";

var arrow = function (arrow) {
    var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
    return arrow.attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "8")
        .attr("markerHeight", "8")
        .attr("viewBox", "0 0 12 12")
        .attr("refX", "6")
        .attr("refY", "6")
        .attr("orient", "auto")
        .append("path")
        .attr("d", arrow_path);
}

var rectAspect = function (aspect) {
    $(".aspect").remove();
    $("defs").remove();
    $("image").remove();
    if (aspect.length == 0) { return; }

    var defs = function () {
        return conf.svg.append("defs")
            .append("marker")
    }

    var arrowMarkerGray = defs().attr("id", "gray");
    var arrowMarkerMultiple = defs().attr("id", "multiple");
    var arrowMarkerHere = defs().attr("id", "here");
    arrow(arrowMarkerGray).attr("fill", aspect[0].color);
    arrow(arrowMarkerMultiple).attr("fill", aspect[aspect.length - 1].color);
    arrow(arrowMarkerHere).attr("fill", agvsColor.point);

    var line = function () {
        return conf.svg.append("line")
            .attr("x1", conf.padding.left + conf.xScale(aspect[a].leftXaxis))
            .attr("y1", conf.height - conf.padding.bottom - conf.yScale(aspect[a].downYaxis))
            .attr("x2", conf.padding.left + conf.xScale(aspect[a].aspectXaxis))
            .attr("y2", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis))
            .attr("class", "aspect")
            .style("stroke-width", "2px");
    }

    for (var a in aspect) {
        if (a == aspect.length - 1) { break; }
        if (aspect[a].color == aspect[0].color && aspect[a].color == aspect[parseInt(a) + 1].color) {
            line().style("stroke", aspect[parseInt(a) + 1].color)
                .attr("marker-end", "url(#gray)");
        } else if (aspect[a].color == aspect[0].color && aspect[a].color != aspect[parseInt(a) + 1].color) {
            conf.svg.append("image")
                .attr("x", conf.padding.left + conf.xScale(aspect[a].aspectXaxis) - 15)
                .attr("y", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis) - 15)
                .attr("width", 30)
                .attr("height", 30)
                .attr("xlink:href", "/s/i/agv.png")
        } else if (aspect[a].color != aspect[0].color) {
            line().style("stroke", aspect[a].color)
                .attr("marker-end", "url(#multiple)");
        }
    }
}

var siteCode = function (locations) {
    var text = function () {
        return conf.svg.append("text")
            .style("stroke", "black")
            .style("font-size", "10px")
            .style("stroke-width", "0.7px")
            .text(location.id);
    }
    for (var location of locations) {
        var locationid = location.id;
        if (locationid > 2005) {
            if (4000 < locationid && locationid < 4004) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) - 5);
            } else if ((2010 < locationid && locationid < 2016) || (2025 < locationid && locationid < 2037) || (2077 < locationid && locationid < 2088)) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 5)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            } else if ((2015 < locationid && locationid < 2026) || (2036 < locationid && locationid < 2048) || (2067 < locationid && locationid < 2078) || (2087 < locationid && locationid < 2098)) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 13)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            } else if (2107 < locationid && locationid < 2119 && locationid % 2 == 1) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) - 5);
            } else {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            }
        }
    }
}

var rectPath = function (yfc) {
    var line = function () {
        return conf.svg.append("line")
            .attr("x1", conf.padding.left + conf.xScale(point1[0]))
            .attr("y1", conf.height - conf.padding.bottom - conf.yScale(point1[1]))
            .attr("x2", conf.padding.left + conf.xScale(point2[0]))
            .attr("y2", conf.height - conf.padding.bottom - conf.yScale(point2[1]))
            .attr("class", "clashLine")
            .style("stroke-width", "2px");
    }

    for (var a in yfc) {
        if (a == yfc.length - 1 && yfc[a].color != initColor) { break; }
        var area = yfc[a];
        var nextarea = yfc[parseInt(a) + 1];
        var points = [[area.rightXaxis, area.upYaxis], [area.leftXaxis, area.downYaxis]];

        for (var i = 0; i < points.length; i++) {
            var point1 = points[i];
            var point2 = i + 1 >= points.length ? points[0] : points[i + 1];

            if (nextarea && area.color != nextarea.color) {
                line().style("stroke", agvsColor.point);
            } else if (area.color == initColor) {
                line().style("stroke", area.color)
                    .style("stroke-dasharray", "4, 7");
            } else if (area.color != initColor) {
                line().style("stroke", area.color);
            }
        }
        conf.svg.append("text")
            .attr("x", conf.padding.left + conf.xScale((area.leftXaxis + area.rightXaxis) / 2) - 35)
            .attr("y", conf.height - conf.padding.bottom - conf.yScale((area.downYaxis + area.upYaxis) / 2) + 10)
            .attr("class", "clashLine")
            .style("stroke", "red")
            .style("font-size", "22px")
            .style("stroke-width", "1px")
            .text(area.title);
    }
}

var isSiteCode = false;
function rect() {
    $(".clashLine").remove();
    $(".mainRoad").remove();

    rectPath(yfc);
    if (!isSiteCode && isLocations) {
        siteCode(locations);
        isSiteCode = true;
    }
    rectPath(yfcs);
    rectAspect(yfcs);

    // for (var a in clashArea) {
    //     var area = clashArea[a];

    //     $("line.clashLine").remove();
    //     $("line.mainRoad").remove();

    //     var points = [[area.leftXaxis, area.upYaxis], [area.rightXaxis, area.upYaxis],
    //     [area.rightXaxis, area.downYaxis], [area.leftXaxis, area.downYaxis]];

    //     for (var i = 0; i < points.length; i++) {
    //         var point1 = points[i];
    //         var point2 = i + 1 >= points.length ? points[0] : points[i + 1];

    //         conf.svg.append("line")
    //             .attr("x1", conf.padding.left + conf.xScale(point1[0]))
    //             .attr("y1", conf.height - conf.padding.bottom - conf.yScale(point1[1]))
    //             .attr("x2", conf.padding.left + conf.xScale(point2[0]))
    //             .attr("y2", conf.height - conf.padding.bottom - conf.yScale(point2[1]))
    //             .attr("class", "clashLine")
    //             .style("stroke", "red")
    //             .style("stroke-width", "2px");
    //     }
    // }

    conf.svg.append("line")
        .attr("x1", conf.padding.left + conf.xScale(-90000))
        .attr("y1", conf.height - conf.padding.bottom - conf.yScale(-2600))
        .attr("x2", conf.padding.left + conf.xScale(20000))
        .attr("y2", conf.height - conf.padding.bottom - conf.yScale(-2600))
        .style("stroke", "#333")
        .attr("class", "mainRoad")
        .style("stroke-width", "1px");

    conf.svg.append("line")
        .attr("x1", conf.padding.left + conf.xScale(-90000))
        .attr("y1", conf.height - conf.padding.bottom - conf.yScale(1500))
        .attr("x2", conf.padding.left + conf.xScale(20000))
        .attr("y2", conf.height - conf.padding.bottom - conf.yScale(1500))
        .style("stroke", "#333")
        .attr("class", "mainRoad")
        .style("stroke-width", "1px");
}

function drawCircle(dataset) {
    conf.xScale = d3.scale.linear().domain(domainXVal).range([0, conf.xAxisWidth]);
    conf.yScale = d3.scale.linear().domain(domainYVal).range([0, conf.yAxisWidth]);

    var circleUpdate = conf.svg.selectAll("circle").data(dataset);

    var circleEnter = circleUpdate.enter();
    var circleExit = circleUpdate.exit();
    //update部分的处理方法  
    circleUpdate.transition()//更新数据时启动过渡  
        .duration(500).attr("cx", function (d) {
            return conf.padding.left + conf.xScale(d[0]);
        }).attr("cy", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[1]);
        }).attr("fill", function (d) {
            return tool.getColor(d);
        }).attr("r", function (d) {
            return (tool.inUdp(d)) ? 3 : (tool.inTaskPath(d) ? 4 : 2);
        });

    circleEnter.append("circle")
        .attr("fill", "red")
        .attr("r", 20).transition().duration(500)
        .attr("class", function (d) {
            return tool.inAgv(d, 1) ? "agv1" : "agv2";
        })
        .attr("cx", function (d) {
            return conf.padding.left + conf.xScale(d[0]);
        }).attr("cy", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[1]);
        }).attr("fill", function (d) {
            return tool.getColor(d);
        }).attr("r", function (d) {
            return (tool.inUdp(d)) ? 3 : 5;
        });

    circleExit.transition().duration(500).attr("fill", "white").remove();

    rect();
}

//绘制坐标轴  
function drawAxis() {
    var xAxis = d3.svg.axis().scale(conf.xScale).orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(conf.yScale).orient("left").ticks(5);

    conf.yScale.range([yAxisWidth, 0]);

    //绘制x轴  
    var svggx;
    var svggy;
    if (svg.selectAll("g").size() > 0) {
        svggx = conf.svg.selectAll("g.xaxis");
        svggy = conf.svg.selectAll("g.yaxis");
    } else {
        svggx = conf.svg.append("g").attr("class", "xaxis");
        svggy = conf.svg.append("g").attr("class", "yaxis");
    }
    svggx.attr("transform", "translate(" + conf.padding.left + "," + (height - conf.padding.bottom) + ")").call(xAxis);
    svggy.attr("transform", "translate(" + conf.padding.left + "," + (height - conf.padding.bottom - yAxisWidth) + ")").call(yAxis);

    //绘制完坐标轴将值域变回去  
    conf.yScale.range([0, yAxisWidth]);

}

export var renderSvg = function () {
    if (document.hidden) { return; }
    renderSvgFunc();
};

var isRunning = false;

var datasss = [].concat(udp);

var renderSvgFunc = function () {
    if (isRunning) { return; }

    isRunning = true;

    for (var i in datasetMap) {
        if (i != 9999) {
            if ((i != 9999 && datasetMap[i] && datasetMap[i].length > 5000) || conf.svg.selectAll("circle").size() == 0) {
                datasss = [].concat(udp);
                datasetDetaMap = {};
                datasetMap[i] = [];
            }
        }
    }

    for (var currentAgvNum in datasetMap) {

        if (currentAgvNum == 9999) {
            lastTaskPath = datasetMap[9999];
        } else {
            if (datasetDetaMap[currentAgvNum] && datasetDetaMap[currentAgvNum].length > 0) {
                datasss = datasss.concat(datasetDetaMap[currentAgvNum]);
                datasetDetaMap[currentAgvNum] = [];
            }
        }
    }

    render(lastTaskPath.concat(datasss));
    isRunning = false;
}

var drawAgvs = function () {
    $(".agvLine").remove();
    $(".agvs").remove();

    for (var i = 1; i <= currentTasks; i++) {
        var agv = currentAgvs[i - 1];
        var line = function () {
            return svgFixed.append("line")
                .attr("x1", widthFixed / 5)
                .attr("y1", conf.heightFixed * i / (currentTasks + 1))
                .attr("x2", widthFixed * 4 / 5)
                .attr("y2", conf.heightFixed * i / (currentTasks + 1))
                .attr("class", "agvLine")
                .style("stroke-width", "2px")
                .style("stroke", tool.agvsColor["agv" + agv]);
        }

        var arrowMarker = svgFixed.append("defs")
            .append("marker")
            .attr("id", agv);
        arrow(arrowMarker).attr("fill", tool.agvsColor["agv" + agv]);
        line().attr("x2", widthFixed * 4 / 5);
        line().attr("x2", widthFixed / 2)
            .attr("marker-end", "url(#" + agv + ")");

        if (i === 1) {
            $("#agvs").append("<div class='agvs' style='width:" + (widthAgvs - widthFixed)
                + "px" + "; height:100%; float:right'>");
            $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (currentTasks + 1) / 2
                + "px" + "'>" + "</div>");
        }
        $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (currentTasks + 1)
            + "; line-height:" + conf.heightFixed / (currentTasks + 1) + "px" + "; color:" + tool.agvsColor["agv" + agv] + "'>"
            + agv + "号AGV" + "</div>");
    }
}

var render = function (datasss) {
    drawCircle(datasss);
    //drawAxis();
    drawAgvs();
}