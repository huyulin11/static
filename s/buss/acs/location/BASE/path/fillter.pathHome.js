import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { getMPoint, getL2Point } from "/s/buss/acs/location/BASE/render/render.d.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { drawArrow } from "/s/buss/acs/location/BASE/path/radian.def.js";

export var fillHome1 = function (id, x, y) {
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            fillMarkerPath(id, x, y, s);
            return dToStrig(x, x2, y, y2);
        });
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            fillMarkerPath(id, x, y, s);
            return dToStrig(x1, x, y1, y);
        });
}

export var fillHome2 = function (id, x, y) {
    conf.pathHome2.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return dToStrig(x, x2, y, y2);
        });
    conf.pathHome2.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return dToStrig(x1, x, y1, y);
        });
}

export var fillMarkerPath = function (id, x, y, s) {
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.from == id; })
        .attr("orient", function (d) {
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return drawArrow(x, x2, y, y2);
        });
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.to == id; })
        .attr("orient", function (d) {
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return drawArrow(x1, x, y1, y);
        });
} 