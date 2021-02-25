import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export function drawPoints(data) {
    conf.pointHome.selectAll("circle").remove();
    var circleUpdate = conf.pointHome.selectAll("circle").data(data);
    var circleEnter = circleUpdate.enter();

    // //update部分的处理方法
    // circleUpdate.transition()//更新数据时启动过渡  
    //     .duration(500).attr("r", 6.5);

    circleEnter.append("circle")
        // .transition().duration(3000)
        .attr("id", function (d) {
            return d[0];
        }).attr("class", function (d) {
            return tool.inAgv(d, 1) ? "agv1" : "agv2";
        }).attr("cx", function (d) {
            return tool.xnumToWindow(d[1]);
        }).attr("cy", function (d) {
            return tool.ynumToWindow(d[2]);
        }).attr("r", 6.5)
        .attr("fill", tool.getPointColor());
}

export function drawNewPoint(id, x, y) {
    conf.pointHome.append("circle")
        .attr("id", id)
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 6.5)
        .attr("fill", "blue");
}

export var drawPointId = function (data) {
    conf.pointTextHome.selectAll("text").data(data)
        .enter().append("text")
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        }).attr("x", function (d) {
            return tool.xnumToWindow(d[1]) + 7;
        }).attr("y", function (d) {
            return tool.ynumToWindow(d[2]) - 7;
        })
        .attr("stroke", "black")
        .attr("fill", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        });
}

var hidePointId = function () {
    conf.pointTextHome.selectAll("text").remove();
}

export var updatePointId = function (id, x, y) {
    conf.pointTextHome.select("#t" + id)
        .attr("x", x + 7)
        .attr("y", y - 7);
}