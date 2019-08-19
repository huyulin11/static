var iots = {};

var getAgvList = function () {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.getItem("projectKey") + "/iot/iots.json",
        type: "GET",
        dataType: "json",
        cache: false,
        error: function (e) {
        },
        timeout: 6000,
        success: function (data) {
            iots = data;
        }
    });
}

var find = (id) => {
    return iots.filter((e) => { return e.id == id; })[0];
}

export var findIotInfo = (id, item) => {
    var obj = find(id);
    if (obj[item]) return obj[item];
    var json = JSON.parse(obj.json);
    return json[item];
}

var init = function () {
    getAgvList();
}

init();
