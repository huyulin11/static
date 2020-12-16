import { taskSiteLocation, updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { windowToDB, dbToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";
import { updatePoint, dragPoint, addPoint } from "/s/buss/acs/location/LAO_FOXCONN/location.on.js";
import { getM, getMPoint, getL2, getL2Point } from "/s/buss/acs/location/BASE/render/render.d.js";

var getMLL = function (x, y, s, flag) {
    var M = getM(s);
    var L2 = getL2(s);
    if (flag) {
        var arr = getL2Point(s);
        var a = (parseFloat(arr[0]) + parseFloat(x)) / 2;
        var b = (parseFloat(arr[1]) + parseFloat(y)) / 2;
        var s = "M" + x + "," + y + "L" + a + "," + b + L2;
        return s;
    } else {
        var arr = getMPoint(s);
        var a = (parseFloat(arr[0]) + parseFloat(x)) / 2;
        var b = (parseFloat(arr[1]) + parseFloat(y)) / 2;
        var s = M + "L" + a + "," + b + "L" + x + "," + y;
        return s;
    }
}

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
            return getMLL(x, y, s, true);
        });
    conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; })
        .attr("d", function (d) {
            var s = $(this).attr("d");
            return getMLL(x, y, s, false);
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
            layer.msg(obj.msg ? obj.msg : '保存成功！');
        }
    });
}
