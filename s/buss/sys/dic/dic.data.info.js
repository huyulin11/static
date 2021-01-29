export var dicdata = (url, callback) => {
    $.ajax({
        url: url,
        async: false,
        type: 'GET',
        dataType: 'json',
        timeout: 5000,
        cache: false,
        success: (datas) => {
            if (!datas) return;
            callback(datas.records);
        },
        error: function () {
            layer.msg("获取数据失败，请检查网络连接……");
        }
    });
}