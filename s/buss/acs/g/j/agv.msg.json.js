export var allAgvsInfo = function (callback) {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/agv/allAgvsInfo.json",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (callback) callback(data);
        },
        error: function (e) {
        },
        timeout: 5000
    });
}