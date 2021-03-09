var width = $(window).width();
var height = $(window).height();//width * (domainYVal[1] - domainYVal[0]) / (domainXVal[1] - domainXVal[0]) * 4;
var svg = d3.select("body").select("#coordinate")
    .append('div').attr('id', 'div_svg')
    .append("svg")
    .attr('id', 'coor_svg_one')
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#daf1db59")
    .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform);
        d3.select('svg').attr("transform", 'scale(' + d3.select('svg').property('__zoom').k + ")");
    })).append("g");
var rectHome = svg.append('g').attr("id", "rectHome");
var pathHome1 = svg.append('g').attr("id", "pathHome1");
var pathHome2 = svg.append('g').attr("id", "pathHome2");
var pathHome3 = svg.append('g').attr("id", "pathHome3");
var pointHome = svg.append('g').attr("id", "pointHome");
var defsHome = svg.append('g').attr("id", "defsHome");
var textHome = svg.append('g').attr("id", "textHome");
var pointTextHome = textHome.append('g').attr('id', 'pointTextHome');
var rectTextHome = textHome.append('g').attr('id', 'rectTextHome');
var rectPointHome = rectHome.append('g').attr('id', 'rectPointHome');
var agvHome = svg.append('g').attr("id", "agvHome");
var widthAgvs = $("#agvs").width();
var widthFixed = widthAgvs * 15 / 24;
var heightFixed = $("#agvs").height();
var svgFixed = d3.select("body").select("#agvs").append("svg").attr("width", widthFixed).attr("height", heightFixed).attr("fill", "white");

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
    pointTextHome: pointTextHome,
    rectTextHome: rectTextHome,
    rectPointHome: rectPointHome,
    agvHome: agvHome,
    rectHome: rectHome
}