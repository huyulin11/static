import { datas } from "/s/buss/acs/location/location.data.js";
import { editBuildName } from "/s/buss/acs/location/render/s/rect.url.js";
import { xnumToDB, ynumToDb } from "/s/buss/acs/location/render/trans.location.js";
import { dragDashPoint1, dragDashPoint2, dragDashPoint3, dragDashPoint4 } from "/s/buss/acs/location/rect/drag.dash.point.js";

export var dragDashRect = function (flag) {
    if (flag) {
        d3.selectAll('.classRect').call(
            d3.drag()
                .on('start', startR)
                .on('drag', dargR)
                .on('end', endR)
        );
    } else {
        d3.selectAll('.classRect').call(
            d3.drag()
                .on('start', null)
                .on('drag', null)
                .on('end', null)
        );
    }
}

var rectData = {};
var startR = function () {
    datas.init();
    d3.selectAll('.layui-layer-content').remove();
    d3.selectAll('.changeCircle').style('display', 'none');
    let x1 = event.offsetX,
        y1 = event.offsetY,
        x2 = parseFloat($(this).attr('x')),
        y2 = parseFloat($(this).attr('y')),
        id = $(this).attr('id').slice(4),
        width = x1 - x2,
        height = y1 - y2;
    d3.selectAll('#dashC' + id).style('display', 'block');
    d3.select(this).style('cursor', 'move');
    rectData = { 'width': width, 'height': height };
}

var dargR = function () {
    let x1 = event.offsetX,
        y1 = event.offsetY;
    let width = parseFloat($(this).attr('width')),
        height = parseFloat($(this).attr('height')),
        x = x1 - rectData.width,
        y = y1 - rectData.height,
        id = $(this).attr('id').slice(4);
    d3.select(this)
        .attr('x', x)
        .attr('y', y);
    // d3.select('.dashRect')
    //     .attr('x', x1 - width / 2)
    //     .attr('y', y1 - height / 2);
    var point = [];
    point.push([1, x, y]);
    point.push([2, x + width, y]);
    point.push([3, x, y + height]);
    point.push([4, x + width, y + height]);
    d3.selectAll('#dashC' + id).data(point)
        .attr('cx', function (d) {
            return d[1];
        })
        .attr('cy', function (d) {
            return d[2];
        });
    d3.select('#retext' + id).attr('x', x + width / 2).attr('y', y + height + 20);
}
var endR = function () {
    let id = $(this).attr('id').slice(4),
        x = xnumToDB($(this).attr('x')),
        y = ynumToDb($(this).attr('y')),
        width = parseFloat($(this).attr('width')),
        height = parseFloat($(this).attr('height')),
        buildName = $(this).attr('buildname');
    var key = id;
    var value = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': buildName }
    editBuildName(key, value);
}

export var dragDashCircle = function (flag) {
    if (flag) {
        d3.selectAll('.changeCircle').call(
            d3.drag()
                .on('start', startC)
                .on('drag', dargC)
                .on('end', endC)
        );
    } else {
        d3.selectAll('.changeCircle').call(
            d3.drag()
                .on('start', null)
                .on('drag', null)
                .on('end', null)
        );
    }
}

var startC = function () {
    datas.init();
    d3.selectAll('.layui-layer-content').remove();
    var target = $(this).attr('direction');
    if (target == 1 || target == 4) {
        d3.select('body').style('cursor', 'nw-resize');
    } else {
        d3.select('body').style('cursor', 'sw-resize');
    };
}
var dargC = function () {
    let x = event.offsetX,
        y = event.offsetY,
        num = $(this).attr('num'),
        id = $(this).attr('id').slice(5),
        width = parseFloat($('#rect' + id).attr('width')),
        height = parseFloat($('#rect' + id).attr('height'));
    if (num == id + 1) {
        dragDashPoint1(id, x, y);
    } else if (num == id + 2) {
        dragDashPoint2(id, x, y);
    } else if (num == id + 3) {
        dragDashPoint3(id, x, y);
    } else if (num == id + 4) {
        dragDashPoint4(id, x, y);
    }
    d3.select('#retext' + id)
        .attr('x', parseFloat($('#rect' + id).attr('x')) + width / 2)
        .attr('y', parseFloat($('#rect' + id).attr('y')) + height + 20);
}
var endC = function () {
    let key = $(this).attr('id').slice(5),
        x = xnumToDB($('[num=' + key + '1]').attr('cx')),
        y = ynumToDb($('[num=' + key + '1]').attr('cy')),
        width = parseFloat($('#rect' + key).attr('width')),
        height = parseFloat($('#rect' + key).attr('height')),
        buildName = $('#rect' + key).attr('buildname');
    var value = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': buildName }
    editBuildName(key, value);
}

