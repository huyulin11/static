import "/s/j/vue/vue.min.js";
import { render } from "/s/buss/wms/alloc/item/j/alloc.render.hongfu.zhenmu.js";
import { initAlloc } from "/s/buss/wms/alloc/item/j/alloc.render.js";
import "/s/buss/wms/alloc/item/j/alloc.event.js";

let tempBtns = [{
    id: "back", name: "返回", class: "btn-info", hide: function () { return localStorage.projectKey != 'BJJK_HUIRUI'; },
    bind: function () {
        window.history.back();
    }, style: "min-height:25px;width:60px;float:right;"
}];
gf.bindBtns("div.doc-buttons", tempBtns);

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
            initAlloc(render);
        }
    }
});

setTimeout(function () {
    initAlloc(render);
}, 500);

setInterval(function () {
    if ($("#simple-2").is(":checked")) {
        initAlloc(render);
    }
}, 5000);