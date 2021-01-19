import { datas } from "/s/buss/acs/location/location.data.js";
import { updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var addLocation = function (location, callback) {
    gf.doAjax({
        url: `/tasksite/addLocation.shtml`, type: "POST",
        data: { key: location.id, value: JSON.stringify(location) },
        success: () => {
            updateTaskSiteLocation(location.id, location);
            datas.init();
            if (callback) { callback(); }
        }
    });
}

export var deleteLocation = function (id, callback) {
    gf.doAjax({
        url: `/tasksite/deleteLocation.shtml`, type: "POST",
        data: { key: id },
        success: () => {
            if (callback) { callback(); }
            updateTaskSiteLocation(id, "", true);
            datas.init();
        }
    });
}

export var updateLocation = function (id, location) {
    gf.doAjax({
        url: `/tasksite/updateLocation.shtml`, type: "POST",
        data: { key: id, value: JSON.stringify(location) },
        success: () => {
            updateTaskSiteLocation(id, location);
            datas.init();
        }
    });
}

export var editLocationID = function (oldID, location, callback) {
    gf.doAjax({
        url: `/tasksite/editLocationID.shtml`, type: "POST",
        data: { oldID: oldID, newID: location.id, value: JSON.stringify(location) },
        success: () => {
            if (callback) { callback(); }
            updateTaskSiteLocation(location.id, location);
            datas.init();
        }
    });
}