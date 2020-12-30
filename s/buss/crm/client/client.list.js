import "/s/j/vue/vue.min.js";
import { data } from "./client.render.list.data.js?f=crmv000001";
import { render } from "./client.render.list.work.js?f=crmv000001";
import "/s/buss/crm/client/client.list.event.js?f=crmv000001";

let _conf = { numInLine: gf.isPc() ? 2 : 1, target: "div#target" };
let _search = {};
let dataUdf = () => {
	data((data) => {
		render(data, _conf);
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
			dataUdf();
		}
	}
});

setInterval(function () {
	if ($("#simple-2").is(":checked")) {
		dataUdf();
	}
}, 5000);

setTimeout(function () {
	dataUdf();
}, 500);

setTimeout(function () {
	gf.resizeTable();
}, 1000);

window.addEventListener("refresh", function (data) {
	console.log("trigger event refresh");
	dataUdf();
}, false);
window.addEventListener("loginSuccess", function (data) {
	console.log("loginSuccess event refresh");
	$("#loginHideDiv").trigger("click");
	dataUdf();
}, false);