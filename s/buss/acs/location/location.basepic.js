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
    if (name == "site") {
        addSite();
    } else if (name == "build") {
        addRect();
    }
}

function imgDrag() {
    if (name == "site") {
        dragSite();
    } else if (name == "build") {
        dragRect();
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