import { getMPoint } from "/s/buss/acs/location/path/render.d.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { getClosestPoint } from "/s/buss/acs/location/path/path.event.add.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var event = {};

event.start = function () { }

event.drag = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    $(this).attr("d", pathTool.dPath(mPoint[0], x, mPoint[1], y));
    d3.select("#w" + $(this).attr("from") + $(this).attr("to"))
        .attr("d", function (d) {
            return pathTool.dPath(mPoint[0], x, mPoint[1], y);
        });
    d3.select("#mar" + $(this).attr("from") + $(this).attr("to"))
        .attr("orient", function () {
            return pathTool.markerRadian(mPoint[0], x, mPoint[1], y);
        });
}

event.end = function () {
    var siteid = $(this).attr("from"), oldnext = $(this).attr("to");
    let s = $(this).attr("d");
    var arr = getMPoint(s);
    var x1 = arr[0], y1 = arr[1];
    const { x, y } = d3.event;
    var point = getClosestPoint(siteid, x, y);
    var nextid = point.nextid;
    var flag = $("#p" + siteid + nextid)[0];
    if (!flag) {
        var x2 = point.x2, y2 = point.y2;
        var side = pathTool.getSide(x1, x2, y1, y2);
        var path = { 'side': side, 'siteid': siteid, 'nextid': nextid, 'oldnext': oldnext };
        undoStack.push({ 'name': 'pathdrag', 'path': path });
        saveLogic(side, siteid, nextid, oldnext);
        d3.select(this)
            .attr("id", "p" + siteid + nextid)
            .attr("from", siteid)
            .attr("to", nextid)
            .attr("d", function (d) {
                d.to = nextid;
                d.id = siteid + nextid;
                return pathTool.dPath(x1, x2, y1, y2);
            });
        // d3.select("#w" + siteid + oldnext)
        //     .attr("id", "w" + siteid + nextid)
        //     .attr("d", function (d) {
        //         console.log(22222222222222222222222);
        //         console.log(d);
        //         return pathTool.dPath(x1, x2, y1, y2);
        //     });
        d3.select("#mar" + siteid + oldnext)
            .attr("orient", function (d) {
                d.to = nextid;
                d.id = siteid + nextid;
                return pathTool.markerRadian(x1, x2, y1, y2);
            });
    } else {
        layer.msg('调整失败，与原路径相同');
        var xOld = parseFloat($('#' + oldnext).attr('cx'));
        var yOld = parseFloat($('#' + oldnext).attr('cy'));
        d3.select(this).attr('d', function (d) {//应该可以用d优化
            return pathTool.dPath(x1, xOld, y1, yOld);
        });
        d3.select("#w" + $(this).attr("from") + $(this).attr("to"))
            .attr("d", function (d) {
                return pathTool.dPath(x1, xOld, y1, yOld);
            });
        d3.select("#mar" + $(this).attr("from") + $(this).attr("to")).attr("orient", function () {
            return pathTool.markerRadian(x1, xOld, y1, yOld);
        });
    }
}

event.delPath = function (d, i) {
    if (d3.event.button == 2) {
        var path = d3.select(this);
        var wPath = d3.select("#w" + $(this).attr("from") + $(this).attr("to"));
        var marPath = d3.select("#mar" + $(this).attr("from") + $(this).attr("to"));
        var siteid = $(this).attr('from'), nextid = $(this).attr('to');
        var value = { "siteid": siteid, "nextid": nextid };
        let ii = layer.confirm('是否删除？', function (index) {
            deleteLogic(value, true);
            path.remove();
            wPath.remove();
            marPath.remove();
            layer.close(ii);
        });
    }
}