import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

let agvsColor = {
    point: "red",
    agv1: "blue",
    agv2: "brown",
    agv3: "green",
    agv4: "#F0F",
    agv5: "#0BF",
    agv6: "#C4B661",
    agv7: "#C71585",
    agv8: "#483D8B",
    agv9: "#2EEB57",
    agv10: "#FFCB20",
    agv11: "#FFCB20",
    agv12: "#FFCB20",
    agv13: "#FFCB20",
    agv14: "#FFCB20",
    agv15: "#FFCB20",
    agv16: "#FFCB20",
    path: "gray"
};

export var tool = {};

tool.color = function (val, object) {
    if (val.opflag == "OVER") { return agvsColor.path };
    return tool.getAgvColor(object.agvId);
}

tool.getAgvColor = function (num) {
    return agvsColor["agv" + num];
}

tool.getPointColor = function (num) {
    return agvsColor.point;
}

tool.getColor = function (d) {
    if (datas.inUdp(d)) {
        return agvsColor.point;
    }
    for (let i = 1; i <= 16; i++) {
        if (inAgv(d, i)) {
            return tool.getAgvColor(i);
        }
    }
    if (inTaskPath(d)) { return agvsColor.path; }
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
for (let i in agvsColor) {
    if (i.startsWith("agv")) {
        $("div#msgOfAgv").append("<span style='color:" + agvsColor[i] + ";'>" + i + "----" + "</span><br/>");
    }
}