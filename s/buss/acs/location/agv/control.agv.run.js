import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var getAgvLocation = function () {
}

export var getPath = function (x1, x2, y1, y2) {
    return pathTool.dPath(tool.xnumToWindow(x1), tool.xnumToWindow(x2), tool.ynumToWindow(y1), tool.ynumToWindow(y2));

}