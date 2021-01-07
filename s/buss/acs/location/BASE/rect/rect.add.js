import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { crateRect } from "/s/buss/acs/location/BASE/render/s/rect.url.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { rightClickRect } from "/s/buss/acs/location/BASE/rect/rect.rightclick.js";

export var addRect = function (flag) {
    if (flag) {
        d3.select("body").select("#coordinate").select("svg")
            .on("dblclick", setRect);
    } else {
        d3.select("body").select("#coordinate").select("svg")
            .on("dblclick", null);
    };
}

var setRect = function () {
    var id = getid();
    let x = d3.event.offsetX,
        y = d3.event.offsetY;
    conf.rectHome.append("rect")
        .attr('x', x - 10)
        .attr('y', y - 10)
        .attr('id', 'rect' + id)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', '#e0e053')
        .attr('stroke', 'orange')
        .attr('opacity', 0.5)
        .attr('stroke-width', 1.5);
    conf.rectHome.append('text')
        .attr('x', x - 10)
        .attr('y', y + 30)
        .attr('id', 'retext' + id)
        .attr("font-size", "13px")
        .attr('fill', 'black')
        .text('建筑');
    crateRect(id, x - 10, y - 10, 20, 20);
    rightClickRect(true);
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