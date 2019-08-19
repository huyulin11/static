var singletaskjson;
$(function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/singletasks/singletasks.json",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            singletaskjson = data;
        }
    });
});