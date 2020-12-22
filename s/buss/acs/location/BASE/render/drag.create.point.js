import { taskSiteLocation, updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { windowToDB, dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";
import { updatePoint, dragPoint, addPoint } from "/s/buss/acs/location/LAO_FOXCONN/location.on.js";
import { getMPoint, getL2Point } from "/s/buss/acs/location/BASE/render/render.d.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { getPointByID } from "/s/buss/acs/location/BASE/point/ponit.coordinate.js";

export var started = function () {
    const { x, y } = d3.event;
    conf.textHome.append("text")
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
    conf.svg.selectAll("path").filter(function (e) { return e && e.from == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var l2Point = getL2Point(s);
            var x2 = l2Point[0], y2 = l2Point[1];
            return dToStrig(x, x2, y, y2);
        });
    conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            var mPoint = getMPoint(s);
            var x1 = mPoint[0], y1 = mPoint[1];
            return dToStrig(x1, x, y1, y);
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
    dragPoint();
    updatePoint();
    saveLocation(id, x, y);
}

var getID = function () {
    datas.init();
    var ids = datas.id;
    var id = 1;
    var arr = [];
    ids.forEach((e) => {
        arr.push(e.id);
    })
    arr.sort(function (a, b) { return a - b });
    for (var i of arr) {
        if (id == i) {
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
            updateTaskSiteLocation(id, result);
            if (obj.msg) layer.msg(obj.msg);
        }
    });
}

export var deleteLocation = function (id) {
    var ids = parseInt(id);
    gf.doAjax({
        url: `/app/conf/del.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: ids },
        success: (obj) => {
            updateTaskSiteLocation(id, "", true);
            if (obj.msg) layer.msg(obj.msg);
        }
    });
}
