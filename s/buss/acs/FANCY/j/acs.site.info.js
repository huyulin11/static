import { gv } from "/s/buss/g/j/g.v.js";

let taskSiteLocationData = [];
let taskSiteLogicData = null;
let taskSiteRectData = null;

export var taskSiteRect = function (callback) {
    let call = (data) => {
        if (callback) {
            callback(data);
        };
    };
    if (taskSiteRectData) {
        call(taskSiteRectData);
        return;
    };
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteRect.json",
        type: "get",
        async: false,
        cache: false,
        dataType: "json",
        success: function (data) {
            taskSiteRectData = data;
            call(data);
        },
        complete: function (data) {
        },
    });
}

export var taskSiteLogic = function (callback) {
    let call = (data) => {
        if (callback) {
            callback(data);
        };
    };
    if (taskSiteLogicData) {
        call(taskSiteLogicData);
        return;
    };
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLogic.json",
        type: "get",
        async: false,
        cache: false,
        dataType: "json",
        success: function (data) {
            taskSiteLogicData = data;
            call(data);
        },
        complete: function (data) {
        },
    });
}

export var taskSiteLocation = function (callback) {
    let call = (data) => {
        if (callback) {
            callback(data);
        }
    };
    if (taskSiteLocationData.length != 0) {
        call(taskSiteLocationData);
        return;
    }
    gv.getSite(function (data) {
        for (let val of data) {
            if (val.location) {
                taskSiteLocationData.push(JSON.parse(val.location));
            }
        }
        call(taskSiteLocationData);
    });
}

export var updatetaskSiteLogic = function (siteid, nextid, data, bool) {
    if (!taskSiteLogicData) return;
    if (bool) {
        taskSiteLogicData.forEach((e, i) => {
            if (e.siteid == siteid && e.nextid == nextid) {
                var s = taskSiteLogicData.splice(i, 1);
                return s;
            }
        })
    } else {
        var flag = true;
        taskSiteLogicData.forEach((e, i) => {
            if (e.siteid == siteid && e.nextid == nextid) {
                flag = false;
                return taskSiteLogicData[i] = data;
            }
        });
        if (flag) {
            return taskSiteLogicData.push(data);
        }
    }
}

export var updateTaskSiteLocation = function (id, data, bool) {
    if (!taskSiteLocationData) return;
    if (bool) {
        taskSiteLocationData.forEach((e, i) => {
            if (e.id == id) {
                var s = taskSiteLocationData.splice(i, 1);
                return s;
            }
        });
        return;
    }
    var flag = true;
    taskSiteLocationData.forEach((e, i) => {
        if (e.id == id) {
            flag = false;
            return taskSiteLocationData[i] = data;
        }
    });
    if (flag) { taskSiteLocationData.push(data); }
}

export var updateTaskSiteRect = function (id, data, bool) {
    if (!taskSiteRectData) return;
    if (bool) {
        taskSiteRectData.forEach((e, i) => {
            if (e.id == id) {
                var s = taskSiteRectData.splice(i, 1);
                return s;
            }
        });
    } else {
        var flag = true;
        taskSiteRectData.forEach((e, i) => {
            if (e.id == id) {
                flag = false;
                return taskSiteRectData[i] = data;
            }
        });
        if (flag) {
            return taskSiteRectData.push(data)
        }
    }
}
