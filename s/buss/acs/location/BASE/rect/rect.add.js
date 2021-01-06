import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { crateRect } from "/s/buss/acs/location/BASE/render/s/rect.url.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

export var addRect = function (flag) {
    if (flag) {
        d3.select("body").select("#coordinate").select("svg").call(
            d3.drag()
                .on("start", rectStart)
                .on("drag", rectDrag)
                .on("end", rectEnd)
        );
    } else {
        d3.select("body").select("#coordinate").select("svg").call(
            d3.drag()
                .on("start", null)
                .on("drag", null)
                .on("end", null)
        );
    };
}

export var getid = function () {
    var id = 1;
    for (var i of datas.rectid) {
        if (id == i) {
            id++;
        }
    }
    return id;
}

var rectStart = function () {
    datas.init();
    var id = getid();
    let x = d3.event.x,
        y = d3.event.y;
    conf.rectHome.append("rect")
        .attr('x', x)
        .attr('y', y)
        .attr('id', 'rect' + id)
        .attr('width', 5)
        .attr('height', 5)
        .attr('fill', 'none')
}
var rectDrag = function () {
    var id = getid();
    let x1 = $("#rect" + id).attr('x'),
        y1 = $("#rect" + id).attr('y'),
        x2 = d3.event.x,
        y2 = d3.event.y,
        width = x2 - x1,
        height = y2 - y1;
    var rect = d3.select("#rect" + id)
        .attr('stroke', 'green')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 3)
    if (width <= 0 && height > 0) {
        rect.attr('width', -width)
            .attr('height', height)
    } else if (height <= 0 && width > 0) {
        rect.attr('width', width)
            .attr('height', -height)
    } else if (width <= 0 && height <= 0) {
        rect.attr('width', -width)
            .attr('height', -height)
    } else {
        rect.attr('width', width)
            .attr('height', height)
    }

}
var rectEnd = function () {
    var id = getid();
    let x = $("#rect" + id).attr('x'),
        y = $("#rect" + id).attr('y'),
        width = $("#rect" + id).attr('width'),
        height = $("#rect" + id).attr('height');
    crateRect(id, x, y, width, height);
}