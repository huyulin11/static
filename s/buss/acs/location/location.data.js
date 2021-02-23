import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { taskSiteLogic, taskSiteLocation, taskSiteRect } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { allAgvsInfo } from "/s/buss/acs/g/j/agv.msg.json.js";

export var datas = {};
datas.agvLocation = [];

datas.color = {
    point: "red",
    path: "gray",
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
    agv16: "#FFCB20"
};

var dataLogic = function (data) {
    for (var val of data) {
        datas.logic.push({ "siteid": val.siteid, "nextid": val.nextid });
    }
}

var dataLocation = function (data) {
    data.sort(function (a, b) { return a.id - b.id });
    for (var val of data) {
        datas.udfPoints.push([val.id, val.x, val.y]);
        datas.locations.push({ "id": val.id, "x": val.x, "y": val.y });
        datas.id.push({ "id": val.id });
        for (var logic of datas.logic) {
            if (val.id == logic.siteid) {
                for (var next of data) {
                    if (logic.nextid == next.id) {
                        datas.path.push({
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
    for (let i of datas.path) {
        var flag = datas.path.filter((ii) => ii.from == i.to && ii.to == i.from && ii.isDouble == false).length > 0;
        if (flag) {
            i.isDouble = true;
        }
    }
}

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
            'id': val.id, 'x1': val.x1, 'y1': val.y1, 'x2': val.x2, 'y2': val.y2, 'buildname': val.buildname
        });
    }
    datas.rectid = arr.sort(function (a, b) {
        return a - b;
    });
}

datas.init = function () {
    datas.logic = [];
    datas.udfPoints = [];
    datas.locations = [];
    datas.id = [];
    datas.path = [];
    datas.taskDetails = [];
    datas.currentAgvs = [];
    datas.datasetMap = [];
    datas.lastTaskPath = [];
    datas.rect = [];
    datas.rectid = [];
    taskSiteLogic(dataLogic);
    taskSiteLocation(dataLocation);
    taskSiteRect(dataRect);
}

export var init = function () {
    datas.init();
    conf.domainYVal = [-1700, 100];
    conf.domainXVal = [-100, 3000];
    conf.xScale = d3.scaleLinear().domain(conf.domainXVal).range([0, conf.xAxisWidth]);
    conf.yScale = d3.scaleLinear().domain(conf.domainYVal).range([0, conf.yAxisWidth]);
    conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
    conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);
}



var rectPoint = [[-21650, 3500], [-21650, -4600], [-3650, -4600], [-3650, 3500]];
var testInitPoint = {
    "4": [-42000, -12000], "5": [-44000, -12000], "6": [-46000, -12000], "7": [-48000, -12000]
};
var yfc = [
    { "leftXaxis": 117115200, "rightXaxis": 117115700, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼1" },
    { "leftXaxis": 117116000, "rightXaxis": 117116500, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼2" },
    { "leftXaxis": 119790530, "rightXaxis": 119791250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "12号楼", color: "red" },
    { "leftXaxis": 119791530, "rightXaxis": 119792250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "13号楼", color: "yellow" }
];

let allAgvsInfoTmp = () => allAgvsInfo(function (data) {
    dataPathBak(data);
    if (datas.numInTask == 0) {
        setTimeout(allAgvsInfoTmp, 3000);
    } else {
        setTimeout(allAgvsInfoTmp, datas.numInTask * 3000);
    }
});

var dataPathBak = function (data) {
    if (datas.logic && datas.locations) {
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
                                for (var value of datas.logic) {
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