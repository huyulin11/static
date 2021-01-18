import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var drawPointId = function (data) {
    conf.textHome.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        }).attr("x", function (d) {
            return tool.xnumToWindow(d[1]) + 7;
        }).attr("y", function (d) {
            return tool.ynumToWindow(d[2]) - 7;
        })
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        });
}

var hidePointId = function () {
    conf.textHome.selectAll("text").remove();
}

export var fillPointId = function (id, x, y) {
    conf.textHome.select("#t" + id)
        .attr("x", x + 7)
        .attr("y", y - 7);
}