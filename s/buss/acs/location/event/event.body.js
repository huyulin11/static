import { ctrlZ, ctrlY, backspace } from "/s/buss/acs/location/location.stack.js";
import { coorDrag } from "/s/buss/acs/location/body/body.drag.select.js";
import { deselect } from "/s/buss/acs/location/body/body.ctrlclick.js";
import { bodyMouseMove } from "/s/buss/acs/location/body/body.move.js";
import { restartZoom, closeZoom } from "/s/buss/acs/location/body/body.zoom.js";

export var bodyEvent = function (flag) {
    bodyKeyDown(flag);
    bodyMouseMove(flag);
    bodyKeyPress(flag);
    bodyKeyUp(flag);
}

let flag_key = false;
var bodyKeyDown = function (flag) {
    d3.select('body').on('keydown', !flag ? null : function () {
        if (d3.event.ctrlKey == true && d3.event.keyCode == 90) {
            return ctrlZ();
        } else if (d3.event.ctrlKey == true && d3.event.keyCode == 89) {
            return ctrlY();
        } else if (d3.event.keyCode == 46 || d3.event.keyCode == 8) {
            return backspace();
        };
        if (!flag_key) {
            // d3.select('body').on('keydown', null);
            flag_key = true;
        };
    })
}

var bodyKeyPress = function (flag) {
    d3.select('body').on('keypress', !flag ? null : function () {
        d3.select('body').on('keypress', null);
        if (d3.event.keyCode == 115) {
            closeZoom();
            coorDrag(true);
            deselect();
        }
    })
}

var bodyKeyUp = function (flag) {
    d3.select('body').on('keyup', !flag ? null : function () {
        if (flag_key) {
            bodyKeyDown(true);
            bodyKeyPress(true);
            flag_key = false;
        };
        if (d3.event.keyCode == 83) {
            restartZoom();
            d3.select('#coordinate').select('svg').call(
                d3.drag()
                    .on('start', null)
                    .on('drag', null)
                    .on('end', null)
            );
        }
    })
}
