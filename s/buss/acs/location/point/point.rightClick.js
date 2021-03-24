import { createPath } from "/s/buss/acs/location/path/path.event.add.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { updatePathWhenUpdateID } from "/s/buss/acs/location/path/path.update.js";
import { editLocation, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export default {
    updateID(point) {
        layer.prompt({ title: '输入id', formType: 0 }, function (newid, index) {
            var oldid = point.attr('id');
            for (var i of datas.id) {
                if (newid == i.id) { return layer.msg("存在相同站点，不予修改！"); }
            }
            if (oldid == newid) { layer.msg("相同站点，不予修改！"); }
            layer.close(index);
            if (window.confirm(`确定将id：${oldid}修改为${newid}？`)) {
                var location = tool.windowToDB(newid, point.attr('cx'), point.attr('cy'));
                undoStack.push({ 'name': 'circleupdate', 'value': location, 'oldid': oldid, 'point': point });
                editLocation(oldid, location, () => {
                    point.attr("id", function (d) {
                        d[0] = parseInt(newid);
                        return newid
                    });
                    d3.select("#t" + oldid).attr("id", "t" + newid).text(newid);
                    updatePathWhenUpdateID(oldid, newid);
                });
            }
        })
    },
    delPoint(point) {
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
                d3.select("#tpath" + d.id).remove();
                updatetaskSiteLogic(d.from, d.to, '', true);
                path.push({ 'd': d });
                return d.id;
            });
            undoStack.push({ 'name': 'circledel', 'circle': pop, 'path': path });
            delPath.remove();
        });
    },
    addPath(point) {
        createPath(point);
    }
}