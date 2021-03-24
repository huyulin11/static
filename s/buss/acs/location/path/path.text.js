import { tool } from "/s/buss/acs/location/location.tool.js";

let x, y;
export default {
    drawPathTexts(datas) {
        var home = d3.select("#pathTextHome"),
            text = home.selectAll("text");
        text.remove();
        text.data(datas).enter().append("text")
            .attr("id", function (d) {
                return "tpath" + d.id;
            }).attr("x", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
                getLocation(result1[0], result2[0], result1[1], result2[1]);
                return x;
            }).attr("y", function (d) {
                var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
                var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
                getLocation(result1[0], result2[0], result1[1], result2[1]);
                return y;
            })
            .attr("fill", "green")
            .attr("stroke", "green")
            .attr("font-size", "10px")
            .attr("font-family", "sans-serif")
            .text(function (d) {
                return d.side == 2 ? "右" : "左";
            });
    },
}


var getLocation = function (x1, x2, y1, y2) {
    var xx = Math.abs(x1 - x2), yy = Math.abs(y1 - y2);
    if (xx >= 50 && yy >= 50) {
        return x = x2 > x1 ? x2 - 20 : x2 + 20, y = y1 > y2 ? y1 - 20 : y1 + 20;
    } else if (xx <= 50 && yy <= 50) {
        return x = x2, y = y1;
    } else if (xx >= 50 && yy < 50) {
        return x = (x1 + x2) / 2, y = y1;
    } else if (xx < 50 && yy >= 50) {
        return x = x2, y = (y1 + y2) / 2;
    }
}