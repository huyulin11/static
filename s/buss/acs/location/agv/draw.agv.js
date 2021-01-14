import { datas } from "/s/buss/acs/location/location.data.js";
import { getPath } from "/s/buss/acs/location/agv/control.agv.run.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { xnumToWindow, ynumToWindow } from "/s/buss/acs/location/render/trans.location.js";

export var drawAgv = function () {
    conf.agvHome.selectAll("image").remove();
    var image = conf.agvHome.selectAll("image").data(datas.agvLocation)
        .enter()
        .append("image")
        .attr("id", function (d) {
            return "agv" + d.currentsite;
        })
        .attr("x", -25)
        .attr("y", -25)
        .attr("width", 50)
        .attr("height", 50)
        .attr("xlink:href", "/s/i/agv.png");
    image.append("animateMotion")
        .attr("id", function (d) {
            return "animate" + d.currentsite;
        })
        .attr("path", function (d) {
            return getPath(d.currentX, d.nextX, d.currentY, d.nextY);
        })
        .attr("begin", "0s")
        .attr("dur", "10s")
        .attr("rotate", "auto")
        .attr("repeatCount", "indefinite");

    for (var value of datas.agvLocation) {
        if (!value.isWorking) {
            d3.select("#agv" + value.currentsite)
                .attr("x", xnumToWindow(value.currentX) - 30)
                .attr("y", ynumToWindow(value.currentY) - 30);
            d3.select("#animate" + value.currentsite).remove();
        } else {
            d3.select("#agv" + value.currentsite)
                .attr("x", -25)
                .attr("y", -25);
            var agvSerch = d3.select("#agv" + value.currentsite)
            agvSerch.selectAll("#animate" + value.currentsite).remove();
            agvSerch.append("animateMotion")
                .attr("id", function (d) {
                    return "animate" + d.currentsite;
                })
                .attr("path", function (d) {
                    return getPath(d.currentX, d.nextX, d.currentY, d.nextY);
                })
                .attr("begin", "0s")
                .attr("dur", "10s")
                .attr("rotate", "auto")
                .attr("repeatCount", "indefinite");
        };
    }
}