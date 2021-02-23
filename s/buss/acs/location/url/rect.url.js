import { tool } from "/s/buss/acs/location/location.tool.js";
import { updateTaskSiteRect } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { datas } from "/s/buss/acs/location/location.data.js";

export var crateRect = function (id, x1, y1, x2, y2, callback, buildname) {
    var key = parseInt(id);
    var result = { 'id': key, 'x1': tool.xnumToDB(x1), 'y1': tool.ynumToDB(y1), 'x2': tool.xnumToDB(x2), 'y2': tool.ynumToDB(y2), 'buildname': buildname ? buildname : '建筑' };
    gf.doAjax({
        url: `/rect/conf/addRect.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: key, value: JSON.stringify(result) },
        success: (obj) => {
            updateTaskSiteRect(id, result);
            if (obj.msg) layer.msg("增加失败");
            datas.init();
            if (callback) { return callback() };
        }
    });
}

export var delRect = function (id, callback) {
    var ids = parseInt(id);
    gf.doAjax({
        url: `/rect/conf/deleteRect.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: ids },
        success: (obj) => {
            updateTaskSiteRect(id, "", true);
            if (obj.msg) layer.msg("删除失败");
            datas.init();
            if (callback) { return callback() };
        }
    });
}

export var editBuildName = function (id, value, callback) {
    var key = parseInt(id);
    gf.doAjax({
        url: `/rect/conf/editBuildName.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: key, value: JSON.stringify(value) },
        success: (obj) => {
            updateTaskSiteRect(id, value);
            if (obj.msg) layer.msg("修改失败");
            datas.init();
            if (callback) { return callback() };
        }
    });
}
