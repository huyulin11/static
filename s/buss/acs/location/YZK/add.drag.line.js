import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dbToWindow } from "/s/buss/acs/location/YZK/trans.location.js";
import { updatePoint, dragPoint, addPoint } from "/s/buss/acs/location/LAO_FOXCONN/location.on.js";


export var createLine = function (id, x, y) {
    var point = getClosestPoint(id, x, y);
    conf.svg.append("path")
        .attr("id", "p" + id)
        .attr("d", function () {
            let midX = (point.x1 + point.x2) * 0.5;
            let midY = (point.y1 + point.y2) * 0.5;
            let s = "M" + point.x1 + "," + point.y1 +
                "L" + midX + "," + midY +
                "L" + point.x2 + "," + point.y2;
            return s;
        }).attr("class", "clashLine")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", "2px")
        .attr("style", "marker-mid:url(#triangle);");
}
var getClosestPoint = function (id, x, y) {
    var arr = [];
    datas.locations.forEach((e, i) => {
        if (e.id != id) {
            var x1 = e.x;
            var y1 = e.y;
            let trans = dbToWindow(x1, y1);
            x1 = trans[0];
            y1 = trans[1];
            var value = (x - x1) * (x - x1) + (y - y1) * (y - y1);
            arr.push({ "id": e.id, "value": value });
        }
    });
    var min = arr[0].value;
    var idMin = arr[0].id;
    for (var i = 1; i < arr.length; i++) {
        if (min <= arr[i].value);
        else {
            min = arr[i].value;
            idMin = arr[i].id;
        };
    };
    var point;
    datas.locations.forEach((e, i) => {
        if (e.id == idMin) {
            let result = dbToWindow(e.x, e.y);
            let x1 = parseFloat(x), y1 = parseFloat(y);
            let x2 = parseFloat(result[0]), y2 = parseFloat(result[1]);
            point = { "x1": x1, "y1": y1, "x2": x2, "y2": y2 };
        };
    });
    return point;
}