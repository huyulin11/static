import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

export var markerDef = function () {
    var defs = conf.defsHome.append("defs");
    var marker1 = defs.append("marker")
        .attr("id", "triangle")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 2.5)
        .attr("markerHeight", 2)
        .attr("refX", 3.25)
        .attr("refY", 1)
        .attr("orient", "auto");
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