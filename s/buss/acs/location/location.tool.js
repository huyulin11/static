import { datas } from "/s/buss/acs/location/location.data.js";
import { conf } from "/s/buss/acs/location/location.conf.js";

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
    return inArr(d, datas.udfPoints);
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

tool.windowToDB = function (id, x, y) {
    var ids = parseInt(id);
    var x1 = tool.xnumToDB(x);
    var y1 = tool.ynumToDb(y);
    var result = { "id": ids, "x": x1, "y": y1 };
    console.log(result);
    return result;
}

tool.xnumToDB = function (x) {
    return conf.xReScale(x - conf.padding.left);
}

tool.ynumToDb = function (y) {
    return conf.yReScale(conf.height - conf.padding.bottom - y);
}

tool.dbToWindow = function (x1, y1) {
    var x = tool.xnumToWindow(x1);
    var y = tool.ynumToWindow(y1);
    var result = [x, y];
    return result;
}

tool.xnumToWindow = function (x) {
    return conf.padding.left + conf.xScale(x);
}

tool.ynumToWindow = function (y) {
    return conf.height - conf.padding.bottom - conf.yScale(y);
}