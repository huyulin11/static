import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";

export var createPath = function (id, x, y) {
    for (var i = 1; i <= 4; i++) {
        newPath(i, x, y, id);
    }
}

var newPath = function (num, x, y, id) {
    var paths = conf.pathHome3.append("path")
        .attr("num", num)
        .attr("from", id)
        .attr("class", "clashLine")
        .attr("fill", "none")
        .attr("stroke", "#8a8a8a")
        .attr("stroke-width", "6px")
        .attr("style", "marker-end:url(#triangle2);");
    if (num == 1) {
        paths.attr("id", "new" + num)
            .attr("d", function () {
                return "M" + x + "," + y
                    + "L" + (parseFloat(x) + 20) + "," + y;
            });
    }
    if (num == 2) {
        paths.attr("id", "new" + num)
            .attr("d", function () {
                return "M" + x + "," + y
                    + "L" + (parseFloat(x) - 20) + "," + y;
            });
    }
    if (num == 3) {
        paths.attr("id", "new" + num)
            .attr("d", function () {
                return "M" + x + "," + y
                    + "L" + x + "," + (parseFloat(y) + 20);
            });
    }
    if (num == 4) {
        paths.attr("id", "new" + num)
            .attr("d", function () {
                return "M" + x + "," + y
                    + "L" + x + "," + (parseFloat(y) - 20);
            });
    }
}

export var getClosestPoint = function (id, x, y) {
    var arr = [];
    datas.locations.forEach((e, i) => {
        if (e.id != id) {
            var x1 = e.x, y1 = e.y;
            x1 = dbToWindow(x1, y1)[0];
            y1 = dbToWindow(x1, y1)[1];
            var value = (x - x1) * (x - x1) + (y - y1) * (y - y1);
            arr.push({ "id": e.id, "value": value });
        }
    });
    var min = arr[0].value, idMin = arr[0].id;
    for (var i = 1; i < arr.length; i++) {
        if (min <= arr[i].value);
        else {
            min = arr[i].value, idMin = arr[i].id;
        };
    };
    var point;
    datas.locations.forEach((e, i) => {
        if (e.id == idMin) {
            let result = dbToWindow(e.x, e.y);
            let x1 = parseFloat(x), y1 = parseFloat(y);
            let x2 = parseFloat(result[0]), y2 = parseFloat(result[1]);
            point = { "x1": x1, "y1": y1, "x2": x2, "y2": y2, "nextid": idMin };
        };
    });
    return point;
}