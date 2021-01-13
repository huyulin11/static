import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/BASE/rect/drag.rect.js";

export var changeRect = function (flag) {
    if (flag) {
        d3.selectAll(".classRect").on('click', clickRect);
    } else {
        conf.rectHome.selectAll(".classRect").on('click', null);
    }
}

var clickRect = function (flag) {
    d3.event.preventDefault();
    d3.event.stopPropagation();
    d3.selectAll('.dashRect').remove();
    d3.selectAll('.changeCircle').remove();
    let x = parseFloat($(this).attr('x')),
        y = parseFloat($(this).attr('y')),
        width = parseFloat($(this).attr('width')),
        height = parseFloat($(this).attr('height')),
        id = $(this).attr('id').slice(4);
    addFourCircle(x, y, width, height, id);
    // addDashRect(x, y, width, height, id);
    dragDashRect(flag);
    dragDashCircle(flag);
    delBankDash(flag);
}

var delBankDash = function (flag) {
    if (flag) {
        conf.svg.on('click', function () {
            d3.selectAll('.dashRect').remove();
            d3.selectAll('.changeCircle').remove();
        })
    } else {
        conf.svg.on('click', null);
    }
}

// var addDashRect = function (x, y, width, height, id) {
//     conf.rectHome.append('rect')
//         .attr('x', x)
//         .attr('y', y)
//         .attr('id', 'dashR' + id)
//         .attr('width', width)
//         .attr('height', height)
//         .attr('class', 'dashRect')
//         .attr('fill', 'none')
//         .attr('stroke', '#8e8e8e')
//         .attr('stroke-width', 1)
//         .attr('stroke-dasharray', '3,2')
// }

var addFourCircle = function (x, y, width, height, id) {
    var point = [];
    point.push([1, x, y]);
    point.push([2, x + width, y]);
    point.push([3, x, y + height]);
    point.push([4, x + width, y + height]);
    conf.rectHome.selectAll("circle").data(point)
        .enter()
        .append('circle')
        .attr('class', 'changeCircle')
        .attr('id', function (d) {
            return 'dashC' + id;
        })
        .attr('num', function (d) {
            return d[0];
        })
        .attr('cx', function (d) {
            return d[1];
        })
        .attr('cy', function (d) {
            return d[2];
        })
        .attr('xx', function (d) {
            return d[1];
        })
        .attr('yy', function (d) {
            return d[2];
        })
        .attr('r', 3)
        .attr('stroke', '#8e8e8e')
        .attr('stroke-width', 1)
        .attr('fill', 'orange');

}