var agvsColor = {
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

export var inAgv = function (d, num) {
    return inArr(d, datasetMap[num]);
}

export var inTaskPath = function (d) {
    return inArr(d, lastTaskPath);
}

export var inUdp = function (d) {
    return inArr(d, udp);
}

export var color = function (val, object) {
    if (val.opflag == "OVER") { return agvsColor.path };
    return agvsColor["agv" + object.agvId];
}

export var getColor = function (d) {
    if (inUdp(d)) {
        return agvsColor.point;
    }
    for (let i = 1; i <= 10; i++) {
        if (inAgv(d, i)) {
            return agvsColor["agv" + i];
        }
    }
    if (inTaskPath(d)) { return agvsColor.path; }
    return "#000";
}

$("body").append("<div id='msgOfAgv' style='display:none;color:white;position:fixed;right:2%;top:20%;'></div>");
for (i in agvsColor) {
    if (i.startsWith("agv")) {
        $("div#msgOfAgv").append("<span style='color:" + agvsColor[i] + ";'>" + i + "----" + "</span><br/>");
    }
}