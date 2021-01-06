var width = $(window).width();
var height = $(window).height();//width * (domainYVal[1] - domainYVal[0]) / (domainXVal[1] - domainXVal[0]) * 4;
var svg = d3.select("body").select("#coordinate").append("svg").attr("width", width).attr("fill", "white").attr("height", height);
var pathHome1 = svg.append('g').attr("id", "pathHome1");
var pathHome2 = svg.append('g').attr("id", "pathHome2");
var pathHome3 = svg.append('g').attr("id", "pathHome3");
var pointHome = svg.append('g').attr("id", "pointHome");
var defsHome = svg.append('g').attr("id", "defsHome");
var textHome = svg.append('g').attr("id", "textHome");
var agvHome = svg.append('g').attr("id", "agvHome");
var rectHome = svg.append('g').attr("id", "rectHome");
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
    pathHome1: pathHome1,
    pathHome2: pathHome2,
    pathHome3: pathHome3,
    pointHome: pointHome,
    defsHome, defsHome,
    textHome: textHome,
    agvHome: agvHome,
    rectHome: rectHome
}