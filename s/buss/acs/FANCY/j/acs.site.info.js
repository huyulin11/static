let taskSiteLocationData = null;

export var taskSiteLogic = function (callback) {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLogic.json",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data);
            }
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
    }
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLocation.json",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            taskSiteLocationData = data;
            call(data);
        },
        complete: function (data) {
        },
    });
}

export var updateTaskSiteLocation = function (id, data) {
    if (!taskSiteLocationData) return;
    taskSiteLocationData.forEach(e => {
        if (e.id == id) {
            e.value = data;
        }
    });
}