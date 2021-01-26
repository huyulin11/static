import { cirFunc } from "/s/buss/acs/location/point/point.stack.js";
import { pathFunc } from "/s/buss/acs/location/path/path.stack.js";
import { rectFunc } from "/s/buss/acs/location/rect/rect.stack.js";

export var undoStack = [];
export var redoStack = [];
var undoStackLenth;
var redoStackLenth;

export var keyFun = function () {
    d3.select('body').on('keydown', function () {
        undoStackLenth = undoStack.length;
        redoStackLenth = redoStack.length;
        if (d3.event.ctrlKey == true && d3.event.keyCode == 90 && undoStackLenth > 0) {
            var pop = undoStack.pop();
            redoStack.push(pop);
            switch (pop.name) {
                case 'circleadd': cirFunc.undoCircleAdd(pop.id); break;
                case 'circledrag': cirFunc.undoCircleDrag(pop); break;
                case 'circledel': cirFunc.undoCircleDel(pop); break;
                case 'circleupdate': cirFunc.undoCircleUpdate(pop); break;
                case 'pathadd': pathFunc.undoPathAdd(pop.path); break;
                case 'pathdrag': pathFunc.undoPathDrag(pop); break;
                case 'pathchangesize': pathFunc.undoPathChangeSize(pop); break;
                case 'pathdel': pathFunc.undoPathDel(pop.value); break;
                case 'rectadd': rectFunc.undoRectAdd(pop); break;
                case 'rectdel': rectFunc.undoRectDel(pop.rect); break;
                case 'rectedit': rectFunc.undoRectEdit(pop.oldrect); break;
                case 'rectchangeloacation': rectFunc.undoRectChangeLocation(pop.oldrect); break;
                case 'rectchangesize': rectFunc.undoRectChangeSize(pop.oldrect); break;
            };
        } else if (d3.event.ctrlKey == true && d3.event.keyCode == 89 && redoStackLenth > 0) {
            var pop = redoStack.pop();
            undoStack.push(pop);
            switch (pop.name) {
                case 'circleadd': cirFunc.redoCircleAdd(pop); break;
                case 'circledrag': cirFunc.redoCircleDrag(pop); break;
                case 'circledel': cirFunc.redoCircleDel(pop); break;
                case 'circleupdate': cirFunc.redoCircleUpdate(pop); break;
                case 'pathadd': pathFunc.redoPathAdd(pop.path); break;
                case 'pathdrag': pathFunc.redoPathDrag(pop); break;
                case 'pathchangesize': pathFunc.redoPathChangeSize(pop); break;
                case 'pathdel': pathFunc.redoPathDel(pop.value); break;
                case 'rectadd': rectFunc.redoRectAdd(pop); break;
                case 'rectdel': rectFunc.redoRectDel(pop.rect); break;
                case 'rectedit': rectFunc.redoRectEdit(pop.newrect); break;
                case 'rectchangeloacation': rectFunc.redoRectChangeLocation(pop.newrect); break;
                case 'rectchangesize': rectFunc.redoRectChangeSize(pop.newrect); break;
            }
        }
    })
}