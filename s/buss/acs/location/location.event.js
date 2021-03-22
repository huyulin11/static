import { conf } from "/s/buss/acs/location/location.conf.js";
import pointEvent from "/s/buss/acs/location/point/point.event.js";
import { event as pathEvent } from "/s/buss/acs/location/path/path.event.js";

export var mouseEvent = function (flag) {
    pointEvent.dragPoint(flag);
    pointEvent.rightClickPoint(flag);
    dragPath(flag);
    rightClickPath(flag);
}

export var dragPath = function (flag) {
    conf.svg.selectAll(".clashLine").call(
        d3.drag()
            .on('start.a', flag ? pathEvent.start : null)
            .on('drag.a', flag ? pathEvent.drag : null)
            .on('end.a', flag ? pathEvent.end : null)
    );
}

export var rightClickPath = function (flag) {
    conf.svg.selectAll(".clashLine")
        .on("contextmenu", flag ? pathEvent.delPath : null);
}
