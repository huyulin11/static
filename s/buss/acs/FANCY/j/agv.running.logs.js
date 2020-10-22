export var agvRunningLogs = function (callback) {
    jQuery.ajax({
        url: "/de/acs/agvRunningLogs.shtml",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data);
            }
        },
        complete: function (data) {
        },
        timeout: 5000
    });
}