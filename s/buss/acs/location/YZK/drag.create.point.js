import { taskSiteLocation, updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { windowToDB } from "/s/buss/acs/location/YZK/trans.location.js";

conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);


export var started = function () {
    const { x, y } = d3.event;
    conf.svg.append("text")
        .attr("id", "n" + $(this).attr('id'))
        .attr("x", x)
        .attr("y", y)
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text($(this).attr('id'));
}
export var draged = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    d3.select("#t" + id)
        .attr("x", x)
        .attr("y", y);
    conf.svg.selectAll("line").filter(function (e) { return e && e.from == id; })
        .attr("x1", function (d) {
            return x;
        }).attr("y1", function (d) {
            return y;
        });
    conf.svg.selectAll("line").filter(function (e) { return e && e.to == id; })
        .attr("x2", function (d) {
            return x;
        }).attr("y2", function (d) {
            return y;
        });
    conf.svg.select("#n" + id)
        .attr("x", x)
        .attr("y", y);
}
export var ended = function () {
    const { x, y } = d3.event;
    d3.select(this)
        .attr('cx', x)
        .attr('cy', y);
    var id = $(this).attr('id');
    saveLocation(id, x, y);
    conf.svg.selectAll("#n" + id).remove();
}

export var createPoint = function () {
    var id = getID();
    let x = d3.event.offsetX, y = d3.event.offsetY;
    conf.svg.append("circle")
        .attr("id", id)
        .attr("fill", "blue")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 5)
    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    );
    saveLocation(id, x, y);
    datas.init();
}

var getID = function () {
    var ids = datas.id;
    var id = 1;
    for (var i of ids) {
        if (id == i.id) {
            id++;
        }
    }
    return id;
}

export var saveLocation = function (id, x, y) {
    var ids = parseInt(id);
    var result = windowToDB(id, x, y);
    gf.doAjax({
        url: `/app/conf/set.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: ids, value: JSON.stringify(result) },
        success: (obj) => {
            updateTaskSiteLocation(id, result);;
            layer.msg(obj.msg ? obj.msg : '保存成功！');
        }
    });
}
