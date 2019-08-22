import "/s/j/vue/vue.min.js";
import { initRows } from "/s/buss/sys/dic/j/dynamic.row.js";
import { dictype } from "/s/buss/sys/dic/j/dic.type.info.js";
import { dicdata } from "/s/buss/sys/dic/j/dic.data.info.js";

var vm = new Vue({
    data: {
        dicdatas: [],
        dictype: {}
    },
    el: "#container",
    created: function () {
    },
    mounted: function () {
        $.ajax({
            url: '/sys/dic/type/findByPage.shtml?sysDicTypeFormMap.dictype=' + localStorage.dictype,
            async: true,
            type: 'GET',
            dataType: 'json',
            timeout: 2000,
            cache: false,
            success: (data) => {
                this.dealType(data);
            },
            error: function () {
                layer.msg("获取数据失败，请检查网络连接……");
            }
        });
    },
    methods: {
        dealType: function (datas) {
            if (!datas || !datas.records[0]) {
                layer.msg("获取的字典类型数据为空，请检查数据……");
                return;
            }
            this.dictype = datas.records[0];

            let newDatas = [];
            let newData = [{
                key: "dickey",
                name: "键",
                notnull: 1
            }, {
                key: "dicvalue",
                name: "值",
                notnull: 1
            }];
            if (this.dictype.json) {
                var json = JSON.parse(this.dictype.json);
                if (json && json.item) {
                    for (let item of json.items) {
                        newData = newData.concat({
                            key: item.key,
                            name: item.name,
                            notnull: item.notnull
                        });
                    }
                }
            }
            this.dicdatas = this.dicdatas.concat({ newData });
            newDatas = newDatas.concat(newData);
            var _conf = {
                container: "div#rows",
                targetClass: "item-group",
                addBtn: "div.addOne",
                dellogic: true,
                serial: 0,
                max: 20,
                items: [{
                    key: "key",
                    name: "键",
                    notnull: true,
                }, {
                    key: "name",
                    name: "名称",
                    notnull: true,
                }, {
                    key: "notnull",
                    name: "允许为空",
                    type: "select",
                    dic: "BOOLEAN",
                    notnull: true,
                },]
            }
            _conf.items = newDatas;
            this.doInit(_conf);
        },
        doInit: function (_conf) {
            var doInitRows = (dicdatainfos) => {
                $(_conf.addBtn).removeClass("hidden");
                if (dicdatainfos) {
                    for (let dicdatainfo of dicdatainfos) {
                        if (dicdatainfo.json) {
                            var json = JSON.parse(dicdatainfo.json);
                            Object.assign(dicdatainfo, json);
                            console.log(dicdatainfo);
                        }
                    }
                    initRows(_conf, dicdatainfos);
                }
            }

            if (localStorage.dictype) {
                dicdata(localStorage.dictype, doInitRows);
            }
        }
    },
    computed: {
    }
});