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
    switch (name) {
        case 'site': addSite(); break;
        case 'build': addRect(); break;
    }
}

function imgDrag() {
    switch (name) {
        case 'site': dragSite(); break;
        case 'build': dragRect(); break;
    }
}

function imgEnd() {
    var x = event.offsetX;
    var y = event.offsetY;
    switch (name) {
        case 'site': createPoint(x, y); break;
        case 'build': newRect(x, y); break;
    }
}