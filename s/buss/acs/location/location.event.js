import pointEvent from "/s/buss/acs/location/point/point.event.js";
import pathEvent from "/s/buss/acs/location/path/path.event.js";

export var mouseEvent = function (flag) {
    pointEvent.dragPoint(flag);
    pointEvent.rightClickPoint(flag);
    pointEvent.movePoint(flag);
    pointEvent.moveoutPoint(flag);
    pathEvent.dragPath(flag);
    pathEvent.rightClickPath(flag);
}
