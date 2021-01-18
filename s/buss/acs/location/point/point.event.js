import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { dragPoint, rightClickPoint } from "/s/buss/acs/location/location.event.js";
import { addLocation, moveLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { fillPointId, drawPointId } from "/s/buss/acs/location/point/point.id.draw.js";
import { fillHome1, fillHome2, fillMarkerPath } from "/s/buss/acs/location/path/fillter.pathHome.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var started = function () { }

export var draged = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    fillPointId(id, x, y);
    fillHome1(id, x, y);
    fillHome2(id, x, y);
    fillMarkerPath(id, x, y);
}

export var ended = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    var location = tool.windowToDB(id, x, y);
    moveLocation(id, location);
}

export var createPoint = function () {
    var id = getID();
    let x = d3.event.offsetX, y = d3.event.offsetY;
    var location = tool.windowToDB(id, x, y);
    addLocation(id, location, () => {
        conf.pointHome.append("circle")
            .attr("id", id)
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 6.5)
            .attr("fill", "blue");
        drawPointId(datas.udfPoints);
        dragPoint(true);
        rightClickPoint(true);
    });
}

var getID = function () {
    var ids = datas.id;
    var id = 1;
    var arr = [];
    ids.forEach((e) => {
        arr.push(e.id);
    })
    arr.sort(function (a, b) { return a - b });
    for (var i of arr) {
        if (id == i) {
            id++;
        }
    }
    return id;
}
