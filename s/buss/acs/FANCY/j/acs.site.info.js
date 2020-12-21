let taskSiteLocationData = null;
let taskSiteLogicData = null;

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
    if (taskSiteLocationData) {
        call(taskSiteLocationData);
        return;
    }
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLocation.json",
        type: "get",
        async: false,
        cache: false,
        dataType: "json",
        success: function (data) {
            taskSiteLocationData = data;
            call(data);
        },
        complete: function (data) {
        },
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
    } else {
        var flag = true;
        taskSiteLocationData.forEach((e, i) => {
            if (e.id == id) {
                flag = false;
                return taskSiteLocationData[i] = data;
            }
        });
        if (flag) {
            return taskSiteLocationData.push(data)
        }
    }

}
