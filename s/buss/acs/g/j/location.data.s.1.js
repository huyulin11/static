var lastTaskPath = [];
var datasetMap = {};
var datasetDetaMap = {};
var receivedTaskData = "false";
var clashArea;

var agvsColor = {
    point: "red",
    agv1: "blue",
    agv2: "pink",
    agv3: "green",
    agv4: "#F0F",
    agv5: "#0FF",
    agv6: "#FFB6C1",
    agv7: "#C71585",
    agv8: "#483D8B",
    agv9: "#2E8B57",
    agv10: "#FFD700",
    path: "gray"
};

var udp;
if ("AHYF2" == "AHYF") {
    udp = [];
} else {
    udp = [
        [0, 0], [-13570, -9000], [-10750, -9000], [-6650, -9000],
        [-27750, -15665], [-27750, -20700], [-27750, -18000]
    ];
}

var rectPoint = [
    [-21650, 3500], [-21650, -4600], [-3650, -4600], [-3650, 3500]
];
var testInitPoint = {
    "4": [-42000, -12000], "5": [-44000, -12000],
    "6": [-46000, -12000], "7": [-48000, -12000],
    "8": [-50000, -12000], "9": [-52000, -12000],
    "10": [-54000, -12000]
}

var inAgv1 = function (d) {
    return inArr(d, datasetMap[1]);
}

var inAgv2 = function (d) {
    return inArr(d, datasetMap[2]);
}

var inAgv3 = function (d) {
    return inArr(d, datasetMap[3]);
}

var inAgv4 = function (d) {
    return inArr(d, datasetMap[4]);
}

var inAgv5 = function (d) {
    return inArr(d, datasetMap[5]);
}

var inAgv6 = function (d) {
    return inArr(d, datasetMap[6]);
}

var inAgv7 = function (d) {
    return inArr(d, datasetMap[7]);
}

var inAgv8 = function (d) {
    return inArr(d, datasetMap[8]);
}

var inAgv9 = function (d) {
    return inArr(d, datasetMap[9]);
}

var inAgv10 = function (d) {
    return inArr(d, datasetMap[10]);
}

var inTaskPath = function (d) {
    return inArr(d, lastTaskPath);
}

var inUdp = function (d) {
    return inArr(d, udp);
}

var inArr = function (d, arr) {
    if (arr == null || arr.length == 0) { return false; }
    for (var a in arr) {
        if (arr[a][0] == d[0] && arr[a][1] == d[1]) {
            return true;
        }
    }
    return false;
}

var getColor = function (d) {
    if (inUdp(d)) {
        return agvsColor.point;
    } else if (inAgv1(d)) {
        return agvsColor.agv1;
    } else if (inAgv2(d)) {
        return agvsColor.agv2;
    } else if (inAgv3(d)) {
        return agvsColor.agv3;
    } else if (inAgv4(d)) {
        return agvsColor.agv4;
    } else if (inAgv5(d)) {
        return agvsColor.agv5;
    } else if (inAgv6(d)) {
        return agvsColor.agv6;
    } else if (inAgv7(d)) {
        return agvsColor.agv7;
    } else if (inAgv8(d)) {
        return agvsColor.agv8;
    } else if (inAgv9(d)) {
        return agvsColor.agv9;
    } else if (inAgv10(d)) {
        return agvsColor.agv10;
    }
    if (inTaskPath(d)) { return agvsColor.path; }
    return "#000";
}

var domainYVal = [31250880, 31252130];
var domainXVal = [119790000, 119794420];


var yfc = [
    // { "leftXaxis": 117115200, "rightXaxis": 117115700, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼1" },
    // { "leftXaxis": 117116000, "rightXaxis": 117116500, "downYaxis": 31822600, "upYaxis": 31823000, "title": "习艺楼2" },
    { "leftXaxis": 119790530, "rightXaxis": 119791250, "downYaxis": 31251050, "upYaxis": 31251350, "title": "16号楼", color: "red" },
    { "leftXaxis": 119791530, "rightXaxis": 119792250, "downYaxis": 31251050, "upYaxis": 31251350, "title": "17号楼", color: "red" },
    { "leftXaxis": 119792530, "rightXaxis": 119793300, "downYaxis": 31251050, "upYaxis": 31251350, "title": "18号楼", color: "red" },
    { "leftXaxis": 119793480, "rightXaxis": 119794300, "downYaxis": 31251050, "upYaxis": 31251350, "title": "19号楼", color: "red" },
    { "leftXaxis": 119790530, "rightXaxis": 119791250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "12号楼", color: "red" },
    { "leftXaxis": 119791530, "rightXaxis": 119792250, "downYaxis": 31251500, "upYaxis": 31251900, "title": "13号楼", color: "red" },
    { "leftXaxis": 119792530, "rightXaxis": 119793300, "downYaxis": 31251500, "upYaxis": 31251900, "title": "14号楼", color: "red" },
    { "leftXaxis": 119793480, "rightXaxis": 119794300, "downYaxis": 31251500, "upYaxis": 31251900, "title": "15号楼", color: "yellow" }
]
