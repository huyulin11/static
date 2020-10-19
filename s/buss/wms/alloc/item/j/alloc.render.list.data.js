export var allocData = function (callback, condition) {
    $(".black_overlay").show();
    $("table.alloc").html("");
    let serach = { "allocItemFormMap.text": $("#kw").val() };
    if (condition) { serach = Object.assign(serach, condition); }
    if (localStorage.projectKey == "BJJK_HUIRUI") {
        serach['allocItemFormMap.whid'] = 2; serach['pageSize'] = 100;
    }
    jQuery.ajax({
        url: "/alloc/item/findByPage.shtml",
        data: serach,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (callback) callback(data.records);
        },
        complete: function (data) {
            setTimeout(function () {
                $(".black_overlay").hide();
            }, 100);
        },
        error: function () {
            clearInterval(initAlloc);
        },
        timeout: 5000
    });
}