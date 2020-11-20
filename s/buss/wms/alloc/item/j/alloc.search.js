import "/s/j/vue/vue.min.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { allocData } from "/s/buss/wms/alloc/item/j/alloc.render.list.data.js";
import { allocRender } from "/s/buss/wms/alloc/item/j/alloc.render.list.work.js";
import "/s/buss/wms/alloc/item/j/alloc.event.js";

let tempBtns = [{
    id: "back", name: "返回", class: "btn-info",
    hide: () => localStorage.projectKey != 'BJJK_HUIRUI',
    bind: function () {
        window.history.back();
    }, style: "min-height:25px;width:60px;float:right;"
}];
gfbtn.bindBtns("div.doc-buttons", tempBtns);

let _conf = { numInLine: 5, target: "table.alloc" };
let _search = {};
if (localStorage.projectKey == 'BJJK_HUIRUI') {
    Object.assign(_conf, { numInLine: 4 });
    Object.assign(_search, { 'allocItemFormMap.whid': 2, pageSize: 100 });
}
let allocDataUdf = () => {
    allocData((data) => {
        allocRender(data, _conf);
    }, _search);
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
            allocDataUdf();
        }
    }
});

setInterval(function () {
    if ($("#simple-2").is(":checked")) {
        allocDataUdf();
    }
}, 5000);

setTimeout(function () {
    allocDataUdf();
}, 500);

setTimeout(function () {
    gf.resizeTable();
}, 1000);