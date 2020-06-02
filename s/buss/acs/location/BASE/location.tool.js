import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

export var tool = {};

tool.color = function (val, object) {
    if (val.opflag == "OVER") { return conf.agvsColor.path };
    return conf.agvsColor["agv" + object.agvId];
}

tool.getColor = function (d) {
    if (datas.inUdp(d)) {
        return conf.agvsColor.point;
    }
    for (let i = 1; i <= 10; i++) {
        if (inAgv(d, i)) {
            return conf.agvsColor["agv" + i];
        }
    }
    if (inTaskPath(d)) { return conf.agvsColor.path; }
    return "#000";
}

tool.equals = function (arr1, arr2) {
    if (arr1 == null || arr2 == null) {
        return false;
    }
    if (arr1.length != arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1 != arr2) {
            return false;
        }
    }
    return true;
}

tool.randomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                && (color.length == 6) ? color : arguments.callee(color);
        })('');
};

$("body").append("<div id='msgOfAgv' style='display:none;color:white;position:fixed;right:2%;top:20%;'></div>");
for (let i in conf.agvsColor) {
    if (i.startsWith("agv")) {
        $("div#msgOfAgv").append("<span style='color:" + conf.agvsColor[i] + ";'>" + i + "----" + "</span><br/>");
    }
}