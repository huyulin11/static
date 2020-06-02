import { conf } from "/s/buss/acs/location/BASE/location.data.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.data.tool.js";

var logicSuccess = function (data) {
    for (var val of data) {
        conf.logic.push({ "siteid": val.siteid, "nextid": val.nextid });
    }
    conf.isLogic = true;
}

var locationSuccess = function (data) {
    for (var val of data) {
        tool.udfPoints.push([val.x, val.y]);
        conf.locations.push({ "id": val.id, "x": val.x, "y": val.y });
        for (var value of conf.logic) {
            if (val.id === value.siteid) {
                for (var next of data) {
                    if (value.nextid === next.id) {
                        conf.yfc.push({
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
    conf.isLocations = true;
}

var pathSuccess = function (data) {
    if (conf.isLogic && conf.isLocations) {
        conf.currentTasks = 0;
        conf.yfcs = [];
        conf.taskDetails = Object.keys(data);
        for (var i = 1; i < conf.taskDetails.length; i++) {
            var object = data[conf.taskDetails[i]].currentTask.object;
            if (object) {
                conf.currentTasks++;
                conf.currentAgvs.push(conf.taskDetails[i]);
                (function (object, currentTasks) {
                    setTimeout(function () {
                        conf.yfcs = [];
                        for (var val of object.detail) {
                            if (val.siteid === object.detail[object.detail.length - 1].siteid) {
                                conf.yfcs.push({ color: tool.color(val, object) });
                                break;
                            }
                            for (var loca of conf.locations) {
                                if (val.siteid === loca.id) {
                                    for (var value of conf.logic) {
                                        if (val.siteid === value.siteid) {
                                            for (var valnext of object.detail) {
                                                if (value.nextid === valnext.siteid) {
                                                    for (var next of conf.locations) {
                                                        if (value.nextid === next.id) {
                                                            var yfcsRepeat = false;
                                                            conf.yfcs.some(function (tasks) {
                                                                if (tasks.leftXaxis === next.x && tasks.downYaxis === next.y) {
                                                                    yfcsRepeat = true;
                                                                    return true;
                                                                }
                                                            });
                                                            if (yfcsRepeat) { break; }
                                                            conf.yfcs.push({
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
                    }, (currentTasks - 1) * 3000);
                })(object, conf.currentTasks);
            }
        }
    }

    if (conf.currentTasks == 0) {
        setTimeout(taskPath, 3000);
    } else {
        setTimeout(taskPath, conf.currentTasks * 3000);
    }
}

var taskSiteLogic = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLogic.json",
        type: "get",
        async: false,
        dataType: "json",
        success: logicSuccess
    });
}

var taskSiteLocation = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLocation.json",
        type: "get",
        async: false,
        dataType: "json",
        success: locationSuccess
    });
}

var taskPath = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/agv/agvInfo0.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: pathSuccess
    });
}

export { taskSiteLogic, taskSiteLocation, taskPath }