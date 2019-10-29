var list;

export var getSingleTask = function (allocid) {
    if (!list) { init(); }
    return list.filter(function (e) { return e.allocid == allocid; });
}

var init = function () {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/singletasks/singletasks.json?fv=" + localStorage.timeStamp,
        async: false,
        dataType: "json",
        success: function (data) {
            list = data;
        },
    });
}