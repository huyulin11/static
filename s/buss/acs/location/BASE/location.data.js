import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { tool } from "/s/buss/acs/location/BASE/location.tool.js";
import { taskSiteLogic, taskSiteLocation, taskSiteRect } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { allAgvsInfo } from "/s/buss/acs/g/j/agv.msg.json.js";

export var datas = {};
datas.agvLocation = [];
let datasLogic = [];

var rectPoint = [
    [-21650, 3500], [-21650, -4600], [-3650, -4600], [-3650, 3500]
];
var testInitPoint = {
    "4": [-42000, -12000], "5": [-44000, -12000],
    "6": [-46000, -12000], "7": [-48000, -12000],
    "8": [-50000, -12000], "9": [-52000, -12000],
    "10": [-54000, -12000]
}

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
        datasLogic.push({ "siteid": val.siteid, "nextid": val.nextid });
    }
}

export var dataLocation = function (data) {
    for (var val of data) {
        datas.udfPoints.push([val.id, val.x, val.y]);
        datas.locations.push({ "id": val.id, "x": val.x, "y": val.y });
        datas.id.push({ "id": val.id });
        for (var value of datasLogic) {
            if (val.id === value.siteid) {
                for (var next of data) {
                    if (value.nextid === next.id) {
                        datas.point.push({
                            "id": val.id + "" + next.id,
                            "from": val.id,
                            "to": next.id,
                            "leftXaxis": val.x,
                            "rightXaxis": next.x,
                            "downYaxis": val.y,
                            "upYaxis": next.y,
                            "isDouble": false,
                            color: conf.initColor
                        });
                        break;
                    }
                }
            }
        }
    }
    for (let i of datas.point) {
        var flag = datas.point.filter((ii) => ii.from == i.to && ii.to == i.from && ii.isDouble == false).length > 0;
        if (flag) {
            i.isDouble = true;
        }
    }
}

var dataPath = function (data) {
    if (datasLogic && datas.locations) {
        datas.numInTask = 0;
        datas.path = [];
        datas.taskDetails = Object.keys(data);
        for (var i = 1; i < datas.taskDetails.length; i++) {
            var object = data[datas.taskDetails[i]].currentTask.object;
            if (object) {
                datas.numInTask++;
                datas.currentAgvs.push(datas.taskDetails[i]);
                setTimeout(function () {
                    datas.path = [];
                    for (var val of object.detail) {
                        if (val.siteid === object.detail[object.detail.length - 1].siteid) {
                            datas.path.push({ color: tool.color(val, object) });
                            break;
                        }
                        for (var loca of datas.locations) {
                            if (val.siteid === loca.id) {
                                for (var value of datasLogic) {
                                    if (val.siteid === value.siteid) {
                                        for (var valnext of object.detail) {
                                            if (value.nextid === valnext.siteid) {
                                                for (var next of datas.locations) {
                                                    if (value.nextid === next.id) {
                                                        var yfcsRepeat = false;
                                                        datas.path.some(function (tasks) {
                                                            if (tasks.leftXaxis === next.x && tasks.downYaxis === next.y) {
                                                                yfcsRepeat = true;
                                                                return true;
                                                            }
                                                        });
                                                        if (yfcsRepeat) { break; }
                                                        datas.path.push({
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
                }, (datas.numInTask - 1) * 3000);
            }
        }
    }
}

export let allAgvsInfoTmp = () => allAgvsInfo(function (data) {
    dataPath(data);
    if (datas.numInTask == 0) {
        setTimeout(allAgvsInfoTmp, 3000);
    } else {
        setTimeout(allAgvsInfoTmp, datas.numInTask * 3000);
    }
});

export let dataAgvLocation = () => allAgvsInfo(function (data) {
    datas.agvLocation = [];
    datas.taskDetails = Object.keys(data);
    for (var i = 1; i < datas.taskDetails.length; i++) {
        var currentsite = data[datas.taskDetails[i]].agvInfo.currentsite;
        var object = data[datas.taskDetails[i]].currentTask.object;
        if (object) {
            for (var detail of object.detail) {
                if (detail.siteid == currentsite && detail.opflag != 'NEW') {
                    var isNextsite = false;
                    for (var detail2 of object.detail) {
                        if (detail.detailsequence + 1 == detail2.detailsequence && detail2.opflag == 'NEW') {
                            var nextsite = detail2.siteid;
                            isNextsite = true;
                            break;
                        }
                    }
                    if (isNextsite)
                        break;
                }
            }
            for (var current of datas.locations) {
                if (current.id == currentsite) {
                    for (var next of datas.locations) {
                        if (next.id == nextsite) {
                            datas.agvLocation.push({
                                "isWorking": true,
                                "currentsite": currentsite,
                                "currentX": current.x,
                                "currentY": current.y,
                                "nextX": next.x,
                                "nextY": next.y
                            })
                            break;
                        }
                    }
                    break;
                }
            }
        } else {
            for (var current of datas.locations) {
                if (current.id == currentsite) {
                    datas.agvLocation.push({
                        "isWorking": false,
                        "currentsite": currentsite,
                        "currentX": current.x,
                        "currentY": current.y
                    })
                    break;
                }
            }
        }
    }
});

var dataRect = function (data) {
    var arr = [];
    for (var val of data) {
        arr.push([val.id]);
        datas.rect.push({
            'id': val.id, 'x': val.x, 'y': val.y, 'width': val.width, 'height': val.height, 'buildname': val.buildname
        });
    }
    datas.rectid = arr.sort(function (a, b) {
        return a - b;
    });
}

datas.init = function () {
    // $(".aspect").remove();
    // $("defs").remove();
    // $("image").remove();
    // $(".clashLine").remove();
    // $(".mainRoad").remove();
    datas.clashArea = [];
    datas.udfPoints = [];
    datas.point = [];
    datas.path = [];
    datasLogic = [];
    datas.locations = [];
    datas.taskDetails = [];
    datas.datasetMap = [];
    datas.currentAgvs = [];
    datas.lastTaskPath = [];
    datas.id = [];
    datas.rect = [];
    datas.rectid = [];
    taskSiteRect(dataRect);
    taskSiteLogic(dataLlogic);
    taskSiteLocation(dataLocation);
}