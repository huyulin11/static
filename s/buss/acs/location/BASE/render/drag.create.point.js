import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dragPoint, updatePoint } from "/s/buss/acs/location/BASE/render/location.on.js";
import { getMPoint, getL2Point } from "/s/buss/acs/location/BASE/render/render.d.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { addLocation, moveLocation } from "/s/buss/acs/location/BASE/render/s/siteinfo.url.js";

export var started = function () {
}
export var draged = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    d3.select("#t" + id)
        .attr("x", x)
        .attr("y", y);
    conf.svg.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return dToStrig(x, x2, y, y2);
        });
    conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return dToStrig(x1, x, y1, y);
        });
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
    // conf.svg.selectAll("#n" + id).remove();
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
    dragPoint();
    updatePoint();
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
