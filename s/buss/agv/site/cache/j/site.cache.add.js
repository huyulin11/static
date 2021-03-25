import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

var vm = new Vue({
    data: {
        path: null,
        acts: null
    },
    el: container,
    methods: {
        pathEnter() {
            $("#acts").focus();
        },
        sub() {
            let path = this.path;
            let acts = this.acts;
            let key = path;
            if (!path || !acts) {
                if (!path)
                    $("#path").focus();
                else
                    $("#acts").focus();
                layer.msg("站点或指令不能为空！");
                return;
            };
            try {
                acts = JSON.parse(acts);
                path = JSON.parse(path);
            } catch (error) {
                layer.msg("新增失败，格式不正确，请检查格式！");
                return;
            }
            let value = JSON.stringify({ acts: acts, path: path, });
            layer.confirm('确定是否新增？', function (index) {
                gf.doAjax({
                    url: `/app/conf/set.shtml`, type: "POST",
                    data: { table: "FANCY_CACHE_CONF", key: key, value: value },
                    whenSuccess: () => {
                        vm.clear();
                        parent.datagrid.loadData();
                    }
                });
            });
        },
        clear() {
            this.path = null;
            this.acts = null;
            $("#path").focus();
        },
    }
})