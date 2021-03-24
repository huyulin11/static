import { editLogic, deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { undoStack } from "/s/buss/acs/location/location.stack.js";

export default {
    changeDirection(path, side) {
        let i = layer.confirm(`当前站点方向为${side == 2 ? "右" : "左"},是否确认更改？`, {
            btn: ['确认', '取消']
        }, function () {
            side = (side == 1) ? 2 : 1;
            var data = path.data()[0];
            data.side = side;
            var siteid = data.from, nextid = data.to, id = data.id;
            editLogic(side, siteid, nextid, () => {
                path.attr("stroke", function (d) {
                    return d.side == 2 ? "#113a7394" : "#1b81d6b3";
                });
                d3.select("#mar" + id).select("path").attr("fill", function (d) {
                    return d.side == 2 ? "#113a7394" : "#1b81d6b3";
                });
                d3.select("#tpath" + id).text(function (d) {
                    return d.side == 2 ? "右" : "左";
                });
                undoStack.push({ 'name': 'pathchangedirection', 'path': path.data()[0] });
            });
            layer.close(i);
        });
    },
    deletePath(path) {
        let ii = layer.confirm('是否删除？', function (index) {
            var data = path.data()[0];
            var marPath = d3.select("#mar" + data.id);
            var side = data.side;
            var siteid = data.from, nextid = data.to;
            var value = { "siteid": siteid, "nextid": nextid, "side": side };
            undoStack.push({ 'name': 'pathdel', 'value': value });
            deleteLogic(value, true);
            d3.select("#tpath" + data.id).remove();
            path.remove();
            marPath.remove();
            layer.close(ii);
        });
    }
}