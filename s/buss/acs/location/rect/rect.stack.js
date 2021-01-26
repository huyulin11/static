import { crateRect, delRect, editBuildName } from "/s/buss/acs/location/url/rect.url.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { rightClickRect } from "/s/buss/acs/location/rect/rect.rightclick.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/rect/drag.rect.js";
import { mouseStyle, bankDefaultEvent } from "/s/buss/acs/location/rect/rect.event.js";
import { drawRect } from "/s/buss/acs/location/rect/draw.rect.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

export var rectFunc = {};

rectFunc.undoRectEdit = function (rect) {

}

rectFunc.redoRectEdit = function (rect) {

}

rectFunc.undoRectDel = function (rect) {
    crateRect(rect.id, tool.xnumToWindow(rect.x), tool.ynumToWindow(rect.y), rect.width, rect.height, () => {
        drawRect(datas.rect);
        bankDefaultEvent();
        rightClickRect(true);
        mouseStyle(true)
        dragDashRect(true);
        dragDashCircle(true);
    }, rect.buildname);
}

rectFunc.redoRectDel = function (rect) {
    delRect(rect.id, () => {
        d3.select('#rect' + rect.id).remove();
        d3.select("#retext" + rect.id).remove();
        d3.selectAll('#dashC' + rect.id).remove();
    });
}

rectFunc.undoRectAdd = function (pop) {
    delRect(pop.id, () => {
        d3.select('#rect' + pop.id).remove();
        d3.select("#retext" + pop.id).remove();
        d3.selectAll('#dashC' + pop.id).remove();
    });
}

rectFunc.redoRectAdd = function (pop) {
    crateRect(pop.id, pop.x, pop.y, 20, 20, () => {
        drawRect(datas.rect);
        bankDefaultEvent();
        rightClickRect(true);
        mouseStyle(true)
        dragDashRect(true);
        dragDashCircle(true);
    });
}