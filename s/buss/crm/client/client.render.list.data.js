export var data = function (callback, condition) {
    if (callback) {
        $(".black_overlay").show();
        $("div#target").html("");
    }
    let serach = { "value": `%${$("#kw").val()}%`, 'delflag': 0 };
    if ($("#showDel").is(":checked")) { serach.delflag = '0:1'; }
    if (condition) { serach = Object.assign(serach, condition, { "TABLE_KEY": "CRM_CLIENTS" }); }
    jQuery.ajax({
        url: "/app/conf/findByPage.shtml",
        data: serach,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data.records);
            }
        },
        complete: function (data) {
            setTimeout(function () {
                $(".black_overlay").hide();
            }, 100);
        },
        timeout: 5000
    });
}