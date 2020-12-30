import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { getPath } from "/s/buss/acs/location/BASE/agv/control.agv.run.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

export var drawAgv = function () {
    datas.init();
    var image = conf.agvHome.selectAll("image").data(datas.agvLocation)
        .enter()
        .append("image")
        .attr("x", -30)
        .attr("y", -30)
        .attr("width", 60)
        .attr("height", 60)
        .attr("xlink:href", "/s/i/agv.png");
    image.append("animateMotion")
        .attr("path", function (d) {
            return getPath(d.currentX, d.nextX, d.currentY, d.nextY);
        })
        .attr("begin", "0s")
        .attr("dur", "10s")
        .attr("rotate", "auto")
        .attr("repeatCount", "indefinite");
}