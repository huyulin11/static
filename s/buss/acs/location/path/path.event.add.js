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
    var id = point.attr('id'), x = point.attr('cx'), y = point.attr('cy');
    var num = 0;
    var path = function () {
        num++;
        return conf.pathHome3.append("path")
            .attr("num", num)
            .attr("id", "new" + num)
            .attr("class", "clashLine")
            .attr("from", id)
            .attr("fill", "none")
            .attr("stroke", "#8a8a8a")
            .attr("stroke-width", function () { return localStorage.pathwidth; })
            .attr("style", "marker-end:url(#triangle2);");
    }
    path().attr("d", "M" + x + "," + y + "L" + (parseFloat(x) + 20) + "," + y);
    path().attr("d", "M" + x + "," + y + "L" + (parseFloat(x) - 20) + "," + y);
    path().attr("d", "M" + x + "," + y + "L" + x + "," + (parseFloat(y) + 20));
    path().attr("d", "M" + x + "," + y + "L" + x + "," + (parseFloat(y) - 20));

    conf.pathHome3.selectAll(".clashLine").call(
        d3.drag()
            .on("start", start)
            .on("drag", drag)
            .on("end", end)
    );
}

var start = function () {
    var num = $(this).attr("num");
    for (var i = 1; i <= 4; i++) {
        if (i != num) d3.select("#new" + i).remove();
    }
}

var drag = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    $(this).attr("d", pathTool.dPath(mPoint[0], x, mPoint[1], y));
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
        var side = pathTool.getSide(x1, x2, y1, y2);
        undoStack.push({ 'name': 'pathadd', 'path': { 'id': siteid + nextid, 'from': siteid, 'to': nextid, 'side': side } });
        saveLogic(side, siteid, nextid, '', () => {
            markerDef();
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