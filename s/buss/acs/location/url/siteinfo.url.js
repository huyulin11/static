import { datas } from "/s/buss/acs/location/location.data.js";
import { updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var addLocation = function (id, location, callback) {
    var key = parseInt(id);
    gf.doAjax({
        url: `/tasksite/addLocation.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: key, value: JSON.stringify(location) },
        success: (obj) => {
            updateTaskSiteLocation(id, location);
            if (obj.msg) {
                layer.msg("增加失败");
                return;
            }
            datas.init();
            if (callback) { callback(); }
        }
    });
}

export var deleteLocation = function (id) {
    var ids = parseInt(id);
    gf.doAjax({
        url: `/tasksite/deleteLocation.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: ids },
        success: (obj) => {
            updateTaskSiteLocation(id, "", true);
            if (obj.msg) layer.msg("删除失败");
        }
    });
}

export var moveLocation = function (id, location) {
    var key = parseInt(id);
    gf.doAjax({
        url: `/tasksite/updateLocation.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: key, value: JSON.stringify(location) },
        success: (obj) => {
            updateTaskSiteLocation(id, location);
            if (obj.msg) layer.msg("拖动失败");
        }
    });
}

export var editLocationID = function (oldID, newID, location) {
    gf.doAjax({
        url: `/tasksite/editLocationID.shtml`, type: "POST",
        data: { oldID: oldID, newID: newID, value: JSON.stringify(location) },
        success: (obj) => {
            updateTaskSiteLocation(oldID, location);
            if (obj.msg) layer.msg("修改失败");
        }
    });
}