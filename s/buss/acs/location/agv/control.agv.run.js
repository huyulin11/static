import { dToStrig } from "/s/buss/acs/location/path/path.direction.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var getAgvLocation = function () {
}

export var getPath = function (x1, x2, y1, y2) {
    return dToStrig(tool.xnumToWindow(x1), tool.xnumToWindow(x2), tool.ynumToWindow(y1), tool.ynumToWindow(y2));

}