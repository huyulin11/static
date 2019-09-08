export var singletask = function () {
    var json;
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/singletasks/singletasks.json",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            json = data;
        }
    });
    return json;
}