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
        return svg.append("defs")
            .append("marker")
    }

    var arrowMarkerGray = defs().attr("id", "gray");
    var arrowMarkerMultiple = defs().attr("id", "multiple");
    var arrowMarkerHere = defs().attr("id", "here");
    arrow(arrowMarkerGray).attr("fill", aspect[0].color);
    arrow(arrowMarkerMultiple).attr("fill", aspect[aspect.length - 1].color);
    arrow(arrowMarkerHere).attr("fill", agvsColor.point);

    var line = function () {
        return svg.append("line")
            .attr("x1", padding.left + xScale(aspect[a].leftXaxis))
            .attr("y1", height - padding.bottom - yScale(aspect[a].downYaxis))
            .attr("x2", padding.left + xScale(aspect[a].aspectXaxis))
            .attr("y2", height - padding.bottom - yScale(aspect[a].aspectYaxis))
            .attr("class", "aspect")
            .style("stroke-width", "2px");
    }

    for (var a in aspect) {
        if (a == aspect.length - 1) { break; }
        if (aspect[a].color == aspect[0].color && aspect[a].color == aspect[parseInt(a) + 1].color) {
            line().style("stroke", aspect[parseInt(a) + 1].color)
                .attr("marker-end", "url(#gray)");
        } else if (aspect[a].color == aspect[0].color && aspect[a].color != aspect[parseInt(a) + 1].color) {
            svg.append("image")
                .attr("x", padding.left + xScale(aspect[a].aspectXaxis) - 15)
                .attr("y", height - padding.bottom - yScale(aspect[a].aspectYaxis) - 15)
                .attr("width", 30)
                .attr("height", 30)
                .attr("xlink:href", "/s/i/agv.png")
        } else if (aspect[a].color != aspect[0].color) {
            line().style("stroke", aspect[a].color)
                .attr("marker-end", "url(#multiple)");
        }
    }
}

var rectPath = function (yfc) {
    var line = function () {
        return svg.append("line")
            .attr("x1", padding.left + xScale(point1[0]))
            .attr("y1", height - padding.bottom - yScale(point1[1]))
            .attr("x2", padding.left + xScale(point2[0]))
            .attr("y2", height - padding.bottom - yScale(point2[1]))
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
        svg.append("text")
            .attr("x", padding.left + xScale((area.leftXaxis + area.rightXaxis) / 2) - 35)
            .attr("y", height - padding.bottom - yScale((area.downYaxis + area.upYaxis) / 2) + 10)
            .attr("class", "clashLine")
            .style("stroke", "red")
            .style("font-size", "22px")
            .style("stroke-width", "1px")
            .text(area.title);
    }
}

function rect() {
    $(".clashLine").remove();
    $(".mainRoad").remove();

    rectPath(yfc);
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

    //         svg.append("line")
    //             .attr("x1", padding.left + xScale(point1[0]))
    //             .attr("y1", height - padding.bottom - yScale(point1[1]))
    //             .attr("x2", padding.left + xScale(point2[0]))
    //             .attr("y2", height - padding.bottom - yScale(point2[1]))
    //             .attr("class", "clashLine")
    //             .style("stroke", "red")
    //             .style("stroke-width", "2px");
    //     }
    // }

    svg.append("line")
        .attr("x1", padding.left + xScale(-90000))
        .attr("y1", height - padding.bottom - yScale(-2600))
        .attr("x2", padding.left + xScale(20000))
        .attr("y2", height - padding.bottom - yScale(-2600))
        .style("stroke", "#333")
        .attr("class", "mainRoad")
        .style("stroke-width", "1px");

    svg.append("line")
        .attr("x1", padding.left + xScale(-90000))
        .attr("y1", height - padding.bottom - yScale(1500))
        .attr("x2", padding.left + xScale(20000))
        .attr("y2", height - padding.bottom - yScale(1500))
        .style("stroke", "#333")
        .attr("class", "mainRoad")
        .style("stroke-width", "1px");
}

