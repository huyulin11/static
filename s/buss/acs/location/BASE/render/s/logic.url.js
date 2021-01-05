import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

export var deleteLogic = function (value, bool) {
    gf.doAjax({
        url: `/tasksitelogic/deleteEntity.shtml`, type: "POST",
        dataType: "JSON", data: value,
        success: (obj) => {
            updatetaskSiteLogic(value.siteid, value.nextid, "", bool);
            if (obj.msg) layer.msg(obj.msg);
        }
    });
};

export var saveLogic = function (side, siteid, nextid, oldnext) {
    var json = {
        "TaskSiteLogicFormMap.siteid": siteid,
        "TaskSiteLogicFormMap.nextid": nextid,
        "TaskSiteLogicFormMap.side": side,
        "TaskSiteLogicFormMap.distance": 1,
    };
    var json2 = {
        "siteid": parseInt(siteid),
        "nextid": nextid,
        "side": side,
        "distance": 1,
    };
    updatetaskSiteLogic(siteid, oldnext, json2);
    gf.ajax(`/tasksitelogic/addEntity.shtml`, json, "json", function (data) {
        if (data.code > 0 && oldnext) {
            var result = { "siteid": parseInt(siteid), "nextid": oldnext };
            deleteLogic(result, true);
        };
    });
};