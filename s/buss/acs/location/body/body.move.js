import { createPath } from "/s/buss/acs/location/path/path.event.add.js";
import { conf } from "/s/buss/acs/location/location.conf.js";

export var coorMove = function () {
    var circles = d3.select('svg').select('#pointHome').selectAll('circle').nodes();
    var gap = [];
    var zoom = d3.select('svg').property('__zoom');
    for (let i of circles) {
        let dx = (d3.event.offsetX - zoom.x) / zoom.k - i.cx.animVal.value,
            dy = (d3.event.offsetY - zoom.y) / zoom.k - i.cy.animVal.value,
            id = i.id;
        var opacity = Math.sqrt(dx * dx + dy * dy);
        gap.push({ 'id': id, 'distance': opacity });
        gap.sort(function (a, b) { return a.distance - b.distance });
    }
    if (gap[0]) {
        var id = gap[0].id;
        var point = $('#' + id);
        var minLen = gap[0].distance;
        if (minLen > 120) {
            conf.pathHome3.selectAll(".clashLine").remove();
        } else if (20 <= minLen <= 120) {
            conf.pathHome3.selectAll(".clashLine").remove();
            createPath(point);
            var getFill = (120 - minLen) / 100;
            conf.pathHome3.selectAll(".clashLine").attr('fill-opacity', getFill);
            $('#triangle2').attr('fill-opacity', getFill);
        } else if (minLen < 20) {
            conf.pathHome3.selectAll(".clashLine").attr('fill-opacity', 1);
            $('#triangle2').attr('fill-opacity', 1);
        }
    }
}

export var bodyMouseMove = function (flag) {
    d3.select('#coordinate').select('svg')
        .on('mousemove', !flag ? null : function () {
            coorMove();
        })
}
