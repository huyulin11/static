import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { drawArrow } from "/s/buss/acs/location/BASE/path/radian.def.js";
import { dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";

export var markerDef = function () {
    var defs = conf.defsHome.append("defs");
    var marker1 = defs.selectAll("marker").data(datas.point)
        .enter()
        .append("marker")
        .attr("id", function (d) {
            return "mar" + d.id;
        })
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 2.5)
        .attr("markerHeight", 2)
        .attr("refX", 3)
        .attr("refY", 1)
        .attr("orient", function (d) {
            var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
            var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
            return drawArrow(result1[0], result2[0], result1[1], result2[1]);
        });
    marker1.append("path").attr("d", "M 0 0 L 2.5 1 L 0 2 z").attr("fill", "#8a8a8a");
    var marker2 = defs.append("marker")
        .attr("id", "triangle2")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 2.5)
        .attr("markerHeight", 2)
        .attr("refX", 0)
        .attr("refY", 1)
        .attr("orient", "auto");
    marker2.append("path").attr("d", "M 0 0 L 2.5 1 L 0 2 z").attr("fill", "#8a8a8a");
} 