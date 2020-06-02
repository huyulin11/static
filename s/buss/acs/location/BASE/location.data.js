import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.tool.js";

export var datas = {};

datas.clashArea = [];
datas.udfPoints = [];
datas.yfc = [];
datas.yfcs = [];
datas.logic = [];
datas.locations = [];
datas.taskDetails = [];
datas.datasetMap = [];
datas.currentAgvs = [];
datas.lastTaskPath = [];

var inArr = function (d, arr) {
    if (arr == null || arr.length == 0) { return false; }
    for (var a in arr) {
        if (arr[a][0] == d[0] && arr[a][1] == d[1]) {
            return true;
        }
    }
    return false;
}

datas.inAgv = function (d, num) {
    return inArr(d, datas.datasetMap[num]);
}

datas.inTaskPath = function (d) {
    return inArr(d, datas.lastTaskPath);
}

datas.inUdp = function (d) {
    return inArr(d, datas.udfPoints);
}

var dataLlogic = function (data) {
    for (var val of data) {
        datas.logic.push({ "siteid": val.siteid, "nextid": val.nextid });
    }
}

var dataLocation = function (data) {
    for (var val of data) {
        datas.udfPoints.push([val.x, val.y]);
        datas.locations.push({ "id": val.id, "x": val.x, "y": val.y });
        for (var value of datas.logic) {
            if (val.id === value.siteid) {
                for (var next of data) {
                    if (value.nextid === next.id) {
                        datas.yfc.push({
                            "leftXaxis": val.x,
                            "rightXaxis": next.x,
                            "downYaxis": val.y,
                            "upYaxis": next.y,
                            color: conf.initColor
                        });
                        break;
                    }
                }
            }
        }
    }
}

var dataPath = function (data) {
    if (datas.logic && datas.locations) {
        conf.currentTasks = 0;
        datas.yfcs = [];
        datas.taskDetails = Object.keys(data);
        for (var i = 1; i < datas.taskDetails.length; i++) {
            var object = data[datas.taskDetails[i]].currentTask.object;
            if (object) {
                conf.currentTasks++;
                datas.currentAgvs.push(datas.taskDetails[i]);
                setTimeout(function () {
                    datas.yfcs = [];
                    for (var val of object.detail) {
                        if (val.siteid === object.detail[object.detail.length - 1].siteid) {
                            datas.yfcs.push({ color: tool.color(val, object) });
                            break;
                        }
                        for (var loca of datas.locations) {
                            if (val.siteid === loca.id) {
                                for (var value of datas.logic) {
                                    if (val.siteid === value.siteid) {
                                        for (var valnext of object.detail) {
                                            if (value.nextid === valnext.siteid) {
                                                for (var next of datas.locations) {
                                                    if (value.nextid === next.id) {
                                                        var yfcsRepeat = false;
                                                        datas.yfcs.some(function (tasks) {
                                                            if (tasks.leftXaxis === next.x && tasks.downYaxis === next.y) {
                                                                yfcsRepeat = true;
                                                                return true;
                                                            }
                                                        });
                                                        if (yfcsRepeat) { break; }
                                                        datas.yfcs.push({
                                                            "leftXaxis": loca.x,
                                                            "rightXaxis": next.x,
                                                            "downYaxis": loca.y,
                                                            "upYaxis": next.y,
                                                            "aspectXaxis": (loca.x + next.x) / 2,
                                                            "aspectYaxis": (loca.y + next.y) / 2,
                                                            color: tool.color(val, object)
                                                        });
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }
                }, (conf.currentTasks - 1) * 3000);
            }
        }
    }
}

var taskSiteLogic = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLogic.json",
        type: "get",
        async: false,
        dataType: "json",
        success: dataLlogic
    });
}

var taskSiteLocation = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLocation.json",
        type: "get",
        async: false,
        dataType: "json",
        success: dataLocation
    });
}

var taskPath = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/agv/agvInfo0.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (data) {
            dataPath(data);
            if (conf.currentTasks == 0) {
                setTimeout(taskPath, 3000);
            } else {
                setTimeout(taskPath, conf.currentTasks * 3000);
            }
        }
    });
}

datas.init = function () {
    taskSiteLogic();
    taskSiteLocation();
    taskPath();
}