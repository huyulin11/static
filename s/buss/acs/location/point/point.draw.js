import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export function drawPoints(data) {
    conf.pointHome.selectAll("circle").remove();
    var circleEnter = conf.pointHome.selectAll("circle").data(data).enter();

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
        }).attr("r", 3)
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
    conf.pointTextHome.selectAll("text").remove();
    conf.pointTextHome.selectAll("text").data(data)
        .enter().append("text")
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        }).attr("x", function (d) {
            return tool.xnumToWindow(d[1]) + 3.5;
        }).attr("y", function (d) {
            return tool.ynumToWindow(d[2]) - 3.5;
        })
        .attr("fill", "black")
        .attr("font-size", "7.5px")
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
        .attr("x", x + 3.5)
        .attr("y", y - 3.5);
}