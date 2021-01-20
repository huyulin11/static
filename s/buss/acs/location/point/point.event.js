import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { updateLocation, editLocationID, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { fillPointId } from "/s/buss/acs/location/point/point.draw.js";
import { fillHome1, fillHome2, fillMarkerPath } from "/s/buss/acs/location/path/fillter.pathHome.js";

export var event = {};

event.start = function () { }

event.drag = function () {
    const { x, y } = d3.event;
    var id = $(this).attr('id');
    $(this).attr('cx', x)
        .attr('cy', y);
    fillPointId(id, x, y);
    fillHome1(id, x, y);
    fillHome2(id, x, y);
    fillMarkerPath(id, x, y);
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
                point.attr("id", newid);
                conf.pointTextHome.select("#t" + oldid).attr("id", "t" + newid).text(newid);
                d3.selectAll("path")
                    .filter(function (e) { return e && e.to == oldid; })
                    .attr("id", function (d) {
                        return 'p' + d.from + newid;
                    })
                    .attr("to", newid);
                d3.selectAll("path")
                    .filter(function (e) { return e && e.from == oldid; })
                    .attr("id", function (d) {
                        return 'p' + newid + d.to;
                    })
                    .attr("from", newid);
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