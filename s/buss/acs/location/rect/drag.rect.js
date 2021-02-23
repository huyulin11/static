import { datas } from "/s/buss/acs/location/location.data.js";
import { editBuildName } from "/s/buss/acs/location/url/rect.url.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { dragDashPoint1, dragDashPoint2, dragDashPoint3, dragDashPoint4 } from "/s/buss/acs/location/rect/drag.dash.point.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

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
var oldrect1 = {};
var rerect = {};
var startR = function () {
    d3.selectAll('.layui-layer-content').remove();
    d3.selectAll('.changeCircle').style('display', 'none');
    let x1 = event.offsetX,
        y1 = event.offsetY,
        x2 = parseFloat($(this).attr('x')),
        y2 = parseFloat($(this).attr('y')),
        width = x1 - x2,
        height = y1 - y2;
    let id = $(this).attr('id').slice(4),
        x = tool.xnumToDB(parseFloat($(this).attr('x'))),
        y = tool.ynumToDB(parseFloat($(this).attr('y'))),
        width1 = parseFloat($(this).attr('width')),
        height1 = parseFloat($(this).attr('height')),
        buildname = $(this).attr('buildname');
    d3.selectAll('#dashC' + id).style('display', 'block');
    rectData = { 'width': width, 'height': height, 'x': x1, 'y': y1 };
    oldrect1 = { 'id': parseInt(id), 'x': x, 'y': y, 'width': width1, 'height': height1, 'buildname': buildname };
    rerect = { 'id': parseInt(id), 'x1': x, 'y1': y, 'x2': tool.xnumToDB(parseFloat($(this).attr('x')) + width1), 'y2': tool.ynumToDB(parseFloat($(this).attr('y')) + height1), 'buildname': buildname }
}

var dargR = function () {
    let x1 = event.offsetX,
        y1 = event.offsetY,
        x = x1 - rectData.width,
        y = y1 - rectData.height;
    d3.select(this)
        .attr('x', x)
        .attr('y', y);
    var point = [];
    point.push([1, x, y]);
    point.push([2, x + oldrect1.width, y]);
    point.push([3, x, y + oldrect1.height]);
    point.push([4, x + oldrect1.width, y + oldrect1.height]);
    d3.selectAll('#dashC' + oldrect1.id).data(point)
        .attr('cx', function (d) {
            return d[1];
        })
        .attr('cy', function (d) {
            return d[2];
        });
    d3.select('#retext' + oldrect1.id).attr('x', x + oldrect1.width / 2).attr('y', y + oldrect1.height + 20);
}
var endR = function () {
    let x = tool.xnumToDB($(this).attr('x')),
        y = tool.ynumToDB($(this).attr('y')),
        x2 = tool.xnumToDB(parseFloat(oldrect1.width) + parseFloat($(this).attr('x'))),
        y2 = tool.ynumToDB(parseFloat(oldrect1.height) + parseFloat($(this).attr('y')));
    var value = { 'id': oldrect1.id, 'x1': x, 'y1': y, 'x2': x2, 'y2': y2, 'buildname': oldrect1.buildname };
    undoStack.push({ 'name': 'rectchangeloacation', 'newrect': value, 'oldrect': rerect });
    editBuildName(oldrect1.id, value);
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

var oldrect2 = {};
var value = {};
var rerect2 = {};
var startC = function () {
    datas.init();
    d3.selectAll('.layui-layer-content').remove();
    let target = $(this).attr('direction'),
        key = $(this).attr('id').slice(5),
        x = tool.xnumToDB($('[num=' + key + '1]').attr('cx')),
        y = tool.ynumToDB($('[num=' + key + '1]').attr('cy')),
        width = parseFloat($('#rect' + key).attr('width')),
        height = parseFloat($('#rect' + key).attr('height')),
        buildname = $('#rect' + key).attr('buildname'),
        x2 = parseFloat($('[num=' + key + '1]').attr('cx')) + width,
        y2 = parseFloat($('[num=' + key + '1]').attr('cy')) + height;
    oldrect2 = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': buildname };
    rerect2 = { 'id': parseInt(key), 'x1': x, 'y1': y, 'x2': tool.xnumToDB(x2), 'y2': tool.ynumToDB(y2), 'buildname': buildname };
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
    };
    let x1 = tool.xnumToDB($('[num=' + id + '1]').attr('cx')),
        y1 = tool.ynumToDB($('[num=' + id + '1]').attr('cy')),
        x2 = tool.xnumToDB(parseFloat($('[num=' + id + '1]').attr('cx')) + width),
        y2 = tool.ynumToDB(parseFloat($('[num=' + id + '1]').attr('cy')) + height);
    value = { 'id': oldrect2.id, 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'buildname': oldrect2.buildname };
    d3.select('#retext' + id)
        .attr('x', parseFloat($('#rect' + id).attr('x')) + width / 2)
        .attr('y', parseFloat($('#rect' + id).attr('y')) + height + 20);
}
var endC = function () {
    undoStack.push({ 'name': 'rectchangesize', 'newrect': value, 'oldrect': rerect2 });
    editBuildName(oldrect2.id, value);
    var target = $(this).attr('direction');
    if (target == 1 || target == 4) {
        d3.select('body').style('cursor', 'default');
    } else {
        d3.select('body').style('cursor', 'default');
    };
    d3.selectAll('rect').style('cursor', 'move');
}

