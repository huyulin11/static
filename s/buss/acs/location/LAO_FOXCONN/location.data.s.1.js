var lastTaskPath = [];
var datasetMap = {};
var datasetDetaMap = {};
var receivedTaskData = "false";
var clashArea;
var udp = [];
var yfc = [];
var yfcs = [];
var logic = [];
var locations = [];
var isLogic = false;
var isLocations = false;
var taskDetails = [];
var currentTasks;
var currentAgvs;
var initColor = "#ddd";

var logicSuccess = function (data) {
    for (var val of data) {
        logic.push({ "siteid": val.siteid, "nextid": val.nextid });
    }
    isLogic = true;
}

var locationSuccess = function (data) {
    for (var val of data) {
        udp.push([val.x, val.y]);
        locations.push({ "id": val.id, "x": val.x, "y": val.y });
        for (var value of logic) {
            if (val.id === value.siteid) {
                for (var next of data) {
                    if (value.nextid === next.id) {
                        yfc.push({
                            "leftXaxis": val.x,
                            "rightXaxis": next.x,
                            "downYaxis": val.y,
                            "upYaxis": next.y,
                            color: initColor
                        });
                        break;
                    }
                }
            }
        }
    }
    isLocations = true;
}

var pathSuccess = function (data) {
    if (isLogic && isLocations) {
        currentTasks = 0;
        currentAgvs = [];
        yfcs = [];
        taskDetails = Object.keys(data);
        for (var i = 1; i < taskDetails.length; i++) {
            var object = data[taskDetails[i]].currentTask.object;
            if (object) {
                currentTasks++;
                currentAgvs.push(taskDetails[i]);
                (function (object, currentTasks) {
                    setTimeout(function () {
                        yfcs = [];
                        for (var val of object.detail) {
                            if (val.siteid === object.detail[object.detail.length - 1].siteid) {
                                yfcs.push({ color: color(val, object) });
                                break;
                            }
                            for (var loca of locations) {
                                if (val.siteid === loca.id) {
                                    for (var value of logic) {
                                        if (val.siteid === value.siteid) {
                                            for (var valnext of object.detail) {
                                                if (value.nextid === valnext.siteid) {
                                                    for (var next of locations) {
                                                        if (value.nextid === next.id) {
                                                            var yfcsRepeat = false;
                                                            yfcs.some(function (tasks) {
                                                                if (tasks.leftXaxis === next.x && tasks.downYaxis === next.y) {
                                                                    yfcsRepeat = true;
                                                                    return true;
                                                                }
                                                            });
                                                            if (yfcsRepeat) { break; }
                                                            yfcs.push({
                                                                "leftXaxis": loca.x,
                                                                "rightXaxis": next.x,
                                                                "downYaxis": loca.y,
                                                                "upYaxis": next.y,
                                                                "aspectXaxis": (loca.x + next.x) / 2,
                                                                "aspectYaxis": (loca.y + next.y) / 2,
                                                                color: color(val, object)
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
                })(object, currentTasks);
            }
        }
    }

    if (currentTasks == 0) {
        setTimeout(taskPath, 3000);
    } else {
        setTimeout(taskPath, currentTasks * 3000);
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

taskSiteLogic();
taskSiteLocation();
taskPath();

var rectPoint = [
    [-21650, 3500], [-21650, -4600], [-3650, -4600], [-3650, 3500]
];
var testInitPoint = {
    "4": [-42000, -12000], "5": [-44000, -12000],
    "6": [-46000, -12000], "7": [-48000, -12000],
    "8": [-50000, -12000], "9": [-52000, -12000],
    "10": [-54000, -12000]
}

var domainYVal = [-1700, 100];
var domainXVal = [-100, 3000];


// var yfc = [
//     { "leftXaxis": 117115200, "rightXaxis": 117115700, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼1" },
//     { "leftXaxis": 117116000, "rightXaxis": 117116500, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼2" },
//     { "leftXaxis": 119790530, "rightXaxis": 119791250, "downYaxis": 31251050, "upYaxis": 31251350, "title": "16号楼", color: "red" },
//     { "leftXaxis": 119791530, "rightXaxis": 119792250, "downYaxis": 31251050, "upYaxis": 31251350, "title": "17号楼", color: "red" },
//     { "leftXaxis": 119792530, "rightXaxis": 119793300, "downYaxis": 31251050, "upYaxis": 31251350, "title": "18号楼", color: "red" },
//     { "leftXaxis": 119793480, "rightXaxis": 119794300, "downYaxis": 31251050, "upYaxis": 31251350, "title": "19号楼", color: "red" },
//     { "leftXaxis": 119790530, "rightXaxis": 119791250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "12号楼", color: "red" },
//     { "leftXaxis": 119791530, "rightXaxis": 119792250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "13号楼", color: "red" },
//     { "leftXaxis": 119792530, "rightXaxis": 119793300, "downYaxis": 31251500, "upYaxis": 31251900, "title": "14号楼", color: "red" },
//     { "leftXaxis": 119793480, "rightXaxis": 119794300, "downYaxis": 31251500, "upYaxis": 31251900, "title": "15号楼", color: "yellow" }
// ];