import "/s/j/vue/vue.min.js";
import { allocData } from "/s/buss/wms/alloc/item/j/alloc.render.list.data.js";
import { allocRender } from "/s/buss/wms/alloc/item/j/alloc.render.list.work.js";
import "/s/buss/wms/alloc/item/j/alloc.event.js";

let tempBtns = [{
    id: "back", name: "返回", class: "btn-info", hide: function () { return localStorage.projectKey != 'BJJK_HUIRUI'; },
    bind: function () {
        window.history.back();
    }, style: "min-height:25px;width:60px;float:right;"
}];
gf.bindBtns("div.doc-buttons", tempBtns);


let _conf = { numInLine: 5, target: "table.alloc" };
let allocRenderUdf = (data) => {
    allocRender(data, _conf);
};

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
            allocData(allocRenderUdf);
        }
    }
});

setTimeout(function () {
    allocData(allocRenderUdf);
}, 500);

setInterval(function () {
    if ($("#simple-2").is(":checked")) {
        allocData(allocRenderUdf);
    }
}, 5000);

setTimeout(function () {
    gf.resizeTable();
}, 1000);