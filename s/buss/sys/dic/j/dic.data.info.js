export var dicdata = (dictypeStr, callback) => {
    $.ajax({
        url: '/sys/dic/data/findByPage.shtml?sysDicDataFormMap.dictype=' + dictypeStr,
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