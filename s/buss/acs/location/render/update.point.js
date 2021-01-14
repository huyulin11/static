import { datas } from "/s/buss/acs/location/location.data.js";
import { updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { windowToDB } from "/s/buss/acs/location/render/trans.location.js";
import { editLocationID } from "/s/buss/acs/location/render/s/siteinfo.url.js";

export var updateID = function (circle, id1, x, y) {
    datas.init();
    layer.prompt({ title: '输入id', formType: 0 }, function (id2, index) {
        layer.close(index);
        if (window.confirm(`确定将id：${id1}修改为id：${id2}？`)) {
            var flag = true;
            for (var i of datas.id) {
                if (id2 == i.id) {
                    flag = !flag;
                    return layer.msg("存在相同站点，修改失败");
                }
            }
            if (flag) {
                d3.select("#t" + id1).attr("id", "t" + id2).text(id2);
                var result = windowToDB(id2, x, y);
                editLocationID(id1, id2, result);
                circle.attr("id", id2);
                d3.selectAll("path")
                    .filter(function (e) { return e && e.to == id1; })
                    .attr("id", function (d) {
                        return 'p' + d.from + id2;
                    })
                    .attr("to", id2);
                d3.selectAll("path")
                    .filter(function (e) { return e && e.from == id1; })
                    .attr("id", function (d) {
                        return 'p' + id2 + d.to;
                    })
                    .attr("from", id2);
            }
        }
    })
}

