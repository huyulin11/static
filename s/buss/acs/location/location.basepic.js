import { datas } from "/s/buss/acs/location/location.data.js";
import { addSite, createPoint, dragSite } from "/s/buss/acs/location/point/point.add.js";
import { addRect, dragRect, newRect } from "/s/buss/acs/location/rect/rect.add.js";

export var baseCircleMoudle = function (flag) {
    d3.selectAll('.panel_box').call(
        d3.drag()
            .on('start', flag ? imgStart : null)
            .on('drag', flag ? imgDrag : null)
            .on('end', flag ? imgEnd : null)
    );
}

var name;
function imgStart() {
    datas.init();
    name = d3.select(this).attr('shapename');
    var x = d3.event.x;
    var y = d3.event.y + 180;
    if (name == "site") {
        addSite(x, y);
    } else if (name == "build") {
        addRect();
    }
}

function imgDrag() {
    var x = d3.event.x;
    var y = d3.event.y + 180;
    if (name == "site") {
        dragSite(x, y);
    } else if (name == "build") {
        dragRect(x, y);
    }
}

function imgEnd() {
    var x = event.offsetX;
    var y = event.offsetY;
    if (name == "site") {
        createPoint(x, y);
    } else if (name == "build") {
        newRect(x, y);
    }
}