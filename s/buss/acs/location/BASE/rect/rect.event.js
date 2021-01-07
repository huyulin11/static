import { addRect } from "/s/buss/acs/location/BASE/rect/rect.add.js";
import { rightClickRect } from "/s/buss/acs/location/BASE/rect/rect.rightclick.js";

export var rectEvent = function (flag) {
    rightClickRect(flag);
    addRect(flag);
} 