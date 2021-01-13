import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { crateRect } from "/s/buss/acs/location/BASE/render/s/rect.url.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { rightClickRect } from "/s/buss/acs/location/BASE/rect/rect.rightclick.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/BASE/rect/drag.rect.js";

export var addRect = function (flag) {
    if (flag) {
        d3.select("body").select("#coordinate").select("svg")
            .on("dblclick", setRect);
    } else {
        d3.select("body").select("#coordinate").select("svg")
            .on("dblclick", null);
    };
}

var point = [];
export var setRect = function () {
    d3.event.preventDefault();
    var id = getid();
    let x = d3.event.offsetX,
        y = d3.event.offsetY;
    conf.rectHome.append("rect")
        .attr('x', x - 10)
        .attr('y', y - 10)
        .attr('id', 'rect' + id)
        .attr('width', 20)
        .attr('height', 20)
        .attr('class', 'classRect')
        .attr('fill', '#e0e053')
        .attr('opacity', 0.5)
        .attr('buildname', '建筑');
    conf.rectHome.append('text')
        .attr('x', x)
        .attr('y', y + 30)
        .attr('id', 'retext' + id)
        .attr("font-size", "13px")
        .attr('fill', 'black')
        .style('text-anchor', 'middle')
        .text('建筑');
    point.push([1, x - 10, y - 10, id]);
    point.push([2, x + 10, y - 10, id]);
    point.push([3, x - 10, y + 10, id]);
    point.push([4, x + 10, y + 10, id]);
    addPoint(point);
    crateRect(id, x - 10, y - 10, 20, 20);
    rightClickRect(true);
    dragDashRect(true);
    dragDashCircle(true);
}

var addPoint = function (point) {
    for (let rect of point) {
        conf.rectHome.append('circle')
            .attr('class', 'changeCircle')
            .attr('id', 'dashC' + rect[3])
            .attr('num', rect[3] + "" + rect[0])
            .attr('cx', rect[1])
            .attr('cy', rect[2])
            .attr('xx', rect[1])
            .attr('yy', rect[2])
            .attr('r', 3)
            .attr('stroke', '#8e8e8e')
            .attr('stroke-width', 1)
            .attr('fill', 'orange')
            .style('display', 'none');
    }
}


var getid = function () {
    datas.init();
    var id = 1;
    for (var i of datas.rectid) {
        if (id == i) {
            id++;
        }
    }
    return id;
}