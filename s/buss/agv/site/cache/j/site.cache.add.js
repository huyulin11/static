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
            if (!path || !acts) {
                if (!path)
                    $("#path").focus();
                else
                    $("#acts").focus();
                layer.msg("站点或指令不能为空！");
                return;
            };
            acts = JSON.parse(acts);
            $.extend(acts, JSON.parse(path));
            let value = JSON.stringify(acts);
            gf.doAjax({
                url: `/app/conf/set.shtml`, type: "POST",
                data: { table: "FANCY_CACHE_CONF", key: path, value: value }
            });
            this.clear();
        },
        clear() {
            this.path = null;
            this.acts = null;
            $("#path").focus();
        },
    }
})