import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var drawRect = function (rectdata) {
    conf.rectHome.selectAll("rect").remove();
    conf.rectTextHome.selectAll("text").remove();
    conf.rectPointHome.selectAll("circle").remove();
    conf.rectHome.selectAll("rect").data(rectdata)
        .enter()
        .append("rect")
        .attr('x', function (d) {
            return tool.xnumToWindow(d.x1);
        })
        .attr('y', function (d) {
            return tool.ynumToWindow(d.y1);
        })
        .attr('id', function (d) {
            return 'rect' + d.id;
        })
        .attr('width', function (d) {
            return tool.xnumToWindow(d.x2) - tool.xnumToWindow(d.x1);
        })
        .attr('height', function (d) {
            return tool.ynumToWindow(d.y2) - tool.ynumToWindow(d.y1);
        })
        .attr('buildname', function (d) {
            return d.buildname;
        })
        .attr('class', 'classRect')
        .attr('fill', '#e0e053')
        .attr('opacity', 0.5);
    conf.rectTextHome.selectAll("text").data(rectdata)
        .enter()
        .append('text')
        .attr('x', function (d) {
            return tool.xnumToWindow(d.x1) + (tool.xnumToWindow(d.x2) - tool.xnumToWindow(d.x1)) / 2;
        })
        .attr('y', function (d) {
            return tool.ynumToWindow(d.y1) + (tool.ynumToWindow(d.y2) - tool.ynumToWindow(d.y1)) + 20;
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
        let x1 = tool.xnumToWindow(rect.x1),
            y1 = tool.ynumToWindow(rect.y1),
            x2 = tool.xnumToWindow(rect.x2),
            y2 = tool.ynumToWindow(rect.y2);
        point.push([1, x1, y1, rect.id]);
        point.push([2, x2, y1, rect.id]);
        point.push([3, x1, y2, rect.id]);
        point.push([4, x2, y2, rect.id]);
    }
    conf.rectPointHome.selectAll("circle").data(point)
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