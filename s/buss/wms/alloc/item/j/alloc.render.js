import { gf } from "/s/buss/g/j/g.f.js";

export var initAlloc = function (callback) {
    $(".black_overlay").show();
    $("table.alloc").html("");
    let serach = { "allocItemFormMap.text": $("#kw").val() };
    if (localStorage.projectKey == "BJJK_HUIRUI") { serach['allocItemFormMap.whid'] = 2; }
    jQuery.ajax({
        url: "/alloc/item/findByPage.shtml",
        data: serach,
        type: "POST",
        dataType: "json",
        success: function (data) {
            callback(data.records);
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

setTimeout(function () {
    gf.resizeTable();
}, 1000);