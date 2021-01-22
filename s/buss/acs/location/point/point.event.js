import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { updatePointId } from "/s/buss/acs/location/point/point.draw.js";
import { updatePathWhenDragPoint, updatePathWhenUpdateID } from "/s/buss/acs/location/path/path.update.js";
import { updateLocation, editLocationID, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var event = {};
var flag = false;
event.start = function () {
    if (!flag) {
        let id = $(this).attr('id'),
            x = parseFloat($(this).attr('cx')),
            y = parseFloat($(this).attr('cy'));
        undoStack.push({ 'name': 'circledrag', 'id': id, 'x': x, 'y': y });
        flag = true;
    }
}

event.drag = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    $(this).attr('cx', x)
        .attr('cy', y);
    updatePointId(id, x, y);
    updatePathWhenDragPoint(id, x, y);
}

event.end = function (d) {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    var location = tool.windowToDB(id, x, y);
    updateLocation(id, location);
    var pop = undoStack.pop();
    pop.xx = x;
    pop.yy = y;
    undoStack.push(pop);
    flag = false;
}

event.updateID = function (point) {
    datas.init();
    layer.prompt({ title: '输入id', formType: 0 }, function (newid, index) {
        var oldid = point.attr('id');
        for (var i of datas.id) {
            if (newid == i.id) { return layer.msg("存在相同站点，不予修改！"); }
        }
        if (oldid == newid) { layer.msg("相同站点，不予修改！"); }
        layer.close(index);
        if (window.confirm(`确定将id：${oldid}修改为${newid}？`)) {
            var location = tool.windowToDB(newid, point.attr('cx'), point.attr('cy'));
            editLocationID(oldid, location, () => {
                point.attr("id", function (d) {
                    d[0] = parseInt(newid);
                    return newid
                });
                d3.select("#t" + oldid).attr("id", "t" + newid).text(newid);
                updatePathWhenUpdateID(oldid, newid);
            });
        }
    })
}

event.delPoint = function (point) {
    var id = point.attr('id');
    var x = point.attr('cx');
    var y = point.attr('cy');
    var pop = { 'id': id, 'x': x, 'y': y };
    var path = [];
    deleteLocation(id, () => {
        point.remove();
        conf.pointTextHome.select("#t" + id).remove();
        var delPath = conf.svg.selectAll(".clashLine").filter(function (e) { return e && (e.from == id || e.to == id); });
        delPath.attr('id', function (d) {
            updatetaskSiteLogic(d.from, d.to, '', true);
            path.push({ 'd': d });
            return d.id;
        });
        undoStack.push({ 'name': 'circledel', 'circle': pop, 'path': path });
        delPath.remove();
    });
}