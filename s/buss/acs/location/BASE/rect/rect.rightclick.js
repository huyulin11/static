import { delRect } from "/s/buss/acs/location/BASE/render/s/rect.url.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

export var rightClickRect = function (flag) {
    if (flag) {
        conf.svg.selectAll("rect")
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
                if (d3.event.button == 2) {
                    datas.init();
                    var id = $(this).attr('id');
                    var rect = d3.select(this);
                    var tips = layer.tips('<input type="button" id="btn1" style="width: 76px;height: 30px" value="修改名称"><br><input type="button" id="btn2" style="width: 76px;height: 30px" value="删除建筑"><br><input type="button" id="btn3" style="width: 76px;height: 30px" value="删除站点">',
                        '#' + id,
                        {
                            tips: [2, '#e6e6e6'],
                            time: 10000
                        });
                    d3.select("body").on("click", function () {
                        return layer.close(tips);
                    });
                    d3.select("#btn1").on("click", function () {
                        var key = id.slice(4);
                        layer.prompt(function (val, index) {
                            layer.msg('建筑名修改为' + val);
                            d3.select('#retext' + key).text(val);
                            layer.close(index);
                        });
                    });
                    d3.select("#btn2").on("click", function () {
                        rect.remove();
                        delRect(id.slice(4));
                    });
                }
            });
    } else {
        conf.svg.selectAll("rect")
            .on("contextmenu", null)
    }
}