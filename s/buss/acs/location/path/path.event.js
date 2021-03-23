import { getMPoint } from "/s/buss/acs/location/path/render.d.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { getClosestPoint } from "/s/buss/acs/location/path/path.event.add.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";
import rightclick from "/s/buss/acs/location/path/path.rightclick.js";

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
    var xOld = parseFloat($('#' + oldnext).attr('cx'));
    var yOld = parseFloat($('#' + oldnext).attr('cy'));
    var flag = $("#p" + siteid + nextid)[0];
    if (!flag) {
        var x2 = point.x2, y2 = point.y2;
        var side = d3.select(this).data()[0].side;
        var path = { 'side2': side, 'side1': side, 'siteid': siteid, 'nextid': nextid, 'oldnext': oldnext };
        undoStack.push({ 'name': 'pathdrag', 'path': path, 'x1': x1, 'y1': y1 });
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
        d3.select("#mar" + siteid + oldnext)
            .attr("orient", function (d) {
                d.to = nextid;
                d.id = siteid + nextid;
                return pathTool.markerRadian(x1, x2, y1, y2);
            });
    } else {
        layer.msg('调整失败，与原路径相同');
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
        d3.event.stopPropagation();
        d3.event.preventDefault();
        var path = d3.select(this);
        var side = d3.select(this).data()[0].side;
        d3.selectAll('#tipsloc').remove();
        let x = d3.event.offsetX,
            y = d3.event.offsetY;
        d3.select('svg').append('circle')
            .attr('id', 'tipsloc')
            .attr('cx', x)
            .attr('cy', y)
            .attr('fill', 'none')
            .attr('r', 4);
        var tips = layer.tips('<input type="button" id="delpath" style="width: 76px;height: 30px" value="删除路径"><br>'
            + '<input type="button" id="editderction" style="width: 76px;height: 30px" value="修改方向">',
            '#tipsloc', { tips: [2, '#e6e6e6'], time: 10000 });
        d3.select("body").on("click", function () { return layer.close(tips); });
        d3.select("#delpath").on("click", function () { rightclick.deletePath(path) })
        d3.select("#editderction").on("click", function () { rightclick.changeDirection(path, side) })
    }
}