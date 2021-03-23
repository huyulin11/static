import { pathTool } from "/s/buss/acs/location/path/path.tool.js";
import { saveLogic } from "/s/buss/acs/location/url/logic.url.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { markerDef } from "/s/buss/acs/location/path/path.marker.js";
import { editDrawPath } from "/s/buss/acs/location/path/path.draw.js";
import pathEvent from "/s/buss/acs/location/path/path.event.js";

export var pathFunc = {};

pathFunc.undoPathDel = function (pop) {
    var side = pop.side;
    saveLogic(side, pop.siteid, pop.nextid, '', () => {
        markerDef(false);
        editDrawPath(datas.path);
        pathEvent.dragPath(true);
        pathEvent.rightClickPath(true);
    });
}

pathFunc.redoPathDel = function (value) {
    d3.select('#p' + value.siteid + value.nextid).remove();
    d3.select('#w' + value.siteid + value.nextid).remove();
    d3.select('#mar' + value.siteid + value.nextid).remove();
    deleteLogic(value, true);
}

pathFunc.undoPathAdd = function (path) {
    d3.select('#p' + path.id).remove();
    d3.select('#w' + path.id).remove();
    d3.select('#mar' + path.id).remove();
    var value = { 'siteid': path.from, 'nextid': path.to };
    deleteLogic(value, true);
}

pathFunc.redoPathAdd = function (path) {
    var side = path.side;
    if (!side) {
        let x1 = path.leftXaxis,
            y1 = path.downYaxis,
            x2 = path.rightXaxis,
            y2 = path.upYaxis;
        side = pathTool.getSide(x1, x2, y1, y2);
    }
    let siteid = path.from,
        nextid = path.to;
    saveLogic(side, siteid, nextid, '', () => {
        markerDef(false);
        editDrawPath(datas.path);
        pathEvent.dragPath(true);
        pathEvent.rightClickPath(true);
    });
}

pathFunc.undoPathChangeSize = function (pop) {
    localStorage.pathwidth = pop.size;
    d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
    d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
}

pathFunc.redoPathChangeSize = function (pop) {
    localStorage.pathwidth = pop.size2;
    d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
    d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
}

pathFunc.undoPathDrag = function (pop) {
    let side = pop.path.side2,
        oldnext = pop.path.oldnext,
        siteid = pop.path.siteid,
        nextid = pop.path.nextid;
    saveLogic(side, siteid, oldnext, nextid, () => {
        markerDef(false);
        editDrawPath(datas.path);
        pathEvent.dragPath(true);
        pathEvent.rightClickPath(true);
    })
}

pathFunc.redoPathDrag = function (pop) {
    let side = pop.path.side1,
        oldnext = pop.path.oldnext,
        siteid = pop.path.siteid,
        nextid = pop.path.nextid;
    saveLogic(side, siteid, nextid, oldnext, () => {
        markerDef(false);
        editDrawPath(datas.path);
        pathEvent.dragPath(true);
        pathEvent.rightClickPath(true);
    })
}

