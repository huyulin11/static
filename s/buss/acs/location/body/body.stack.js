import { cirFunc } from "/s/buss/acs/location/point/point.stack.js";
import { pathFunc } from "/s/buss/acs/location/path/path.stack.js";
import { rectFunc } from "/s/buss/acs/location/rect/rect.stack.js";

export var bodyFunc = {};

bodyFunc.undoSelectorDel = function (datas) {
    for (let i of datas) {
        switch (i.name) {
            case 'circledel': cirFunc.undoCircleDel(i); break;
            case 'pathdel': pathFunc.undoPathDel(i.value); break;
            case 'rectdel': rectFunc.undoRectDel(i.rect); break;
        };
    }
}

bodyFunc.redoSelectorDel = function (datas) {
    for (let i of datas) {
        switch (i.name) {
            case 'circledel': cirFunc.redoCircleDel(i); break;
            case 'pathdel': pathFunc.redoPathDel(i.value); break;
            case 'rectdel': rectFunc.redoRectDel(i.rect); break;
        };
    }
}