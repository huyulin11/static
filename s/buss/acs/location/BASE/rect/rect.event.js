import { addRect } from "/s/buss/acs/location/BASE/rect/rect.add.js";
import { rightClickRect } from "/s/buss/acs/location/BASE/rect/rect.rightclick.js";
import { changeRect } from "/s/buss/acs/location/BASE/rect/click.rect.js";

export var rectEvent = function (flag) {
    rightClickRect(flag);
    addRect(flag);
    changeRect(flag);
    d3.selectAll('rect').on('dblclick', function () {
        d3.event.stopPropagation();
        return null;
    })
}
