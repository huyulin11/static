import { clearMap } from "/s/buss/acs/location/url/siteinfo.url.js";

export var doClearMap = function () {
    d3.select("#resMap").on("click", function () {
        layer.confirm('清空地图后无法撤回，请确认是否清空？', { icon: 7, title: '提示' }, function (index) {
            clearMap(() => {
                var g = d3.select("svg").select('g');
                var rectHome = g.select("#rectHome").selectAll('rect').remove();
                rectHome.select("rectPointHome").selectAll("circle").remove();
                g.select("#pathHome1").selectAll("path").remove();
                g.select("#pointHome").selectAll("circle").remove();
                g.select("#defsHome").selectAll("marker").remove();
                g.select("#textHome").selectAll("text").remove();
            });
            layer.close(index);
        });
    })
}