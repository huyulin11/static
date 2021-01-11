import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { editBuildName } from "/s/buss/acs/location/BASE/render/s/rect.url.js";
import { xnumToDB, ynumToDb } from "/s/buss/acs/location/BASE/render/trans.location.js";

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


var startR = function () {
    datas.init();
}
var dargR = function () {
    let x1 = event.offsetX,
        y1 = event.offsetY;
    let width = parseFloat($(this).attr('width')),
        height = parseFloat($(this).attr('height')),
        x = x1 - width / 2,
        y = y1 - height / 2,
        id = $(this).attr('id');
    d3.select(this)
        .attr('x', x1 - width / 2)
        .attr('y', y1 - height / 2);
    d3.select('.dashRect')
        .attr('x', x1 - width / 2)
        .attr('y', y1 - height / 2);
    var point = [];
    point.push([1, x, y]);
    point.push([2, x + width, y]);
    point.push([3, x, y + width]);
    point.push([4, x + width, y + height]);
    d3.selectAll('.changeCircle').data(point)
        .attr('cx', function (d) {
            return d[1];
        })
        .attr('cy', function (d) {
            return d[2];
        });
    d3.select('#retext' + id.slice(4)).attr('x', x).attr('y', y + height + 20);
}
var endR = function () {
    let id = $(this).attr('id'),
        x = xnumToDB($(this).attr('x')),
        y = ynumToDb($(this).attr('y')),
        width = parseFloat($(this).attr('width')),
        height = parseFloat($(this).attr('height')),
        buildName = $(this).attr('buildname');
    var key = id.slice(4);
    var value = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': buildName }
    editBuildName(key, value);
}

d3.select('.changeCircle').call(
    d3.drag()
        .on('start', startC)
        .on('drag', dargC)
        .on('end', endC)
);

var startC = function () {
    datas.init();
}
var dargC = function () {

}
var endC = function () {

}