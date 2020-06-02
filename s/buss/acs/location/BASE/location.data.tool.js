import { conf } from "/s/buss/acs/location/BASE/location.data.conf.js";

export var tool = {};
tool.udfPoints = [];
tool.lastTaskPath = [];

tool.agvsColor = {
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

var inArr = function (d, arr) {
    if (arr == null || arr.length == 0) { return false; }
    for (var a in arr) {
        if (arr[a][0] == d[0] && arr[a][1] == d[1]) {
            return true;
        }
    }
    return false;
}

tool.inAgv = function (d, num) {
    return inArr(d, conf.datasetMap[num]);
}

tool.inTaskPath = function (d) {
    return inArr(d, tool.lastTaskPath);
}

tool.inUdp = function (d) {
    return inArr(d, tool.udfPoints);
}

tool.color = function (val, object) {
    if (val.opflag == "OVER") { return tool.agvsColor.path };
    return tool.agvsColor["agv" + object.agvId];
}

tool.getColor = function (d) {
    if (tool.inUdp(d)) {
        return tool.agvsColor.point;
    }
    for (let i = 1; i <= 10; i++) {
        if (inAgv(d, i)) {
            return tool.agvsColor["agv" + i];
        }
    }
    if (inTaskPath(d)) { return tool.agvsColor.path; }
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
for (let i in tool.agvsColor) {
    if (i.startsWith("agv")) {
        $("div#msgOfAgv").append("<span style='color:" + tool.agvsColor[i] + ";'>" + i + "----" + "</span><br/>");
    }
}