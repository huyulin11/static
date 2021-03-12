import { conf } from "/s/buss/acs/location/location.conf.js";
import { crateRect } from "/s/buss/acs/location/url/rect.url.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { rightClickRect } from "/s/buss/acs/location/rect/rect.rightclick.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/rect/drag.rect.js";
import { mouseStyle, bankDefaultEvent } from "/s/buss/acs/location/rect/rect.event.js";
import { drawRect } from "/s/buss/acs/location/rect/draw.rect.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var addRect = function () {
    var id = getid();
    conf.rectHome.append("rect")
        .attr('id', 'rect' + id)
    conf.rectTextHome.append('text')
        .attr('id', 'retext' + id);
}

export var dragRect = function () {
    var id = getid();
    var zoom = d3.select('svg').property('__zoom');
    var x = (event.offsetX - zoom.x) / zoom.k;
    var y = (event.offsetY - zoom.y) / zoom.k;
    d3.select('#rect' + id)
        .attr('x', x - 10)
        .attr('y', y - 10)
        .attr('width', 20)
        .attr('height', 20)
        .attr('class', 'classRect')
        .attr('fill', '#e0e053')
        .attr('opacity', 0.5)
        .attr('buildname', '建筑');
    d3.select('#retext' + id)
        .attr('x', x)
        .attr('y', y + 30)
        .attr("font-size", "13px")
        .attr('fill', 'black')
        .style('text-anchor', 'middle')
        .text('建筑');
}

export var newRect = function (x, y) {
    var id = getid();
    undoStack.push({ 'name': 'rectadd', 'id': id, 'x': x - 10, 'y': y - 10 });
    crateRect(id, x - 10, y - 10, x + 10, y + 10, () => {
        drawRect(datas.rect);
        bankDefaultEvent();
        rightClickRect(true);
        mouseStyle(true)
        dragDashRect(true);
        dragDashCircle(true);

    });
}

var addPoint = function (point) {
    for (let rect of point) {
        conf.rectPointHome.append('circle')
            .attr('class', 'changeCircle')
            .attr('id', 'dashC' + rect[3])
            .attr('num', rect[3] + "" + rect[0])
            .attr('cx', rect[1])
            .attr('cy', rect[2])
            .attr('xx', rect[1])
            .attr('yy', rect[2])
            .attr('direction', function (d) {
                return rect[0];
            })
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