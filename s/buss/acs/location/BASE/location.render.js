import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.tool.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";

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
        return conf.svg.append("defs").append("marker");
    }

    var arrowMarkerGray = defs().attr("id", "gray");
    var arrowMarkerMultiple = defs().attr("id", "multiple");
    var arrowMarkerHere = defs().attr("id", "here");
    arrow(arrowMarkerGray).attr("fill", aspect[0].color);
    arrow(arrowMarkerMultiple).attr("fill", aspect[aspect.length - 1].color);
    arrow(arrowMarkerHere).attr("fill", tool.getPointColor());

    var line = function () {
        return conf.svg.append("line")
            .attr("x1", conf.padding.left + conf.xScale(aspect[a].leftXaxis))
            .attr("y1", conf.height - conf.padding.bottom - conf.yScale(aspect[a].downYaxis))
            .attr("x2", conf.padding.left + conf.xScale(aspect[a].aspectXaxis))
            .attr("y2", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis))
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

var rectPath = function (tempYfc) {
    var path = conf.pathHome.selectAll("path").data(tempYfc)
        .enter()
        .append("path")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("from", function (d) {
            return d.from;
        })
        .attr("to", function (d) {
            return d.to;
        })
        .attr("d", function (d) {
            var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
            var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
            return "M" + result1[0] + "," + result1[1] +
                "L" + (result2[0] + result1[0]) / 2 + "," + (result2[1] + result1[1]) / 2 +
                "L" + result2[0] + "," + result2[1];
        })
        .attr("class", "clashLine")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("style", "marker-end:url(#triangle);");

    // var line = function () {
    //     return conf.svg.append("line")
    //         .attr("id", point0.id)
    //         .attr("from", point0.from)
    //         .attr("to", point0.to)
    //         .attr("x1", conf.padding.left + conf.xScale(point1[0]))
    //         .attr("y1", conf.height - conf.padding.bottom - conf.yScale(point1[1]))
    //         .attr("x2", conf.padding.left + conf.xScale(point2[0]))
    //         .attr("y2", conf.height - conf.padding.bottom - conf.yScale(point2[1]))
    //         .attr("class", "clashLine")
    //         .style("stroke-width", "2px");
    // }

    // for (var a in tempYfc) {
    //     if (a == tempYfc.length - 1 && tempYfc[a].color != conf.initColor) { break; }
    //     var area = tempYfc[a];
    //     var nextarea = tempYfc[parseInt(a) + 1];
    //     var points = [[area.rightXaxis, area.upYaxis], [area.leftXaxis, area.downYaxis]];

    //     for (var i = 0; i < points.length; i++) {
    //         var point0 = { id: area.id, from: area.from, to: area.to };
    //         var point1 = points[i];
    //         var point2 = i + 1 >= points.length ? points[0] : points[i + 1];
    //         if (nextarea && area.color != nextarea.color) {
    //             line().style("stroke", tool.getPointColor());
    //         } else if (area.color == conf.initColor) {
    //             line().style("stroke", area.color)
    //                 .style("stroke-dasharray", "4, 7");
    //         } else if (area.color != conf.initColor) {
    //             line().style("stroke", area.color);
    //         }
    //     }
    //     // conf.svg.append("text")
    //     //     .attr("x", conf.padding.left + conf.xScale((area.leftXaxis + area.rightXaxis) / 2) - 35)
    //     //     .attr("y", conf.height - conf.padding.bottom - conf.yScale((area.downYaxis + area.upYaxis) / 2) + 10)
    //     //     .attr("class", "clashLine")
    //     //     .style("stroke", "red")
    //     //     .style("font-size", "22px")
    //     //     .style("stroke-width", "1px")
    //     //     .text(area.title);
    // }
}

