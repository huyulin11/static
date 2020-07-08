export var dictype = (dictypeStr, callback) => {
    $.ajax({
        url: '/sys/dic/type/findByPage.shtml?sysDicTypeFormMap.dictype=' + dictypeStr,
        async: false,
        type: 'GET',
        dataType: 'json',
        timeout: 5000,
        cache: false,
        success: (datas) => {
            if (!datas) return;
            callback(datas.records[0]);
        },
        error: function () {
            layer.msg("获取数据失败，请检查网络连接……");
        }
    });
}