import { xnumToDB, ynumToDb } from "/s/buss/acs/location/BASE/render/trans.location.js";
import { updateTaskSiteRect } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var crateRect = function (id, x, y, width, height) {
    var key = parseInt(id);
    var result = { 'id': key, 'x': xnumToDB(x), 'y': ynumToDb(y), 'width': width, 'height': height };
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

export var moveLocation = function (id, x, y) {
    var key = parseInt(id);
    var result = windowToDB(id, x, y);
    gf.doAjax({
        url: `/tasksite/updateLocation.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: key, value: JSON.stringify(result) },
        success: (obj) => {
            updateTaskSiteLocation(id, result);
            if (obj.msg) layer.msg("拖动失败");
        }
    });
}

export var editLocationID = function (id1, id2, result) {
    gf.doAjax({
        url: `/tasksite/editLocationID.shtml`, type: "POST",
        data: { oldID: id1, newID: id2, value: JSON.stringify(result) },
        success: (obj) => {
            updateTaskSiteLocation(id1, result);
            if (obj.msg) layer.msg("修改失败");
        }
    });
}