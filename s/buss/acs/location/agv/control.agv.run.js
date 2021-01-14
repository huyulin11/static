import { dToStrig } from "/s/buss/acs/location/render/path.direction.js";
import { xnumToWindow, ynumToWindow } from "/s/buss/acs/location/render/trans.location.js";

export var getAgvLocation = function () {
}

export var getPath = function (x1, x2, y1, y2) {
    return dToStrig(xnumToWindow(x1), xnumToWindow(x2), ynumToWindow(y1), ynumToWindow(y2));

}