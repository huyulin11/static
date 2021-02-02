import { crateRect, delRect, editBuildName } from "/s/buss/acs/location/url/rect.url.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { drawRect } from "/s/buss/acs/location/rect/draw.rect.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { rightClickRect } from "/s/buss/acs/location/rect/rect.rightclick.js";
import { dragDashRect, dragDashCircle } from "/s/buss/acs/location/rect/drag.rect.js";
import { mouseStyle, delBankDash } from "/s/buss/acs/location/rect/rect.event.js";

export var rectFunc = {};

rectFunc.undoRectChangeSize = function (rect) {
    editBuildName(rect.id, rect, () => {
        drawRect(datas.rect);
    })
}

rectFunc.redoRectChangeSize = function (rect) {
    editBuildName(rect.id, rect, () => {
        drawRect(datas.rect);
    })
}

rectFunc.undoRectChangeLocation = function (rect) {
    editBuildName(rect.id, rect, () => {
        drawRect(datas.rect);
    })
}

rectFunc.redoRectChangeLocation = function (rect) {
    editBuildName(rect.id, rect, () => {
        drawRect(datas.rect);
    })
}

rectFunc.undoRectEdit = function (rect) {
    editBuildName(rect.id, rect, () => {
        d3.select('#retext' + rect.id).text(rect.buildname);
        d3.selectAll('.changeCircle').style('display', 'none');
    })
}

rectFunc.redoRectEdit = function (rect) {
    editBuildName(rect.id, rect, () => {
        d3.select('#retext' + rect.id).text(rect.buildname);
        d3.selectAll('.changeCircle').style('display', 'none');
    })
}

rectFunc.undoRectDel = function (rect) {
    crateRect(rect.id, tool.xnumToWindow(rect.x), tool.ynumToWindow(rect.y), rect.width, rect.height, () => {
        drawRect(datas.rect);
        rightClickRect(true);
        dragDashRect(true);
        dragDashCircle(true);
        mouseStyle();
        delBankDash();
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
        rightClickRect(true);
        dragDashRect(true);
        dragDashCircle(true);
        mouseStyle();
        delBankDash();
    });
}