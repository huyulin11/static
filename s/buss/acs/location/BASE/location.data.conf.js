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
    rectHeight: rectHeight
}