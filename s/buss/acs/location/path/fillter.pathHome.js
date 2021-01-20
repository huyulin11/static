import { conf } from "/s/buss/acs/location/location.conf.js";
import { getMPoint, getL2Point } from "/s/buss/acs/location/path/render.d.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var fillHome1 = function (id, x, y) {
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return pathTool.dPath(x, x2, y, y2);
        });
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return pathTool.dPath(x1, x, y1, y);
        });
}

export var fillHome2 = function (id, x, y) {
    conf.pathHome2.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return pathTool.dPath(x, x2, y, y2);
        });
    conf.pathHome2.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return pathTool.dPath(x1, x, y1, y);
        });
}

export var fillMarkerPath = function (id, x, y) {
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.from == id; })
        .attr("orient", function (d) {
            var x2 = tool.xnumToWindow(d.rightXaxis), y2 = tool.ynumToWindow(d.upYaxis);
            return pathTool.markerRadian(x, x2, y, y2);
        });
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.to == id; })
        .attr("orient", function (d) {
            var x1 = tool.xnumToWindow(d.leftXaxis), y1 = tool.ynumToWindow(d.downYaxis);
            return pathTool.markerRadian(x1, x, y1, y);
        });
} 