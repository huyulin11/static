import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

export var windowToDB = function (id, x, y) {
    var ids = parseInt(id);
    var x1 = xnumToDB(x);
    var y1 = ynumToDb(y);
    var result = { "id": ids, "x": x1, "y": y1 };
    console.log(result);
    return result;
}

export var xnumToDB = function (x) {
    return conf.xReScale(x - conf.padding.left);
}

export var ynumToDb = function (y) {
    return conf.yReScale(conf.height - conf.padding.bottom - y);
}

export var dbToWindow = function (x1, y1) {
    var x = xnumToWindow(x1);
    var y = ynumToWindow(y1);
    var result = [x, y];
    return result;
}

export var xnumToWindow = function (x) {
    return conf.padding.left + conf.xScale(x);
}

export var ynumToWindow = function (y) {
    return conf.height - conf.padding.bottom - conf.yScale(y);
}