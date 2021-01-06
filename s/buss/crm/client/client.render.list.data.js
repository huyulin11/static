export var data = function (callback, condition) {
    if (callback) {
        $(".black_overlay").show();
        $("div#target").html("");
    }
    let serach = { "value": `%${$("#kw").val()}%`, 'delflag': 0 };
    if ($("#showDel").is(":checked")) { serach.delflag = '0:1'; }
    let jsonValueSearchs = [];
    if ($("#showSelf").is(":checked")) { jsonValueSearchs.push({ column: 'value', item: 'manager', value: 3 }); }
    if ($("#showType1").is(":checked")) { jsonValueSearchs.push({ column: 'value', item: '状态', value: '基础' }); }
    if (jsonValueSearchs.length > 0) { serach.JSON_VALUE = JSON.stringify(jsonValueSearchs); }
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