var isSiteCode = false;
function rect() {
    // $(".clashLine").remove();
    $(".mainRoad").remove();
    rectPath(datas.point);
    if (!isSiteCode && datas.locations && localStorage.projectKey == "LAO_DBWY") {
        siteCode(datas.locations);
        isSiteCode = true;
    }
    rectPath(datas.path);
    // rectAspect(datas.path);

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

function drawPoints(dataset) {
    conf.xScale = d3.scaleLinear().domain(conf.domainXVal).range([0, conf.xAxisWidth]);
    conf.yScale = d3.scaleLinear().domain(conf.domainYVal).range([0, conf.yAxisWidth]);

    var circleUpdate = conf.pointHome.selectAll("circle").data(dataset);

    var circleEnter = circleUpdate.enter();
    var circleExit = circleUpdate.exit();
    //update部分的处理方法  
    circleUpdate.transition()//更新数据时启动过渡  
        .duration(500).attr("cx", function (d) {
            return conf.padding.left + conf.xScale(d[1]);
        }).attr("cy", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]);
        }).attr("fill", function (d) {
            return tool.getColor(d);
        }).attr("r", function (d) {
            return (datas.inUdp(d)) ? 5 : (datas.inTaskPath(d) ? 4 : 2);
        });

    circleEnter.append("circle")
        .attr("fill", "red")
        .attr("id", function (d) {
            return d[0];
        })
        .attr("r", 20).transition().duration(500)
        .attr("class", function (d) {
            return datas.inAgv(d, 1) ? "agv1" : "agv2";
        })
        .attr("cx", function (d) {
            return conf.padding.left + conf.xScale(d[1]);
        }).attr("cy", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]);
        }).attr("fill", function (d) {
            return tool.getColor(d);
        }).attr("r", function (d) {
            return (datas.inUdp(d)) ? 3 : 5;
        });

    circleExit.transition().duration(500).attr("fill", "white").remove();

    rect();
}

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

export var renderSvg = function (callback) {
    datas.init();
    if (document.hidden) { return; }
    renderSvgFunc(callback);
};

var datasss = [].concat(datas.udfPoints);

var isRunning = false;
var renderSvgFunc = function (callback) {
    if (isRunning) { return; }
    isRunning = true;
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
    datasss = [].concat(datas.udfPoints);
    render(datas.lastTaskPath.concat(datasss));
    if (callback) callback();
    isRunning = false;
}

var drawAgvs = function () {
    $(".agvLine").remove();
    $(".agvs").remove();

    for (var i = 1; i <= datas.numInTask; i++) {
        var agv = datas.currentAgvs[i - 1];
        var line = function () {
            return conf.svgFixed.append("line")
                .attr("x1", conf.widthFixed / 5)
                .attr("y1", conf.heightFixed * i / (datas.numInTask + 1))
                .attr("x2", conf.widthFixed * 4 / 5)
                .attr("y2", conf.heightFixed * i / (datas.numInTask + 1))
                .attr("class", "agvLine")
                .style("stroke-width", "2px")
                .style("stroke", tool.getAgvColor(agv));
        }

        var arrowMarker = conf.svgFixed.append("defs").append("marker").attr("id", agv);
        arrow(arrowMarker).attr("fill", tool.getAgvColor(agv));
        line().attr("x2", conf.widthFixed * 4 / 5);
        line().attr("x2", conf.widthFixed / 2)
            .attr("marker-end", "url(#" + agv + ")");

        if (i === 1) {
            $("#agvs").append("<div class='agvs' style='width:" + (conf.widthAgvs - conf.widthFixed)
                + "px" + "; height:100%; float:right'>");
            $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (datas.numInTask + 1) / 2
                + "px" + "'>" + "</div>");
        }
        $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (datas.numInTask + 1)
            + "; line-height:" + conf.heightFixed / (datas.numInTask + 1) + "px" + "; color:" + tool.getAgvColor(agv) + "'>"
            + agv + "号AGV" + "</div>");
    }
}

var render = function (tempdata) {
    drawPoints(tempdata);
    if (conf.withAxis) {
        drawAxis();
    }
    drawAgvs();
}

export var markerDef = function () {
    var defs = conf.defsHome.append("defs");
    var marker1 = defs.append("marker")
        .attr("id", "triangle")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 5)
        .attr("markerHeight", 4)
        .attr("refX", 7.5)
        .attr("refY", 2)
        .attr("orient", "auto");
    marker1.append("path").attr("d", "M 0 0 L 5 2 L 0 4 z M 5 2 L 7.5 2").attr("fill", "black");
    var marker2 = defs.append("marker")
        .attr("id", "triangle2")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 5)
        .attr("markerHeight", 4)
        .attr("refX", 0)
        .attr("refY", 2)
        .attr("orient", "auto");
    marker2.append("path").attr("d", "M 0 0 L 5 2 L 0 4 z").attr("fill", "black");

} 