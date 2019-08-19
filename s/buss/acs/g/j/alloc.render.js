import { render } from "/s/buss/acs/g/j/alloc.render.honfu.zhenmu.js";
import "/s/buss/acs/g/j/alloc.event.js";

export var initAlloc = function () {
    $(".black_overlay").show();
    $("table.alloc").html("");
    jQuery.ajax({
        //url: "/s/jsons/" + localStorage.getItem("projectKey") + "/allocs/allocs.json?fv=" + localStorage.timeStamp,
        url: "/alloc/item/findByPage.shtml",
        data: { "allocItemFormMap.text": $("#kw").val() },
        type: "POST",
        dataType: "json",
        success: function (data) {
            render(data.records);
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
    initAlloc();
}, 500);

setTimeout(function () {
    resizeTable();
}, 1000);

setInterval(function () {
    if ($("#simple-2").is(":checked")) {
        initAlloc();
    }
}, 8000);
