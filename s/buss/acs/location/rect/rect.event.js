import { rightClickRect } from "/s/buss/acs/location/rect/rect.rightclick.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/rect/drag.rect.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { baseCircleMoudle } from "/s/buss/acs/location/location.basepic.js";

export var rectEvent = function (flag) {
    rightClickRect(flag);
    dragDashRect(flag);
    dragDashCircle(flag);
    delBankDash(flag);
    mouseStyle(flag);
    bankDefaultEvent();
    baseCircleMoudle(flag);

}
export var bankDefaultEvent = function () {
    d3.selectAll('rect').on('dblclick', function () {
        d3.event.stopPropagation();
        return null;
    });
    d3.selectAll('rect').on('click', function () {
        d3.event.stopPropagation();
        return null;
    });
}
export var mouseStyle = function () {
    d3.selectAll('.changeCircle').on('mousemove', function () {
        var num = d3.select(this).attr('direction');
        if (num == 1 || num == 4) {
            d3.select(this).style('cursor', 'nw-resize');
        } else {
            d3.select(this).style('cursor', 'sw-resize');
        }
    });
}

var delBankDash = function (flag) {
    if (flag) {
        conf.svg.on('click', function () {
            d3.selectAll('.changeCircle').style('display', 'none');
        })
    } else {
        conf.svg.on('click', null);
    }
}