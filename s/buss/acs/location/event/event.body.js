import { ctrlZ, ctrlY, backspace } from "/s/buss/acs/location/location.stack.js";
import { coorMove } from "/s/buss/acs/location/body/body.move.js";
import { svgstart, svgdrag, svgend } from "/s/buss/acs/location/body/body.drag.select.js";

export var bodyEvent = function (flag) {
    bodyKeyDown(flag);
    bodyMouseMove(flag);
    coorDrag(flag);
}

export var bodyKeyDown = function (flag) {
    d3.select('body').on('keydown', !flag ? null : function () {
        if (d3.event.ctrlKey == true && d3.event.keyCode == 90) {
            return ctrlZ();
        } else if (d3.event.ctrlKey == true && d3.event.keyCode == 89) {
            return ctrlY();
        } else if (d3.event.keyCode == 46 || d3.event.keyCode == 8) {
            return backspace();
        }
    })
}

export var bodyMouseMove = function (flag) {
    d3.select('#coordinate').select('svg')
        .on('mousemove', !flag ? null : function () {
            coorMove();
        })
}

export var coorDrag = function (flag) {
    d3.select('#coordinate').select('svg').call(
        flag ? d3.drag()
            .on('start', svgstart)
            .on('drag', svgdrag)
            .on('end', svgend) : null
    );
}