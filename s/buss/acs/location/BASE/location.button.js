import { gf } from "/s/buss/g/j/g.f.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

var flag = false;
export let tempBtns = [{
    id: "show", name: "显示", class: "btn-show",
    bind: function () {
        flag = !flag;
        if (flag) {
            show();
            d3.select(".doc-buttons").select("#show").text("隐藏");
            return !flag;
        }
        hide();
        d3.select(".doc-buttons").select("#show").text("显示");
        return !flag;
    }
}];

var hide = function () {
    conf.svg.selectAll("text").remove();
}

var show = function () {
    var datasss = [].concat(datas.udfPoints);
    var dataset = datas.lastTaskPath.concat(datasss);
    conf.svg.selectAll("text")
        .data(dataset)
        .attr("id", function (d) {
            var id = d[0] + 't';
            return id;
        })
        .attr("x", function (d) {
            return conf.padding.left + conf.xScale(d[1]);
        })
        .attr("y", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]);
        })
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        })
        .enter()
        .append("text")
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        })
        .attr("x", function (d) {
            return conf.padding.left + conf.xScale(d[1]);
        })
        .attr("y", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]);
        })
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        });
}

gf.bindBtns("div.doc-buttons", tempBtns);