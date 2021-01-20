export var data = function (callback, condition, manager) {
    if (callback) {
        $(".black_overlay").show();
        $("div#target").html("");
    }
    let serach = { "value": `%${$("#kw").val()}%`, 'delflag': 0 };
    if ($("#showDel").is(":checked")) { serach.delflag = 1; }
    let jsonValueSearchs = [];
    if ($("#showSelf").is(":checked")) { jsonValueSearchs.push({ column: 'value', item: 'manager', value: manager }); }
    if ($("#showType1").is(":checked")) { jsonValueSearchs.push({ column: 'value', item: '状态', value: '基础' }); }
    if (jsonValueSearchs.length > 0) { serach.JSON_VALUE = JSON.stringify(jsonValueSearchs); }
    if (condition) { serach = Object.assign(serach, condition); }
    dataFull(callback, serach);
}

export var dataFull = function (callback, condition) {
    condition["TABLE_KEY"] = "CRM_CLIENTS";
    condition["ORDER_BY_KEY"] = "key desc";
    let _condition = {
        url: "/app/conf/findByPage.shtml",
        data: condition,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data);
            }
        },
        complete: function (data) {
            setTimeout(function () {
                $(".black_overlay").hide();
            }, 100);
        },
        timeout: 5000
    };
    jQuery.ajax(_condition);
}