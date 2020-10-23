export var skuInfoLogs = function (callback) {
    jQuery.ajax({
        url: "/sku/info/skuInfoLogs.shtml",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data);
            }
        },
        complete: function (data) {
        },
        timeout: 5000
    });
}