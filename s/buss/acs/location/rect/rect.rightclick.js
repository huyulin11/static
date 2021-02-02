import { delRect, editBuildName } from "/s/buss/acs/location/url/rect.url.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var rightClickRect = function (flag) {
    if (flag) {
        d3.selectAll("rect")
            .on("contextmenu", function (d, i) {
                if (d3.event.button == 2) {
                    let id = $(this).attr('id'),
                        x = tool.xnumToDB($(this).attr('x')),
                        y = tool.ynumToDB($(this).attr('y')),
                        width = parseFloat($(this).attr('width')),
                        height = parseFloat($(this).attr('height'));
                    var rect = d3.select(this);
                    var tips = layer.tips('<input type="button" id="btn1" style="width: 76px;height: 30px" value="修改名称"><br><input type="button" id="btn2" style="width: 76px;height: 30px" value="删除建筑"><br><input type="button" id="btn3" style="width: 76px;height: 30px" value="">',
                        '#' + id,
                        {
                            tips: [2, '#e6e6e6'],
                            time: 10000
                        });
                    d3.select("body").on("click", function () {
                        return layer.close(tips);
                    });
                    var key = id.slice(4);
                    var editname = d3.select('#retext' + key).text();
                    d3.select("#btn1").on("click", function () {
                        layer.prompt(function (val, index) {
                            layer.msg('建筑名修改为' + val);
                            var value = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': val };
                            var data = { 'id': parseInt(key), 'x': x, 'y': y, 'width': width, 'height': height, 'buildname': editname };
                            undoStack.push({ 'name': 'rectedit', 'newrect': value, 'oldrect': data });
                            d3.select('#retext' + key).text(val);
                            rect.attr('buildname', val);
                            editBuildName(key, value);
                            layer.close(index);
                            d3.selectAll('.changeCircle').style('display', 'none');
                        });
                    });
                    d3.select("#btn2").on("click", function () {
                        undoStack.push({ 'name': 'rectdel', 'rect': data });
                        delRect(key, () => {
                            rect.remove();
                            d3.select("#retext" + key).remove();
                            d3.selectAll('#dashC' + key).remove();
                        });
                    });
                }
            });
    } else {
        conf.svg.selectAll("rect")
            .on("contextmenu", null)
    }
}