import { datas } from "/s/buss/acs/location/location.data.js";

export var tool = {};

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
    return inArr(d, datas.datasetMap[num]);
}

tool.inTaskPath = function (d) {
    return inArr(d, datas.lastTaskPath);
}

tool.inUdp = function (d) {
    return inArr(d, datas.udfPoints);//属于，当是数组一项是如何判断是数组子项，子项若为对象，一一判断里属性吗，java中对象的equals方法源码如何判断
}

tool.color = function (val, object) {
    if (val.opflag == "OVER") { return datas.color.path };
    return tool.getAgvColor(object.agvId);
}

tool.getAgvColor = function (num) {
    return datas.color["agv" + num];
}

tool.getPointColor = function (num) {
    return datas.color.point;
}

tool.getColor = function (d) {
    if (tool.inUdp(d)) {
        return datas.color.point;
    }
    for (let i = 1; i <= 16; i++) {
        if (tool.inAgv(d, i)) {
            return tool.getAgvColor(i);
        }
    }
    if (tool.inTaskPath(d)) { return datas.color.path; }
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