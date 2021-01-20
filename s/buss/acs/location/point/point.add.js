import { datas } from "/s/buss/acs/location/location.data.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { dragPoint, rightClickPoint } from "/s/buss/acs/location/location.event.js";
import { addLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { drawPointId } from "/s/buss/acs/location/point/point.draw.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var getCircleID = function () {
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

export var addSite = function (x, y) {
    var id = getCircleID();
    conf.pointHome.append("circle")
        .attr("id", 'nc' + id)
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 6.5)
        .attr("fill", "blue");
    conf.pointTextHome.append("text")
        .attr("id", 'nct' + id)
        .attr("x", x + 7)
        .attr("y", y - 7)
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text('' + id);
}

export var dragSite = function (x, y) {
    var id = getCircleID();
    d3.select('#nc' + id)
        .attr('cx', x)
        .attr('cy', y);
    d3.select('#nct' + id)
        .attr('x', x + 7)
        .attr('y', y - 7);
}

export var createPoint = function (x, y) {
    var id = getCircleID();
    var location = tool.windowToDB(id, x, y);
    addLocation(location, () => {
        d3.select('#nct' + id).attr('id', 't' + id);
        d3.select('#nc' + id).attr('id', id);
        drawPointId(datas.udfPoints);
        dragPoint(true);
        rightClickPoint(true);
    });
}

