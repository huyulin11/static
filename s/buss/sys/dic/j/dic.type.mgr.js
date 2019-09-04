import "/s/j/vue/vue.min.js";
import { urlSearcher } from "/s/j/tool/urlSearcher.js";

var vm = new Vue({
    data: { dictype: null },
    el: "#container",
    created: function () {
        $.ajax({
            url: '/sys/dic/type/findByPage.shtml?sysDicTypeFormMap.dictype=' + urlSearcher.param("dictype"),
            async: false,
            type: 'GET',
            dataType: 'json',
            timeout: 2000,
            cache: false,
            success: (datas) => {
                if (!datas) return;
                this.dictype = datas.records[0];
            },
            error: function () {
                layer.msg("获取数据失败，请检查网络连接……");
            }
        });
    },
    mounted: function () {
    },
    methods: {
    },
    computed: {
    }
});