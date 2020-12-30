import "/s/j/vue/vue.min.js";
import { allocData } from "./client.render.list.data.js?f=crmv000001";
import { allocRender } from "./client.render.list.work.js?f=crmv000001";
import "/s/buss/crm/client/client.list.event.js?f=crmv000001";

let _conf = { numInLine: 2, target: "table.alloc" };
let _search = {};
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

window.addEventListener("refresh", function (data) {
	console.log("trigger event refresh");
	allocDataUdf();
}, false);