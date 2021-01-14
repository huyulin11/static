import { conf } from "/s/buss/acs/location/location.conf.js";
import { getMPoint, getL2Point } from "/s/buss/acs/location/render/render.d.js";
import { dToStrig } from "/s/buss/acs/location/render/path.direction.js";
import { drawArrow } from "/s/buss/acs/location/path/radian.def.js";
import { xnumToWindow, ynumToWindow } from "/s/buss/acs/location/render/trans.location.js";
import { datas } from "/s/buss/acs/location/location.data.js";

export var fillHome1 = function (id, x, y) {
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return dToStrig(x, x2, y, y2);
        });
    conf.pathHome1.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
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

export var fillMarkerPath = function (id, x, y) {
    datas.init();
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.from == id; })
        .attr("orient", function (d) {
            var x2 = xnumToWindow(d.rightXaxis), y2 = ynumToWindow(d.upYaxis);
            return drawArrow(x, x2, y, y2);
        });
    conf.defsHome.selectAll("marker").filter(function (e) { return e && e.to == id; })
        .attr("orient", function (d) {
            var x1 = xnumToWindow(d.leftXaxis), y1 = ynumToWindow(d.downYaxis);
            return drawArrow(x1, x, y1, y);
        });
} 