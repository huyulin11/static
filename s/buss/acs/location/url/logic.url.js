import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { datas } from "/s/buss/acs/location/location.data.js";

export var saveLogic = function (side, siteid, nextid, oldnext, callback) {
    var json = {
        "TaskSiteLogicFormMap.siteid": siteid,
        "TaskSiteLogicFormMap.nextid": nextid,
        "TaskSiteLogicFormMap.side": side,
        "TaskSiteLogicFormMap.distance": 1,
    };
    var json2 = {
        "siteid": parseInt(siteid),
        "nextid": parseInt(nextid),
        "side": side,
        "distance": 1,
    };
    updatetaskSiteLogic(siteid, oldnext, json2);
    gf.ajax(`/tasksitelogic/addEntity.shtml`, json, "json", function (data) {
        if (data.code > 0 && oldnext) {
            var result = { "siteid": parseInt(siteid), "nextid": oldnext };
            deleteLogic(result, true);
        };
        datas.init();
        if (callback) { callback() };
    });
}

export var deleteLogic = function (value, bool) {
    gf.doAjax({
        url: `/tasksitelogic/deleteEntity.shtml`, type: "POST", dataType: "JSON",
        data: {
            "TaskSiteLogicFormMap.siteid": value.siteid,
            "TaskSiteLogicFormMap.nextid": value.nextid
        },
        success: (obj) => {
            updatetaskSiteLogic(value.siteid, value.nextid, "", bool);
            if (obj.msg) layer.msg(obj.msg);
            datas.init();
        }
    });
}