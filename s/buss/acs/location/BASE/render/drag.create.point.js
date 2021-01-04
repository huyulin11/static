import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dragPoint, rightClickPoint } from "/s/buss/acs/location/BASE/render/location.on.js";
import { addLocation, moveLocation } from "/s/buss/acs/location/BASE/render/s/siteinfo.url.js";
import { fillHome1, fillHome2, fillMarkerPath } from "/s/buss/acs/location/BASE/path/fillter.pathHome.js";

export var started = function () {
}
export var draged = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    fillHome1(id, x, y);
    fillHome2(id, x, y);
    fillMarkerPath(id, x, y);
    conf.svg.select("#t" + id)
        .attr("x", x + 7)
        .attr("y", y - 7);
}
export var ended = function () {
    const { x, y } = d3.event;
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    var id = $(this).attr('id');
    moveLocation(id, x, y);
}

export var createPoint = function () {
    var id = getID();
    let x = d3.event.offsetX, y = d3.event.offsetY;
    conf.svg.append("circle")
        .attr("id", id)
        .attr("fill", "blue")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 5);
    dragPoint(true);
    rightClickPoint(true);
    addLocation(id, x, y);
    conf.textHome.append("text")
        .attr("id", function () {
            return "t" + id;
        }).attr("x", function (d) {
            return x + 7;
        })
        .attr("y", function (d) {
            return y - 7;
        }).attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return id;
        })
}

var getID = function () {
    datas.init();
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
