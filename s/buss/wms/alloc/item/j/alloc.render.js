import { render } from "/s/buss/wms/alloc/item/j/alloc.render.hongfu.zhenmu.js";
import "/s/buss/wms/alloc/item/j/alloc.event.js";
import { gf } from "/s/buss/g/j/g.f.js";

let tempBtns = [{
    id: "back", name: "返回", class: "btn-info", hide: function () { return localStorage.projectKey != 'BJJK_HUIRUI'; },
    bind: function () {
        window.history.back();
    }, style: "min-height:25px;width:60px;float:right;"
}];
gf.bindBtns("div.doc-buttons", tempBtns);

export var initAlloc = function () {
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
    gf.resizeTable();
}, 1000);

setInterval(function () {
    if ($("#simple-2").is(":checked")) {
        initAlloc();
    }
}, 5000);
