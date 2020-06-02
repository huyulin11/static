var width = $(window).width();
var height = $(window).height();//width * (domainYVal[1] - domainYVal[0]) / (domainXVal[1] - domainXVal[0]) * 4;
var svg = d3.select("body").select("#coordinate").append("svg").attr("width", width).attr("fill", "white").attr("height", height);
var widthAgvs = $("#agvs").width();
var widthFixed = widthAgvs * 15 / 24;
var heightFixed = $("#agvs").height();
var svgFixed = d3.select("body").select("#agvs").append("svg").attr("width", widthFixed).attr("fill", "white").attr("height", heightFixed);

var padding = { left: 80, right: 30, top: 50, bottom: 100 };
var xAxisWidth = width - (padding.left + padding.right) * 2;
var yAxisWidth = height - (padding.bottom + padding.top) * 2;
var rectHeight = 200;

export var conf = {
    width: width,
    height: height,
    svg: svg,
    widthAgvs: widthAgvs,
    widthFixed: widthFixed,
    heightFixed: heightFixed,
    svgFixed: svgFixed,
    padding: padding,
    xAxisWidth: xAxisWidth,
    yAxisWidth: yAxisWidth,
    rectHeight: rectHeight,
    initColor: "#ddd",
    currentAgvs: [],
    locations: [],
    yfc: [],
    yfcs: [],

    receivedTaskData: "false",
    clashArea: null,

    logic: [],
    locations: [],
    isLogic: false,
    taskDetails: [],
    datasetMap: []
}

conf.udfPoints = [];
conf.lastTaskPath = [];

conf.agvsColor = {
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