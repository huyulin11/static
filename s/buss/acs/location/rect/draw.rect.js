import { conf } from "/s/buss/acs/location/location.conf.js";
import { xnumToWindow, ynumToWindow } from "/s/buss/acs/location/render/trans.location.js";

export var drawRect = function (rectdata) {
    if (rectdata.length > 0) {
        conf.rectHome.selectAll("rect").data(rectdata)
            .enter()
            .append("rect")
            .attr('x', function (d) {
                return xnumToWindow(d.x);
            })
            .attr('y', function (d) {
                return ynumToWindow(d.y);
            })
            .attr('id', function (d) {
                return 'rect' + d.id;
            })
            .attr('width', function (d) {
                return d.width;
            })
            .attr('height', function (d) {
                return d.height;
            })
            .attr('buildname', function (d) {
                return d.buildname;
            })
            .attr('class', 'classRect')
            .attr('fill', '#e0e053')
            .attr('opacity', 0.5);
        conf.rectHome.selectAll("text").data(rectdata)
            .enter()
            .append('text')
            .attr('x', function (d) {
                return xnumToWindow(d.x) + d.width / 2;
            })
            .attr('y', function (d) {
                return ynumToWindow(d.y) + d.height + 20;
            })
            .attr('id', function (d) {
                return 'retext' + d.id;
            })
            .attr("font-size", "13px")
            .attr('fill', 'black')
            .style('text-anchor', 'middle')
            .text(function (d) {
                return d.buildname;
            });
        var point = [];
        for (let rect of rectdata) {
            let x = xnumToWindow(rect.x),
                y = ynumToWindow(rect.y);
            point.push([1, x, y, rect.id]);
            point.push([2, x + rect.width, y, rect.id]);
            point.push([3, x, y + rect.height, rect.id]);
            point.push([4, x + rect.width, y + rect.height, rect.id]);
        }
        conf.rectHome.selectAll("circle").data(point)
            .enter()
            .append('circle')
            .attr('class', 'changeCircle')
            .attr('id', function (d) {
                return 'dashC' + d[3];
            })
            .attr('num', function (d) {
                return d[3] + "" + d[0];
            })
            .attr('direction', function (d) {
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
            .attr('fill', 'orange')
            .style('display', 'none');
    }
}