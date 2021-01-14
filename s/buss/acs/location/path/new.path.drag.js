import { getClosestPoint } from "/s/buss/acs/location/render/add.path.js";
import { getMPoint } from "/s/buss/acs/location/render/render.d.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { dToStrig } from "/s/buss/acs/location/render/path.direction.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { drawArrow } from "/s/buss/acs/location/path/radian.def.js";
import { conf } from "/s/buss/acs/location/location.conf.js";

export var startedNewPath = function () {
    datas.init();
    var num = $(this).attr("num");
    for (var i = 1; i <= 4; i++) {
        if (i != num) d3.select("#new" + i).remove();
    }
}
export var dragedNewPath = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    d3.select(this)
        .attr("d", function (d) {
            return dToStrig(mPoint[0], x, mPoint[1], y);
        });
}
export var endedNewPath = function () {
    var siteid = $(this).attr("from"), oldnext = $(this).attr("to");
    let s = $(this).attr("d");
    const { x, y } = d3.event;
    var point = getClosestPoint(siteid, x, y), nextid = point.nextid;
    var arr = getMPoint(s);
    var x1 = arr[0], y1 = arr[1], x2 = point.x2, y2 = point.y2;
    var flag = $("#p" + siteid + nextid)[0], side = getSide(x1, x2, y1, y2);
    if (!flag) {
        saveLogic(side, siteid, nextid, oldnext);
        var marker = conf.defsHome.append("defs")
            .append("marker")
            .attr("id", "mar" + siteid + nextid)
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", 2.5)
            .attr("markerHeight", 2)
            .attr("refX", 3)
            .attr("refY", 1)
            .attr("orient", function () {
                return drawArrow(x1, x2, y1, y2);
            })
        marker.append("path").attr("d", "M 0 0 L 2.5 1 L 0 2 z").attr("fill", "#8a8a8a");
        conf.pathHome1.append("path")
            .attr("id", "p" + siteid + nextid)
            .attr("from", siteid)
            .attr("to", nextid)
            .attr("d", function (d) {
                return dToStrig(x1, x2, y1, y2);
            })
            .attr("class", "clashLine")
            .attr("fill", "none")
            .attr("stroke", "#8a8a8a")
            .attr("stroke-width", "6.5px")
            .attr("style", function (d) {
                return "marker-end:url(#mar" + siteid + nextid + ");"
            });
        d3.select(this).remove();
    } else {
        d3.select(this).remove();
    }
}

export var getSide = function (x1, x2, y1, y2) {
    var side;
    if (x1 < x2) {
        if (y1 > y2) {
            side = 1;
        } else if (y1 < y2) {
            side = 2;
        }
    } else if (x1 > x2) {
        if (y1 > y2) {
            side = 2;
        } else if (y1 < y2) {
            side = 1;
        }
    }
    return side;
};

