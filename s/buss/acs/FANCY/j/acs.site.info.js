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
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/sites/taskSiteLocation.json",
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