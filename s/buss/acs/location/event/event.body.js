import { ctrlZ, ctrlY, backspace } from "/s/buss/acs/location/location.stack.js";


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