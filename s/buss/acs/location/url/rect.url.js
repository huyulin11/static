import { tool } from "/s/buss/acs/location/location.tool.js";
import { updateTaskSiteRect } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var crateRect = function (id, x, y, width, height) {
    var key = parseInt(id);
    var result = { 'id': key, 'x': tool.xnumToDB(x), 'y': tool.ynumToDb(y), 'width': width, 'height': height, 'buildname': '建筑' };
    gf.doAjax({
        url: `/rect/conf/addRect.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: key, value: JSON.stringify(result) },
        success: (obj) => {
            updateTaskSiteRect(id, result);
            if (obj.msg) layer.msg("增加失败");
        }
    });
}

export var delRect = function (id) {
    var ids = parseInt(id);
    gf.doAjax({
        url: `/rect/conf/deleteRect.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: ids },
        success: (obj) => {
            updateTaskSiteRect(id, "", true);
            if (obj.msg) layer.msg("删除失败");
        }
    });
}

export var editBuildName = function (id, value) {
    var key = parseInt(id);
    gf.doAjax({
        url: `/rect/conf/editBuildName.shtml`, type: "POST",
        data: { table: "MAP_DECORATE", key: key, value: JSON.stringify(value) },
        success: (obj) => {
            updateTaskSiteRect(id, value);
            if (obj.msg) layer.msg("修改失败");
        }
    });
}
