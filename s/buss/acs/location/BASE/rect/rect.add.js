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
        .attr('id', 'start' + id)
        .attr('width', 5)
        .attr('height', 5)
        .attr('fill', 'none');
    conf.rectHome.append("rect")
        .attr('x', x)
        .attr('y', y)
        .attr('id', 'drag' + id)
        .attr('width', 5)
        .attr('height', 5)
        .attr('fill', 'none');
}
var rectDrag = function () {
    var id = getid();
    let x1 = parseInt($("#start" + id).attr('x')),
        y1 = parseInt($("#start" + id).attr('y')),
        x2 = d3.event.x,
        y2 = d3.event.y;
    var rect = d3.select("#drag" + id)
        .attr('stroke', 'green')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 3);
    if (x2 >= x1 && y2 >= y1) {
        rect.attr('x', x1)
            .attr('y', y1)
            .attr('width', x2 - x1)
            .attr('height', y2 - y1)
    } else if (x2 < x1 && y2 >= y1) {
        rect.attr('x', x2)
            .attr('y', y1)
            .attr('width', x1 - x2)
            .attr('height', y2 - y1)
    } else if (x2 >= x1 && y2 < y1) {
        rect.attr('x', x1)
            .attr('y', y2)
            .attr('width', x2 - x1)
            .attr('height', y1 - y2)
    } else {
        rect.attr('x', x2)
            .attr('y', y2)
            .attr('width', x1 - x2)
            .attr('height', y1 - y2)
    }

}
var rectEnd = function () {
    var id = getid();
    let x = $("#drag" + id).attr('x'),
        y = $("#drag" + id).attr('y'),
        width = $("#drag" + id).attr('width'),
        height = $("#drag" + id).attr('height');
    d3.select("#drag" + id)
        .attr('fill', '#e0e053')
        .attr('stroke', 'orange')
        .attr('opacity', 0.5)
        .attr('stroke-width', 3);
    crateRect(id, x, y, width, height);
}