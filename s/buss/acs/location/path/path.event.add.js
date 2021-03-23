import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { getMPoint } from "/s/buss/acs/location/path/render.d.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { markerDef } from "/s/buss/acs/location/path/path.marker.js";
import { editDrawPath } from "/s/buss/acs/location/path/path.draw.js";
import { dragPath, rightClickPath } from "/s/buss/acs/location/location.event.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var createPath = function (point) {
    var id = point.attr('id'), x = parseFloat(point.attr('cx')), y = parseFloat(point.attr('cy'));
    var width = parseFloat((localStorage.pathwidth ? localStorage.pathwidth : 5) / 2);
    var d = "M" + (x + width) + "," + (y - width) +
        "L" + (x + width) + "," + (y - width - 20) +
        "L" + (x + 2 * width) + "," + (y - width - 20) +
        "L" + x + "," + (y - 5 * width - 20) +
        "L" + (x - 2 * width) + "," + (y - width - 20) +
        "L" + (x - width) + "," + (y - width - 20) +
        "L" + (x - width) + "," + (y - width) +
        "L" + (x - width - 20) + "," + (y - width) +
        "L" + (x - width - 20) + "," + (y - 2 * width) +
        "L" + (x - 5 * width - 20) + "," + y +
        "L" + (x - width - 20) + "," + (y + 2 * width) +
        "L" + (x - width - 20) + "," + (y + width) +
        "L" + (x - width) + "," + (y + width) +
        "L" + (x - width) + "," + (y + width + 20) +
        "L" + (x - 2 * width) + "," + (y + width + 20) +
        "L" + x + "," + (y + 5 * width + 20) +
        "L" + (x + 2 * width) + "," + (y + width + 20) +
        "L" + (x + width) + "," + (y + width + 20) +
        "L" + (x + width) + "," + (y + width) +
        "L" + (x + width + 20) + "," + (y + width) +
        "L" + (x + width + 20) + "," + (y + 2 * width) +
        "L" + (x + 5 * width + 20) + "," + y +
        "L" + (x + width + 20) + "," + (y - 2 * width) +
        "L" + (x + width + 20) + "," + (y - width);

    conf.pathHome3.append("path")
        .attr("id", "newpath")
        .attr("class", "clashLine")
        .attr("from", id)
        .attr("fill", "#4896dac2")
        .attr("d", d);

    conf.pathHome3.selectAll(".clashLine").call(
        d3.drag()
            .on("start", start)
            .on("drag", drag)
            .on("end", end)
    );
}

var start = function () {
}

var drag = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    $(this).attr("d", pathTool.dPath(mPoint[0], x, mPoint[1], y))
        .attr("style", "marker-end:url(#triangle2);")
        .attr("fill", "none")
        .attr("stroke", "#4896dac2")
        .attr("stroke-width", function () { return localStorage.pathwidth; });
}

var end = function () {
    var siteid = $(this).attr("from");
    const { x, y } = d3.event;
    var point = getClosestPoint(siteid, x, y);
    var nextid = point.nextid;
    var flag = $("#p" + siteid + nextid)[0];
    if (!flag) {
        let s = $(this).attr("d");
        var arr = getMPoint(s);
        var x1 = arr[0], y1 = arr[1];
        var x2 = point.x2, y2 = point.y2;
        undoStack.push({ 'name': 'pathadd', 'path': { 'id': siteid + nextid, 'from': siteid, 'to': nextid, 'side': 2 } });
        saveLogic(2, siteid, nextid, '', () => {
            markerDef(false);
            editDrawPath(datas.path);
            dragPath(true);
            rightClickPath(true);
        });
    } else {
        layer.msg('新增失败，该路径已存在！');
    }
    d3.select(this).remove();
}

export var getClosestPoint = function (id, x, y) {
    var arr = [];
    datas.locations.forEach((e, i) => {
        if (e.id != id) {
            var x1 = e.x, y1 = e.y;
            x1 = tool.dbToWindow(x1, y1)[0];
            y1 = tool.dbToWindow(x1, y1)[1];
            var value = (x - x1) * (x - x1) + (y - y1) * (y - y1);
            arr.push({ "id": e.id, "value": value });
        }
    });
    var min = arr[0].value, idMin = arr[0].id;
    for (var i = 1; i < arr.length; i++) {
        if (min <= arr[i].value);
        else {
            min = arr[i].value, idMin = arr[i].id;
        };
    };
    var point;
    datas.locations.forEach((e, i) => {
        if (e.id == idMin) {
            let result = tool.dbToWindow(e.x, e.y);
            let x1 = parseFloat(x), y1 = parseFloat(y);
            let x2 = parseFloat(result[0]), y2 = parseFloat(result[1]);
            point = { "x1": x1, "y1": y1, "x2": x2, "y2": y2, "nextid": idMin };
        };
    });
    return point;
}