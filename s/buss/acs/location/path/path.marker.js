import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";

export var markerDef = function () {
    var defs = conf.defsHome.append("defs");
    var marker1 = defs.selectAll("marker").data(datas.path)
        .enter().append("marker")
        .attr("id", function (d) {
            return "mar" + d.id;
        })
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 2.5)
        .attr("markerHeight", 2)
        .attr("refX", 3)
        .attr("refY", 1)
        .attr("orient", function (d) {
            var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
            var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
            return pathTool.markerRadian(result1[0], result2[0], result1[1], result2[1]);
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

export var addMarker = function (siteid, nextid, x1, x2, y1, y2) {
    var marker = conf.defsHome.append("defs")
        .append("marker")
        .attr("id", "mar" + siteid + nextid)
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 2.5)
        .attr("markerHeight", 2)
        .attr("refX", 3)
        .attr("refY", 1)
        .attr("orient", pathTool.markerRadian(x1, x2, y1, y2));
    marker.append("path").attr("d", "M 0 0 L 2.5 1 L 0 2 z").attr("fill", "#8a8a8a");
}