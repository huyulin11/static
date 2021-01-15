import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { tool } from "/s/buss/acs/location/location.tool.js";

var drawLine = function () {
    conf.svg.append("line")
        .attr("x1", conf.padding.left + conf.xScale(500))
        .attr("y1", conf.height - conf.padding.bottom - conf.yScale(10))
        .attr("x2", conf.padding.left + conf.xScale(800))
        .attr("y2", conf.height - conf.padding.bottom - conf.yScale(200))
        .style("stroke", "#333")
        .attr("class", "mainRoad")
        .style("stroke-width", "1px");
}

var renderAgvLocation = function () {
    $("image").remove();
    for (var location of datas.agvLocation) {
        conf.agvHome.append("image")
            .attr("x", tool.xnumToWindow(location.currentX) - 30)
            .attr("y", tool.ynumToWindow(location.currentY) - 30)
            .attr("width", 60)
            .attr("height", 60)
            .attr("xlink:href", "/s/i/agv.png")
    }
}

var arrow = function (arrow) {
    var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
    return arrow.attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "8")
        .attr("markerHeight", "8")
        .attr("viewBox", "0 0 12 12")
        .attr("refX", "6")
        .attr("refY", "6")
        .attr("orient", "auto")
        .append("path")
        .attr("d", arrow_path);
}

var rectAspect = function (aspect) {
    $(".aspect").remove();
    $("defs").remove();
    $("image").remove();
    if (aspect.length == 0) { return; }

    var defs = function () {
        return conf.svg.append("defs").append("marker");
    }

    var arrowMarkerGray = defs().attr("id", "gray");
    var arrowMarkerMultiple = defs().attr("id", "multiple");
    var arrowMarkerHere = defs().attr("id", "here");
    arrow(arrowMarkerGray).attr("fill", aspect[0].color);
    arrow(arrowMarkerMultiple).attr("fill", aspect[aspect.length - 1].color);
    arrow(arrowMarkerHere).attr("fill", tool.getPointColor());

    var line = function () {
        return conf.svg.append("line")
            .attr("x1", conf.padding.left + conf.xScale(aspect[a].leftXaxis))
            .attr("y1", conf.height - conf.padding.bottom - conf.yScale(aspect[a].downYaxis))
            .attr("x2", conf.padding.left + conf.xScale(aspect[a].aspectXaxis))
            .attr("y2", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis))
            .attr("y2", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis))
            .attr("class", "aspect")
            .style("stroke-width", "2px");
    }

    for (var a in aspect) {
        if (a == aspect.length - 1) { break; }
        if (aspect[a].color == aspect[0].color && aspect[a].color == aspect[parseInt(a) + 1].color) {
            line().style("stroke", aspect[parseInt(a) + 1].color)
                .attr("marker-end", "url(#gray)");
        } else if (aspect[a].color == aspect[0].color && aspect[a].color != aspect[parseInt(a) + 1].color) {
            conf.svg.append("image")
                .attr("x", conf.padding.left + conf.xScale(aspect[a].aspectXaxis) - 15)
                .attr("y", conf.height - conf.padding.bottom - conf.yScale(aspect[a].aspectYaxis) - 15)
                .attr("width", 30)
                .attr("height", 30)
                .attr("xlink:href", "/s/i/agv.png")
        } else if (aspect[a].color != aspect[0].color) {
            line().style("stroke", aspect[a].color)
                .attr("marker-end", "url(#multiple)");
        }
    }
}

var drawAgvs = function () {
    $(".agvLine").remove();
    $(".agvs").remove();

    for (var i = 1; i <= datas.numInTask; i++) {
        var agv = datas.currentAgvs[i - 1];
        var line = function () {
            return conf.svgFixed.append("line")
                .attr("x1", conf.widthFixed / 5)
                .attr("y1", conf.heightFixed * i / (datas.numInTask + 1))
                .attr("x2", conf.widthFixed * 4 / 5)
                .attr("y2", conf.heightFixed * i / (datas.numInTask + 1))
                .attr("class", "agvLine")
                .style("stroke-width", "2px")
                .style("stroke", tool.getAgvColor(agv));
        }

        var arrowMarker = conf.svgFixed.append("defs").append("marker").attr("id", agv);
        arrow(arrowMarker).attr("fill", tool.getAgvColor(agv));
        line().attr("x2", conf.widthFixed * 4 / 5);
        line().attr("x2", conf.widthFixed / 2)
            .attr("marker-end", "url(#" + agv + ")");

        if (i === 1) {
            $("#agvs").append("<div class='agvs' style='width:" + (conf.widthAgvs - conf.widthFixed)
                + "px" + "; height:100%; float:right'>");
            $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (datas.numInTask + 1) / 2
                + "px" + "'>" + "</div>");
        }
        $(".agvs").append("<div style='width:100%; height:" + conf.heightFixed / (datas.numInTask + 1)
            + "; line-height:" + conf.heightFixed / (datas.numInTask + 1) + "px" + "; color:" + tool.getAgvColor(agv) + "'>"
            + agv + "号AGV" + "</div>");
    }
}

var siteCode = function (locations) {
    var text = function () {
        return conf.svg.append("text")
            .style("stroke", "black")
            .style("font-size", "10px")
            .style("stroke-width", "0.7px")
            .text(location.id);
    }
    for (var location of locations) {
        var locationid = location.id;
        if (locationid > 2005) {
            if (4000 < locationid && locationid < 4004) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) - 5);
            } else if ((2010 < locationid && locationid < 2016) || (2025 < locationid && locationid < 2037) || (2077 < locationid && locationid < 2088)) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 5)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            } else if ((2015 < locationid && locationid < 2026) || (2036 < locationid && locationid < 2048) || (2067 < locationid && locationid < 2078) || (2087 < locationid && locationid < 2098)) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 13)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            } else if (2107 < locationid && locationid < 2119 && locationid % 2 == 1) {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) - 5);
            } else {
                text().attr("x", conf.padding.left + conf.xScale(location.x) - 9)
                    .attr("y", conf.height - conf.padding.bottom - conf.yScale(location.y) + 13);
            }
        }
    }
}