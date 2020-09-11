import "/s/j/vue/vue.min.js";
import { initAlloc } from "/s/buss/wms/alloc/item/j/alloc.render.js";
var vm = new Vue({
    el: "#kw",
    computed: {
        bigSearchResult: function () {
            var val = localStorage.bigSearchResult;
            return val ? val : "";
        }
    }, methods: {
        inputFun: function (e) {
            localStorage.setItem("bigSearchResult", e.target.value);
            initAlloc();
        }
    }
});