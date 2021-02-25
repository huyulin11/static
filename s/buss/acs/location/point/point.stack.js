import { updateLocation, editLocationID, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { addLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { drawPointId, drawPoints } from "/s/buss/acs/location/point/point.draw.js";
import { dragPoint, rightClickPoint } from "/s/buss/acs/location/location.event.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { updatePointId } from "/s/buss/acs/location/point/point.draw.js";
import { updatePathWhenDragPoint, updatePathWhenUpdateID } from "/s/buss/acs/location/path/path.update.js";
import { pathFunc } from "/s/buss/acs/location/path/path.stack.js";

export var cirFunc = {};

cirFunc.undoCircleUpdate = function (pop) {
    let oldid = pop.oldid,
        newid = pop.value.id,
        x = pop.value.x,
        y = pop.value.y,
        point = pop.point;
    var location = tool.windowToDB(oldid, x, y);
    editLocationID(newid, location, () => {
        point.attr("id", function (d) {
            d[0] = parseInt(oldid);
            return oldid;
        });
        d3.select("#t" + newid).attr("id", "t" + oldid).text(oldid);
        updatePathWhenUpdateID(newid, oldid);
    });
}

cirFunc.redoCircleUpdate = function (pop) {
    let oldid = pop.oldid,
        newid = pop.value.id,
        location = pop.value,
        point = pop.point;
    editLocationID(oldid, location, () => {
        point.attr("id", function (d) {
            d[0] = parseInt(newid);
            return newid
        });
        d3.select("#t" + oldid).attr("id", "t" + newid).text(newid);
        updatePathWhenUpdateID(oldid, newid);
    });
}

cirFunc.undoCircleDel = function (pop) {
    var circle = pop.circle;
    var path = pop.path;
    let callback = () => {
        for (let i of path) {
            pathFunc.redoPathAdd(i.d);
        }
    };
    cirFunc.redoCircleAdd(circle, callback);
}

cirFunc.redoCircleDel = function (pop) {
    var circle = pop.circle;
    var path = pop.path;
    for (let i of path) {
        pathFunc.undoPathAdd(i.d);
    }
    cirFunc.undoCircleAdd(circle.id);
}

cirFunc.undoCircleDrag = function (pop) {
    $('#' + pop.id).attr('cx', pop.x).attr('cy', pop.y);
    var location = tool.windowToDB(pop.id, pop.x, pop.y);
    updateLocation(pop.id, location);
    updatePointId(pop.id, pop.x, pop.y);
    updatePathWhenDragPoint(pop.id, pop.x, pop.y);
}

cirFunc.redoCircleDrag = function (pop) {
    $('#' + pop.id).attr('cx', pop.xx).attr('cy', pop.yy);
    var location = tool.windowToDB(pop.id, pop.xx, pop.yy);
    updateLocation(pop.id, location);
    updatePointId(pop.id, pop.xx, pop.yy);
    updatePathWhenDragPoint(pop.id, pop.xx, pop.yy);
}

cirFunc.undoCircleAdd = function (id) {
    deleteLocation(id, () => {
        $('#' + id).remove();
        $('#t' + id).remove();
    })
}
cirFunc.redoCircleAdd = function (pop, callback) {
    var location = tool.windowToDB(pop.id, pop.x, pop.y);
    addLocation(location, () => {
        d3.select('#pointHome').selectAll('circle').remove();
        d3.select('#pointTextHome').selectAll("text").remove();
        drawPoints(datas.udfPoints);
        drawPointId(datas.udfPoints);
        dragPoint(true);
        rightClickPoint(true);
        if (callback) { callback() };
    });
}
