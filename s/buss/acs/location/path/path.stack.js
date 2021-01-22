import { getMPoint } from "/s/buss/acs/location/path/render.d.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { getClosestPoint } from "/s/buss/acs/location/path/path.event.add.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { addMarker } from "/s/buss/acs/location/path/path.marker.js";
import { drawPath } from "/s/buss/acs/location/path/path.draw.js";
import { dragPath, rightClickPath } from "/s/buss/acs/location/location.event.js";


export var pathFunc = {};

pathFunc.undoPathAdd = function (path) {
    d3.select('#p' + path.id).remove();
    d3.select('#w' + path.id).remove();
    d3.select('#mar' + path.id).remove();
    var value = { 'siteid': path.from, 'nextid': path.to }
    deleteLogic(value, true);
}

pathFunc.redoPathAdd = function (path) {
    let x1 = path.leftXaxis,
        y1 = path.downYaxis,
        x2 = path.rightXaxis,
        y2 = path.upYaxis,
        siteid = path.from,
        nextid = path.to;
    var side = pathTool.getSide(x1, x2, y1, y2);
    saveLogic(side, siteid, nextid, '', () => {
        addMarker(siteid, nextid, x1, x2, y1, y2);
        drawPath(datas.path);
        dragPath(true);
        rightClickPath(true);
    });
}