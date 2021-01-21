import { updateLocation, editLocationID, deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { addLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { drawPointId, drawPoints } from "/s/buss/acs/location/point/point.draw.js";
import { dragPoint, rightClickPoint } from "/s/buss/acs/location/location.event.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { updatePointId } from "/s/buss/acs/location/point/point.draw.js";
import { updatePathWhenDragPoint, updatePathWhenUpdateID } from "/s/buss/acs/location/path/path.update.js";

export var undoStack = [];
export var redoStack = [];
var undoStackLenth;
var redoStackLenth;

export var keyFun = function () {
    d3.select('body').on('keydown', function () {
        undoStackLenth = undoStack.length;
        redoStackLenth = redoStack.length;
        if (d3.event.ctrlKey == true && d3.event.keyCode == 90 && undoStackLenth > 0) {
            var pop = undoStack.pop();
            redoStack.push(pop);
            switch (pop.name) {
                case 'circleadd': undoCircleAdd(pop.id); break;
                case 'circledrag': undoCircleDrag(pop); break;
            };
        } else if (d3.event.ctrlKey == true && d3.event.keyCode == 89 && redoStackLenth > 0) {
            var pop = redoStack.pop();
            undoStack.push(pop);
            switch (pop.name) {
                case 'circleadd': redoCircleAdd(pop); break;
                case 'circledrag': redoCircleDrag(pop); break;
            }
        }
    })
}

function undoCircleDrag(pop) {
    $('#' + pop.id).attr('cx', pop.x).attr('cy', pop.y);
    var location = tool.windowToDB(pop.id, pop.x, pop.y);
    updateLocation(pop.id, location);
    updatePointId(pop.id, pop.x, pop.y);
    updatePathWhenDragPoint(pop.id, pop.x, pop.y);
}

function redoCircleDrag(pop) {
    $('#' + pop.id).attr('cx', pop.xx).attr('cy', pop.yy);
    var location = tool.windowToDB(pop.id, pop.xx, pop.yy);
    updateLocation(pop.id, location);
    updatePointId(pop.id, pop.xx, pop.yy);
    updatePathWhenDragPoint(pop.id, pop.xx, pop.yy);
}

function undoCircleAdd(id) {
    deleteLocation(id, () => {
        $('#' + id).remove();
        $('#t' + id).remove();
    })
}
function redoCircleAdd(pop) {
    var value = tool.windowToDB(pop.id, pop.x, pop.y);
    addLocation(value, () => {
        drawPoints(datas.udfPoints);
        drawPointId(datas.udfPoints);
        dragPoint(true);
        rightClickPoint(true);
    });
}


