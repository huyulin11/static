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
    var zoom = d3.select('svg').property('__zoom');
    var x = (event.offsetX - zoom.x) / zoom.k;
    var y = (event.offsetY - zoom.y) / zoom.k;
    switch (name) {
        case 'site': createPoint(x, y); break;
        case 'build': newRect(x, y); break;
    }
}