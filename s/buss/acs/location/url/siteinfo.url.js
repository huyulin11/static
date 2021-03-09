import { datas } from "/s/buss/acs/location/location.data.js";
import { updateTaskSiteLocation, updateMap } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var addLocation = function (location, callback) {
    gf.doAjax({
        url: `/tasksite/addEntity.shtml`, type: "POST",
        data: {
            "TaskSiteFormMap.id": location.id,
            "TaskSiteFormMap.location": JSON.stringify(location)
        },
        success: () => {
            updateTaskSiteLocation(location.id, location);
            datas.init();
            if (callback) { callback(); }
        }
    });
}

export var deleteLocation = function (id, callback) {
    gf.doAjax({
        url: `/tasksite/deleteEntity.shtml`, type: "POST",
        data: { "TaskSiteFormMap.id": id },
        success: () => {
            if (callback) { callback(); }
            updateTaskSiteLocation(id, "", true);
            datas.init();
        }
    });
}

export var editLocation = function (id, location, callback) {
    gf.doAjax({
        url: `/tasksite/editEntity.shtml`, type: "POST",
        data: {
            "TaskSiteFormMap.id": id,
            "TaskSiteFormMap.location": JSON.stringify(location)
        },
        success: () => {
            if (callback) { callback(); }
            updateTaskSiteLocation(id, location);
            datas.init();
        }
    });
}

export var addMap = function (id, location, callback) {
    gf.doAjax({
        url: `/tasksite/addMap.shtml`, type: "POST",
        data: {
            "TaskSiteFormMap.location": JSON.stringify(location),
            "TaskSiteFormMap.ids": JSON.stringify(id)
        },
        success: () => {
            updateMap(location);
            datas.init();
            if (callback) { callback(); }
        }
    });
}