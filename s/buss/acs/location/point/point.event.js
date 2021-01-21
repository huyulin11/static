import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { updatePointId } from "/s/buss/acs/location/point/point.draw.js";
import { updatePathWhenDragPoint, updatePathWhenUpdateID } from "/s/buss/acs/location/path/path.update.js";
import { updateLocation, editLocationID, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";

export var event = {};

event.start = function () { }

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
                conf.pointTextHome.select("#t" + oldid).attr("id", "t" + newid).text(newid);
                updatePathWhenUpdateID(oldid, newid);
            });
        }
    })
}

event.delPoint = function (point) {
    var id = point.attr('id');
    deleteLocation(id, () => {
        point.remove();
        conf.pointTextHome.select("#t" + id).remove();
        conf.svg.selectAll("path").filter(function (e) { return e && (e.from == id || e.to == id); }).remove();
    });
}