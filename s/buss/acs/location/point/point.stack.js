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

}

cirFunc.redoCircleUpdate = function (id) {

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
    var value = tool.windowToDB(pop.id, pop.x, pop.y);
    addLocation(value, () => {
        drawPoints(datas.udfPoints);
        drawPointId(datas.udfPoints);
        dragPoint(true);
        rightClickPoint(true);
        if (callback) { callback() };
    });
}