function drawCircle(dataset) {
    xScale = d3.scale.linear().domain(domainXVal).range([0, xAxisWidth]);
    yScale = d3.scale.linear().domain(domainYVal).range([0, yAxisWidth]);

    var circleUpdate = svg.selectAll("circle").data(dataset);

    var circleEnter = circleUpdate.enter();
    var circleExit = circleUpdate.exit();
    //update部分的处理方法  
    circleUpdate.transition()//更新数据时启动过渡  
        .duration(500).attr("cx", function (d) {
            return padding.left + xScale(d[0]);
        }).attr("cy", function (d) {
            return height - padding.bottom - yScale(d[1]);
        }).attr("fill", function (d) {
            return getColor(d);
        }).attr("r", function (d) {
            return (inUdp(d)) ? 3 : (inTaskPath(d) ? 4 : 2);
        });

    circleEnter.append("circle")
        .attr("fill", "red")
        .attr("r", 20).transition().duration(500)
        .attr("class", function (d) {
            return inAgv(d, 1) ? "agv1" : "agv2";
        })
        .attr("cx", function (d) {
            return padding.left + xScale(d[0]);
        }).attr("cy", function (d) {
            return height - padding.bottom - yScale(d[1]);
        }).attr("fill", function (d) {
            return getColor(d);
        }).attr("r", function (d) {
            return (inUdp(d)) ? 3 : 5;
        });

    circleExit.transition().duration(500).attr("fill", "white").remove();

    rect();
}

//绘制坐标轴  
function drawAxis() {
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

    yScale.range([yAxisWidth, 0]);

    //绘制x轴  
    var svggx;
    var svggy;
    if (svg.selectAll("g").size() > 0) {
        svggx = svg.selectAll("g.xaxis");
        svggy = svg.selectAll("g.yaxis");
    } else {
        svggx = svg.append("g").attr("class", "xaxis");
        svggy = svg.append("g").attr("class", "yaxis");
    }
    svggx.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);
    svggy.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")").call(yAxis);

    //绘制完坐标轴将值域变回去  
    yScale.range([0, yAxisWidth]);

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
            if ((i != 9999 && datasetMap[i] && datasetMap[i].length > 5000) || svg.selectAll("circle").size() == 0) {
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
                .attr("y1", heightFixed * i / (currentTasks + 1))
                .attr("x2", widthFixed * 4 / 5)
                .attr("y2", heightFixed * i / (currentTasks + 1))
                .attr("class", "agvLine")
                .style("stroke-width", "2px")
                .style("stroke", agvsColor["agv" + agv]);
        }

        var arrowMarker = svgFixed.append("defs")
            .append("marker")
            .attr("id", agv);
        arrow(arrowMarker).attr("fill", agvsColor["agv" + agv]);
        line().attr("x2", widthFixed * 4 / 5);
        line().attr("x2", widthFixed / 2)
            .attr("marker-end", "url(#" + agv + ")");

        if (i === 1) {
            $("#agvs").append("<div class='agvs' style='width:" + (widthAgvs - widthFixed)
                + "px" + "; height:100%; float:right'>");
            $(".agvs").append("<div style='width:100%; height:" + heightFixed / (currentTasks + 1) / 2
                + "px" + "'>" + "</div>");
        }
        $(".agvs").append("<div style='width:100%; height:" + heightFixed / (currentTasks + 1)
            + "; line-height:" + heightFixed / (currentTasks + 1) + "px" + "; color:" + agvsColor["agv" + agv] + "'>"
            + agv + "号AGV" + "</div>");
    }
}

var render = function (datasss) {
    drawCircle(datasss);
    //drawAxis();
    drawAgvs();
}

var equals = function (arr1, arr2) {
    if (arr1 == null || arr2 == null) {
        return false;
    }
    if (arr1.length != arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1 != arr2) {
            return false;
        }
    }
    return true;
}

var randomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                && (color.length == 6) ? color : arguments.callee(color);
        })('');
};