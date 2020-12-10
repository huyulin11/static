import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { getClosestPoint } from "/s/buss/acs/location/BASE/render/add.path.js";
import { getM, getMPoint } from "/s/buss/acs/location/BASE/render/render.d.js";

export var startedPath = function () {
    d3.select(this).attr("class","savaPath");
    d3.selectAll(".post").remove();
}
export var dragedPath = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    d3.select(this)
        .attr("d", function (d) {
            return getM(s) + "L" + parseFloat(x) + "," + parseFloat(y);
        })
        .attr("style", "marker-end:url(#triangle);");
}
export var endedPath = function () {
    var id = $(this).attr("from");
    let s = $(this).attr("d");
    const { x, y } = d3.event;
    var point = getClosestPoint(id, x, y);
    var arr = getMPoint(s);
    var x1 = arr[0], y1 = arr[1];
    var x2 = point.x2, y2 = point.y2;
    d3.select(this)
        .attr("d", function () {
            return getM(s) +
                "L" + (x1 + x2) * 0.5 + "," + (y1 + y2) * 0.5 +
                getL2(x2, y2);
        })
        .attr("style", "marker-end:url(#triangle);");
}

var getL2 = function (x, y) {
    return "L" + x + "," + y;
};